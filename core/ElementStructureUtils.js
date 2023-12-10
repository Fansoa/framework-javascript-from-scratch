/**
 * @function isEvent
 * @description Determines if the property name is an event name.
 * @param {string} propName The property name to test.
 * @returns {boolean}
 */
function isEvent(propName) {
  return propName.includes("event.");
}

/**
 * @const
 * @description Returns `true` if the element is a function, `false` otherwise.
 * @param {any} element The element to test.
 * @returns {boolean}
 */
const isFunction = (element) => typeof element === "function";

/**
 * @function createElement
 * @description Creates a React element.
 * @param {string|function|React.Fragment} type The type of the element.
 * @param {object} props The props for the element.
 * @param {React.Node[]} children The children for the element.
 * @returns {React.Element}
 */
function createElement(type, props, children) {
  if (isFunction(type)) {
    //  If the type is a function, it's a component; instantiate and return it
    return type({ ...props, children });
  }

  return {
    type,
    props: {
      ...props,
    },
    children: children?.map((child) =>
      typeof child === "object" ? child : createTextElement(child),
    ),
  };
}

function createTextElement(content) {
  return {
    type: "TEXT_NODE",
    props: {
      content,
    },
    children: [],
  };
}

export { isFunction, createElement, createTextElement, isEvent };
