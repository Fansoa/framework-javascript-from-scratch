import AVAILABLES_EVENTS_TYPE from "./constants.js";

const MiniReactDOM = {
  render: function render(rootElement, element) {
    rootElement.appendChild(element);

    window.addEventListener("reRender", (e) => {
      const oldChild = e.detail.node;
      const { parentNode } = e.detail.node;
      const newChild = this.renderStructure(e.detail.render());

      if (e.detail.node.childNodes.length) {
        parentNode.replaceChild(newChild, oldChild);
      }
    });
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
        if (propName === "style") {
          Object.entries(propValue).forEach(([CSSproperty, CSSvalue]) => {
            element.style[CSSproperty] = CSSvalue;
          });
        } else if (propName.startsWith("on")) {
          const eventType = propName.substring(2).toLowerCase();

          if (AVAILABLES_EVENTS_TYPE.includes(eventType)) {
            element.addEventListener(eventType, propValue);
          }
        } else if (propName === "children") {
          if (propValue.length) {
            propValue.forEach((child) => {
              element.appendChild(this.renderStructure(child));
            });
          }
        } else {
          element.setAttribute(propName, propValue);
        }
      });
    }

    if (structure.component) {
      // eslint-disable-next-line no-param-reassign
      structure.component.node = element;
    }

    return element;
  },
};

export default MiniReactDOM;
