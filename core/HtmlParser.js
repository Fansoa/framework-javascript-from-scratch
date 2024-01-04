import { createElement, isEvent } from "./ElementStructureUtils.js";

/**
 * @function isEmpty
 * @description Checks if an object is empty.
 * @param {object} obj The object to check.
 * @returns {boolean}
 */
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * @function parseHTML
 * @description Parses an HTML string and converts it into a React element.
 * @param {string} htmlString The HTML string to parse.
 * @returns {React.Element}
 */
function parseHTML(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  function parseNode(node) {
    /**
     *  structure will be the structure that is used in a createElement
     *
     *  First structure element is the type
     */
    const structure = [node.nodeName.toLowerCase()];

    if (node.hasAttributes()) {
      // Second structure element is the props
      structure[1] = Array.from(node.attributes).reduce((attrs, attribute) => {
        if (attribute.nodeName === "style") {
          attrs[attribute.name] = JSON.parse(attribute.value);
          return attrs;
        }
        if (isEvent(attribute.nodeName)) {
          const eventValue = attribute.nodeValue;
          attrs[attribute.nodeName] = eventValue;
          // attrs[attribute.nodeName] = eval(`(${eventValue})`);
        } else {
          const attributeName =
            attribute.name == "classname" ? "className" : attribute.name;
          attrs[attributeName] = attribute.value;
        }

        return attrs;
      }, {});
    } else {
      structure[1] = {};
    }

    const children = [];
    if (node.childNodes.length > 0) {
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          const parsedElement = parseNode(child);
          children.push(createElement(...parsedElement));
          /**
           *  De base il y a  && child.nodeValue.trim() !== ''
           *  J'ai retiré, si un élément n'a pas de child tous casse, donc on mettre un espace à chaque fois
           *  Comme ça il y aura toujours un child (un string vide donc osef ça impacte pas le visuel)
           */
        } else if (
          child.nodeType === Node.TEXT_NODE &&
          child.nodeValue.trim()
        ) {
          children.push(child.nodeValue.trim());
        }
      });
    }

    // Last structure element is the children
    structure[2] = children;

    return structure;
  }

  return parseNode(doc.body.firstChild);
}

/**
 * @function parseFunction
 * @description Parses a function and its arguments into a new Function object.
 * @param {function} func The function to be parsed.
 * @param {...*} args The arguments to be passed to the function.
 * @returns {function}
 */
function parseFunction(func, ...args) {
  const params = args.map((arg) => `'${arg}'`).join(", ");
  const functionString = `(${func.toString()})(${params})`;

  return new Function(functionString);
}

/**
 * @function parseEvents
 * @description Parses event handlers from an object and replaces them with callback functions.
 * @param {object} content The object containing event handlers.
 * @param {object} functions The map of function names to their corresponding functions.
 * @returns {object} An object with the parsed content and a map of event callbacks.
 */
function parseEvents(content, functions) {
  const eventCallbacks = {};

  function executeCallback(eventKey) {
    const { func, params } = eventCallbacks[eventKey];
    if (typeof func === "function") {
      func(...params);
    }
  }

  function createCallbackFunction(eventKey) {
    return function () {
      executeCallback(eventKey);
    };
  }

  function traverse(node) {
    if (Array.isArray(node)) {
      node.forEach((item) => traverse(item));
    } else if (node && typeof node === "object") {
      Object.keys(node).forEach((key) => {
        if (key.startsWith("event.") && typeof node[key] === "string") {
          const eventValue = node[key];
          const match = eventValue.match(/(\w+)(?:\(([^)]*)\))?/);

          if (match) {
            const functionName = match[1];
            const parameters = match[2]
              ? match[2]
                  .split(",")
                  .map((param) => param.trim().replace(/['"]/g, ""))
              : [];
            const func = functions[functionName];
            const eventKey = `${functionName}_${
              Object.keys(eventCallbacks).length
            }`;
            eventCallbacks[eventKey] = { func, params: parameters ?? {} };
            const callbackFunction =
              parameters.length > 0 ? createCallbackFunction(eventKey) : func;
            node[key] = callbackFunction;
          }
        } else {
          traverse(node[key]);
        }
      });
    }
  }

  traverse(content);

  return { content, eventCallbacks };
}

export { parseFunction, parseHTML, parseEvents };