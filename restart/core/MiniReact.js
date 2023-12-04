export class MiniReact {
  treeRoot = null;
  newTreeRoot = null;
  nextUnitOfWork = null;
  nextTree = null;

  render(element, container) {
    this.nextUnitOfWork = {
      containerDom: container,
      children: [
        element
      ],
    }

    this.renderActivation(element, container);
  }

  /** @todo find more accurate name */
  renderActivation(element, container) {
    const elementDom = this.createDom(element);
    container.appendChild(elementDom);
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

    this.setDomParameters(dom, structure);
    this.setDomChildren(dom, structure);

    return dom;
  }

  // PROPS
  setDomParameters(dom, structure) {
    this.setDomProps(dom, structure.props);
    this.setDomEvents(dom, structure.props);
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
      state = callback(state);
    }
    return [state, setState];
  }

  // Workloop
  workLoop(deadline) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
      nextUnitOfWork = performUnitOfWork(
        nextUnitOfWork
      )
      shouldYield = deadline.timeRemaining() < 1
    }
    requestIdleCallback(workLoop)
  }

  // requestIdleCallback(workLoop)

  performUnitOfWork(fiber) {
    // Si l'élément n'a pas encore de dom (create, pas update) on lui en créer un
    if (!fiber.dom) {
      fiber.dom = createDom(fiber)
    }

    const children = fiber.children
    let index = 0
    let prevSibling = null

    while (index < children.length) {
      const element = children[index];

      const newFiber = {
        type: element.type,
        props: element.props,
        parent: fiber,
        dom: null,
      };

      if (index === 0) {
        fiber.child = newFiber;
      } else {
        prevSibling.sibling = newFiber;
      }

      prevSibling = newFiber;
      index++;
    }

    if (fiber.child) {
      return fiber.child
    }
    let nextFiber = fiber;

    while (nextFiber) {
      if (nextFiber.sibling) {
        return nextFiber.sibling
      }
      nextFiber = nextFiber.parent
    }
  }

  /**
   * Ajouter une méthode commitWork
   *    Dedans tu définis tes types d'actions (replace, update etc)
   * 
   * Avoir une méthode render() qui relance le return ?
   * 
   * beginWrok = vas plus bas vers enfant
   * complete = va plus haut vers parent
   * 
   * Utilise des while, pas de recurstive
   */
}

export const MiniReactInstance = new MiniReact();