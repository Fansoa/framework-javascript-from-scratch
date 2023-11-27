import BrowserRouter from "../components/BrowserRouter.js";
import { EVENT_TYPE_LIST } from "./constants.js";

const MiniReactDom = {
  currentVirtualDom: null,
  updatedVirtualDom: null,

  render: function (rootElement, routes) {
    BrowserRouter.bind(this)(routes, rootElement);
  },
  renderStructure: function (structure) {
    this.currentVirtualDom = structure;
    window.addEventListener("reRender", (event) => {
      console.log(event.structure);
    });
    return this.generateDom(this.currentVirtualDom);
  },
  generateDom(structure) {
    console.warn(structure)
    let element;
    if (typeof structure.type === "string") {
      if (structure.type === "TEXT_NODE") {
        return document.createTextNode(structure.content);
      }
      element = document.createElement(structure.type);
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

    // element.addEventListener("reRender", () => {
    //   this.updatedVirtualDom = this.generateDom(structure)
    //   console.log(this.currentVirtualDom)
    //   console.log(this.updatedVirtualDom)
    // });

    return element;
  }
};

export default MiniReactDom;

/**
 * Tu fais un render.
 *    Créer un virtualDom avec generateDom, celui ci n'est render que lorsque la fonction render est lancée
 * 
 * 
 */