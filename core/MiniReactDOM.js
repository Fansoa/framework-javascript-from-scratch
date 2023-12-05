import AVAILABLES_EVENTS_TYPE from "./constants.js";

const MiniReactDOM = {
  render: function render(rootElement, element) {
    rootElement.appendChild(element);
  },

  renderStructure: function generateDom(structure) {
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

    if (structure.children.length) {
      structure.children.forEach((child) => {
        element.appendChild(this.renderStructure(child));
      });
    }

    // eslint-disable-next-line no-param-reassign
    if (structure.component) structure.component.node = element;

    return element;
  },
};

export default MiniReactDOM;
