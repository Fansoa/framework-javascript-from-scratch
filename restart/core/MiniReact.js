export class MiniReact {
  /**
   * = la root de notre render actuel
   * 
   * commitRoot ne sera lancé que si il n'y a plus de nextUnitOfWork
   */
  wipRoot = null;
  treeRoot = null;
  currentRoot = null;
  nextUnitOfWork = null;
  deletions = null;
  wipFiber = null;
  hookIndex = null;

  render(element, container) {
    this.wipRoot = {
      dom: container,
      props: {
        children: [element],
      },
      alternate: this.currentRoot,
    }
    this.deletions = []
    this.nextUnitOfWork = this.wipRoot

    this.renderActivation(element, container);
  }

  /** @todo find more accurate name */
  renderActivation(element, container) {
    const elementDom = this.createDom(element);
    container.appendChild(elementDom);

    this.treeRoot = element;
    console.log(this.treeRoot);
  }

  createElement(type, props, children) {
    return {
      type,
      props: {
        ...props,
      },
      children: children.map(child =>
        typeof child === "object"
          ? child
          : this.createTextElement(child)
      ),
    }
  }

  createTextElement(content) {
    return {
      type: "TEXT_NODE",
      props: {
        content,
      },
      children: [],
    }
  }

  createDom(structure) {
    const dom = structure.type === "TEXT_NODE" ?
      document.createTextNode(structure.props.content) :
      document.createElement(structure.type);

    this.updateDom(dom, {}, structure);

    return dom;
  }

  updateDom(dom, prevStructure, newStructure) {
    if (Object.keys(prevStructure).length) {
      this.setDomParameters(dom, newStructure, true);
      this.setDomChildren(dom, newStructure, true);
    }

    this.setDomParameters(dom, newStructure);
    this.setDomChildren(dom, newStructure);
  }

  // PROPS
  setDomParameters(dom, structure, mustReset = false) {
    this.setDomProps(dom, structure.props, mustReset);
    this.setDomEvents(dom, structure.props, mustReset);
  }

  // Si mustReset = true dans ce cas cela veut dire qu'on veut reset nos props (dans le cas de l'update du dom par exemple)
  setDomProps(dom, props, mustReset = false) {
    Object.keys(props)
      .filter((propName) => !this.isEvent(propName))
      .forEach(propName => {
        dom[propName] = mustReset ? "" : props[propName];
      });
  }

  // Si mustReset = true dans ce cas cela veut dire qu'on veut reset nos events (dans le cas de l'update du dom par exemple)
  setDomEvents(dom, props, mustReset = false) {
    Object.keys(props)
    .filter((propName) => this.isEvent(propName))
    .forEach(eventName => {
      const eventType = eventName.split('.')[1]
      const eventAction = mustReset ? 'removeEventListener' : 'addEventListener';
      dom[eventAction](eventType, props[eventName]);
    });
  }

  isEvent(propName) {
    return propName.includes('event.');
  }

  // CHILDREN
  setDomChildren(dom, structure) {
    structure.children.forEach((childStructure) => {
      const childDom = this.createDom(childStructure);
      dom.appendChild(childDom);
    });
  }

  // STATE
  useState(initialState) {
    let state = initialState;

    const setState = callback => {
      console.error(this)
      state = callback(state);
    }
    return [state, setState];
  }

  /**
   * workloop sera lancé dés le départ, il agira en background grace à la webAPI requestIdleCallback qui lui indiquera quand il peut se relancer
   * Lorsqu'il se relancera, il checkera si nextUnitOfWork est présent et si il dois se rerender.
   *    Si c'est le cas, il vas perform le unit of work
   *      UnitOfWork qui va appeler les enfants à s'executer en les settant comme des unitOfWork à leurs tours
   *    Puis à la fin, on aura plus de nextUnitOfWork donc on pourra finalement commitRoot
   */
  workLoop(deadline) {
    let shouldYield = false
    while (this.nextUnitOfWork && !shouldYield) {
      this.nextUnitOfWork = performUnitOfWork(
        this.nextUnitOfWork
      )
      shouldYield = deadline.timeRemaining() < 1
    }
  
    if (!this.nextUnitOfWork && wipRoot) {
      commitRoot()
    }
  
    requestIdleCallback(workLoop)
  }


  performUnitOfWork(fiber) {
    const isFunctionComponent =
      fiber.type instanceof Function
    if (isFunctionComponent) {
      updateFunctionComponent(fiber)
    } else {
      updateHostComponent(fiber)
    }
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

  updateFunctionComponent(fiber) {
    this.wipFiber = fiber
    this.hookIndex = 0
    this.wipFiber.hooks = []
    const children = [fiber.type(fiber.props)]
    this.reconcileChildren(fiber, children)
  }

  updateHostComponent(fiber) {
    if (!fiber.dom) {
      fiber.dom = this.createDom(fiber)
    }
    this.reconcileChildren(fiber, fiber.props.children)
  }
}

export const MiniReactInstance = new MiniReact();