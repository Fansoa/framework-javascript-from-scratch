import { BrowserRouter, BrowserService } from "../components/BrowserRouter.js";
import { EVENT_TYPE_LIST } from "./constants.js";

const MiniReactDom = {
  render: function (rootElement, routes) {
    BrowserRouter.bind(this)(routes, rootElement);
    console.log(this.savedTree)

    window.addEventListener("reRender", (event) => {
      const newStructure = this.renderStructure(BrowserService.getRouteStructure());
      
      this.savedTree = newStructure;
    });
  },
  renderStructure: function (structure) {
    return this.generateDom(structure);
  },
  generateDom(structure) {
    let element;
    
    // Si c'est un string on le render et rerender comme on veut
    // NOPE
    if (typeof structure.type === "string") {
      if (structure.type === "TEXT_NODE") {
        return document.createTextNode(structure.content);
      }
      element = document.createElement(structure.type);
    }

    if (this.savedTree) {
      
    }

    if (structure.props) {
      for (const propName in structure.props) {
        if (propName === "style") {
          Object.assign(element.style, structure.props[propName]);
        } else if (propName.startsWith("data-")) {
          element.dataset[propName.replace("data-", "")] =
            structure.props[propName];
        } else {
          if (propName.startsWith("on")) {
            const eventType = propName.toLowerCase().substring(2)
            const isEvent = EVENT_TYPE_LIST.includes(eventType)
            if (isEvent) {
              element.addEventListener(eventType, structure.props[propName]);
            }
          }
          element.setAttribute(propName, structure.props[propName]);
        }
      }
    }
    if (structure.events) {
      for (const eventName in structure.events) {
        for (const eventListeners of structure.events[eventName]) {
          element.addEventListener(eventName, eventListeners);
        }
      }
    }
    if (structure.children) {
      for (const child of structure.children) {
        element.appendChild(this.renderStructure(child));
      }
    }

    if (structure.componentKey) {
      element.setAttribute('data-componentKey', structure.componentKey);
    }

    return element;
  }
};

export default MiniReactDom;