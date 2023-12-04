function createElement(type, props, children) {
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

function createTextElement(content) {
  return {
    type: "TEXT_NODE",
    props: {
      content,
    },
    children: [],
  }
}

export const MiniReact = {
  createElement,
}