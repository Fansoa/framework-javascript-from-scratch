function isEvent(propName) {
  return propName.includes('event.');
}

const isFunction = (element) => typeof element === "function";

// CREATE ELELEMNT - (create element structure)
function createElement(type, props, children) {
  if (isFunction(type)) {
    // If the type is a function, it's a component; instantiate and return it
    return type({ ...props, children });
  }

  return {
    type,
    props: {
      ...props,
    },
    children: children?.map(child =>
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

function generateRandomKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 10 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

export {
  isFunction,
  createElement,
  createTextElement,
  isEvent,
  generateRandomKey
}