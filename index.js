import example from "./src/components/example.js";
import AVAILABLES_EVENTS_TYPE from "./core/constants.js";

console.log("🚀 ~ file: index.js:4 ~ example:", example);

function createDom(structure) {
  let element;

  if (typeof structure.type === "string") {
    if (structure.type === "TEXT_NODE") {
      return document.createTextNode(structure.props.text);
    }
    element = document.createElement(structure.type);
  }
  if (structure.props) {
    Object.entries(structure.props).forEach(([propName, propValue]) => {
      if (propName === "className") {
        element.className = propValue;
      }

      if (propName === "style") {
        Object.entries(propValue).forEach(([CSSproperty, CSSvalue]) => {
          element.style[CSSproperty] = CSSvalue;
        });
      }

      if (propName.startsWith("on")) {
        const eventType = propName.substring(2).toLowerCase();

        if (AVAILABLES_EVENTS_TYPE.includes(eventType)) {
          element.addEventListener(eventType, propValue);
        }
      }
    });
  }
  return element;
}

console.log(
  "🚀 ~ file: index.js:39 ~ createDom(example);:",
  createDom(example),
);
