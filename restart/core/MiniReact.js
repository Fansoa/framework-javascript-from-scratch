export class MiniReact {
  treeRoot = null;
  currentTree = null;


  render(element, container) {
    this.currentTree = {
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

    if (structure.props) {
      this.setDomProps(dom, structure.props);
      this.setDomEvents(dom, structure.props);
    }

    structure.children.forEach((childStructure) => {
      const childDom = this.createDom(childStructure);
      dom.appendChild(childDom);
    });
    return dom;
  }

  setDomProps(dom, props) {
    Object.keys(props)
      .filter((propName) => !this.isEvent(propName))
      .forEach(propName => {
        dom[propName] = props[propName]
      });
  }

  setDomEvents(dom, props) {
    Object.keys(props)
    .filter((propName) => this.isEvent(propName))
    .forEach(eventName => {
      const eventType = eventName.split('.')[1]
      dom.addEventListener(eventType, props[eventName]);
    });
  }

  isEvent(propName) {
    return propName.includes('event.');
  }

  useState(initialState) {
    let state = initialState;

    const setState = callback => {
      state = callback(state);
    }
    return [state, setState];
  }
}

export const MiniReactInstance = new MiniReact();