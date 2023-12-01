export class MiniReact {
  treeRoot = null;

  render(element, container) {
    window.addEventListener('reRender', (event) => {
      console.log(event.detail);
    })
    this.treeRoot = {
      dom: container,
      props: {
      },
      children: [
        element
      ],
    }

    const rootDom = this.createDom(element);
    container.appendChild(rootDom)
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
      const event = new CustomEvent('reRender', {
        detail: {
          state
        }
      });

      window.dispatchEvent(event);
    }
    return [state, setState];
  }
}

export const MiniReactInstance = new MiniReact();