export class MiniReact {
  treeRoot = null;

  render(element, container) {
    this.treeRoot = {
      dom: container,
      props: {
      },
      children: [
        element
      ],
    }

    const rootDom = this.createDom(element);
    console.log("🚀 ~ file: MiniReact.js:15 ~ MiniReact ~ render ~ treeRootDom:", rootDom)

    container.appendChild(rootDom)
  }

  createElement(type, props, ...children) {
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

    this.setDomProps(dom, structure.props);

    return dom;
  }

  setDomProps(dom, props) {
    console.log(props);
    Object.keys(props)
      .filter((propName) => !this.isEvent(propName))
      .forEach(propName => {
        console.error(propName);
        dom[propName] = props[propName]
      });
  }

  isEvent(propName) {
    return propName.includes('event.');
  }
}

export const MiniReactInstance = new MiniReact();