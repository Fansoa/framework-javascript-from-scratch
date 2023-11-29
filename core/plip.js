function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type)
​
  const isProperty = key => key !== "children"
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name]
    })
​
  return dom
}

function commitRoot() {
  deletions.forEach(commitWork)
  commitWork(wipRoot.child)
  // Sauvegarde l'arbre que l'on vient de commit pour s'en servir après de point de comparaison
  currentRoot = wipRoot
  wipRoot = null
}
​
function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  if (
    fiber.effectTag === "PLACEMENT" &&
    fiber.dom != null
  ) {
    domParent.appendChild(fiber.dom)
  } else if (
    fiber.effectTag === "UPDATE" &&
    fiber.dom != null
  ) {
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom)
  }
​
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}
​
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  }

  deletions = []
  nextUnitOfWork = wipRoot
}

nextUnitOfWork = null,
wipRoot = null,
currentRoot = null,
deletions = null

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  // Génère le dom du fiber actuel si il n'en a pas
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  /**
   * Append le dom du fiber actuel à son parent
   * À retirer, parce qu'on rajoute l'élément au dom, mais si il y a un souci tous vas s'arreter en ayant append qu'une partie de l'UI
   * 
   * if (fiber.parent) {
   *    fiber.parent.dom.appendChild(fiber.dom)
   * }
   * 
   * A la place on va utiliser 
   * */ 

  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);

  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

function reconcileChildren(wipFiber, elements) {
  let index = 0
  let prevSibling = null
  let oldFiber =
    wipFiber.alternate && wipFiber.alternate.child
​
  while (
    index < elements.length ||
    oldFiber != null
  ) {
    const element = elements[index];
    let newFiber = null;
​
    const sameType =
      oldFiber &&
      element &&
      element.type == oldFiber.type
​
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      }
    }

    // Ici l'élément existe mais il n'est pas de same type, donc il faut le rerender / régénérer son dom
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      }
    }

    // Si oldFiber est présent mais qu'il n'ont pas le même type, cela veut dire qu'on ne retrouve pas le match à partir du nouveau, celui ci est donc à supprimer
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION"
      deletions.push(oldFiber)
    }
​
    if (index === 0) {
      wipFiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
​
    prevSibling = newFiber
    index++
  }
}