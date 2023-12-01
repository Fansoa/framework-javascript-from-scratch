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
}

export const MiniReactInstance = new MiniReact();