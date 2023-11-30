import BrowserRouter from "../components/BrowserRouter.js";
import { EVENT_TYPE_LIST } from "./constants.js";

const MiniReactDom = {
  render: function (rootElement, routes) {
    BrowserRouter.bind(this)(routes, rootElement);
    /** @todo mettre en place le rerender de toute la page, pas juste d'un élément */
    window.addEventListener("reRender", (event) => {
      console.log()
      // const newStructure = event.detail.structure;
      // const newElement = this.renderStructure(newStructure);

      // element.replaceWith(newElement);
    });
  },
  renderStructure: function (structure) {
    return this.generateDom(structure);
  },
  generateDom(structure) {
    let element;
    if (typeof structure.type === "string") {
      if (structure.type === "TEXT_NODE") {
        return document.createTextNode(structure.content);
      }
      element = document.createElement(structure.type);
    }

    // if (structure.componentKey && this.currentFiber) {
    //   // && this.currentFiber && this.currentFiber.parentProps && this.currentFiber.dom
    //   console.group('COMPARE')
    //   console.error(structure.parentProps)
    //   console.log(this.currentFiber.parentProps)
    //   console.log('returned value', this.currentFiber)
    //   console.groupEnd('END COMPARE')
    //   if (this.currentFiber && structure.parentProps == this.currentFiber.parentProps) return this.currentFiber.dom;
    // }

    if (structure.props) {
      // if(structure.componentKey) {
      //   console.warn(this.currentFiber)
      //   console.log(structure)
      // }

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
    
    /*
    if (structure.children) {
      for (let index = 0; index < structure.children.length; index++) {
        const child = structure.children[index];
        try {
          // const element = array[index];
          if(this.currentFiber) {
            console.log(index)
            console.table(['test', this.currentFiber, this.currentFiber.children[index]])
          }
          this.currentFiber = child;
          element.appendChild(this.renderStructure(child));
        } catch (error) {
          console.group('CATCH')
          console.log("child ",child)
          console.warn(this.renderStructure(child))
          console.error(error)
          console.groupEnd()
        }
      }
    }
    */

    if (structure.children) {
      for (let index = 0; index < structure.children.length; index++) {
        const child = structure.children[index];
        try {
          if (
            this.currentFiber &&
            this.currentFiber.componentKey &&
            child.parentProps === this.currentFiber.parentProps &&
            child.state === this.currentFiber.state
          ) {
            console.log('Cache return', this.currentFiber)
            console.log('New ', structure)
            return this.currentFiber.dom;
          }
    
          this.currentFiber = child;
    
          console.error(element)
          element.appendChild(this.renderStructure(child));
        } catch (error) {
          // Error handling code
        }
      }
    }



    this.currentFiber = structure;

    if (structure.componentKey) {
      element.setAttribute('data-componentKey', structure.componentKey);
    }
    structure.dom = element;

    return element;
  }
};

export default MiniReactDom;