let nextTask = null;
let renderedRoot = null;
let currentRoot = null;

function createElement(type, props, children) {
  return {
    type,
    props: {
      ...props,
    },
    children: children.map(child =>
      typeof child === "object"
        ? child
        : createTextElement(child)
    ),
  }
}

function createTextElement(content) {
  return {
    type: "TEXT_NODE",
    props: {
      content,
    },
    children: [],
  }
}

function render(element, container) {
  // Permet de stocker l'arborescence qui est en cours
  currentRoot = {
    parent: container,
    type: 'create',
    content: element
  }

  // On utilise la workQueue donc on doit set le nextTask
  nextTask = currentRoot;
}

function createDom(structure) {
  const dom = structure.type === "TEXT_NODE" ?
    document.createTextNode(structure.props.content) :
    document.createElement(structure.type);    
  
  updateDom(dom, {}, structure);
  
  return dom;
}

function updateDom(dom, prevStructure, newStructure) {
  if (Object.keys(prevStructure).length) {
    setDomParameters(dom, newStructure, true);
  }

  setDomParameters(dom, newStructure);
}

function setDomParameters(dom, structure, mustReset = false) {
  setDomProps(dom, structure.props, mustReset);
  setDomEvents(dom, structure.props, mustReset);
}

function setDomProps(dom, props, mustReset = false) {
  Object.keys(props)
    .filter((propName) => !isEvent(propName))
    .forEach(propName => {
      dom[propName] = mustReset ? "" : props[propName];
    });
}

function setDomEvents(dom, props, mustReset = false) {
  Object.keys(props)
  .filter((propName) => isEvent(propName))
  .forEach(eventName => {
    const eventType = eventName.split('.')[1]
    const eventAction = mustReset ? 'removeEventListener' : 'addEventListener';
    dom[eventAction](eventType, props[eventName]);
  });
}

function isEvent(propName) {
  return propName.includes('event.');
}

function workQueue(reqIdleCall) {
  while (nextTask) {
    nextTask = executeTask(nextTask);
  }

  /**
   * Si plus de nextTask ça veut dire que notre render est complété
   * Comme ça va tourner en background (et en boucle) on check si currentRoot est présent
   *    pour pas lancer notre commitRoot en boucle (commitRoot set currentRoot à null)
   */
  if (!nextTask && currentRoot) {
    commitRoot();
  }

  requestIdleCallback(workQueue);
}

function executeTask(task) {
  // Pour le moment on va juste gérer le create, par la suite en fonction du type d'action on fera un update, un delete etc.
  if (task.type === "create") {
    const elementDom = createDom(task.content);
    task.parent.appendChild(elementDom);

    const child = task.content.children[0];

    const nextFiber = child ? {
      parent: elementDom,
      parentFiber: task,
      type: 'create',
      content: child,
    } : null;

    let previousSibling = null;
    // Permet de gérer les siblings, on récupère notre enfant et créer une liste chainée de sibling.
    for (let index = 1; index < task.content.children.length; index++) {
      const sibling = task.content.children[index];
      const siblingFiber = sibling ? {
        parent: elementDom,
        parentFiber: task,
        type: 'create',
        content: sibling,
      } : null;

      nextFiber.sibling = siblingFiber;
      previousSibling = siblingFiber;
    }

    task.child = nextFiber;

    /**
     * Si il y a un enfant on le renvoie afin d'être sûr de le traiter lui puis ces enfants etc.
     * Les siblings ne seront géré qu'a la fin, lorsque l'on atteint le bout d'une branche
     * Ensuite on remontera au parent, on executera son sibling et ainsi de suite
     */ 
    if (task.child) {
      return task.child;
    }

    while (nextTask) {
      if(nextTask && nextTask.sibling) {
        return nextTask.sibling;
      }
      // Si il n'y a plus d'enfant (et ici de sibling) on retourne au parent afin de prendre en compte les sibling du parent puis ces enfants etc
      nextTask = nextTask.parentFiber;
    }
  }
}

function commitRoot() {
  // Truc qui lance notre taff
  // Une fois que c'est fini
  renderedRoot = currentRoot;
  currentRoot = null;
}


requestIdleCallback(workQueue);

export const MiniReact = {
  createElement,
  createDom,
  render
}