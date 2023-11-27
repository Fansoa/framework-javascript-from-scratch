import { BrowserRouter, BrowserService } from "../components/BrowserRouter.js";
import { EVENT_TYPE_LIST } from "./constants.js";

const MiniReactDom = {
  renderPage(rootElement, domToRender) {
  
    if (rootElement.childNodes.length) {
      rootElement.replaceChild(
        this.renderStructure(domToRender),
        rootElement.childNodes[0]
      );
    } else {
      rootElement.appendChild(this.renderStructure(domToRender))
    };
  },

  render: function (rootElement, routes) {
    BrowserRouter.bind(this)(routes, rootElement);
    window.addEventListener("reRender", (event) => {
      const newPageStructure = BrowserService.getRouteStructure();

      const componentDetail = event.detail.componentDetail;
      this.updateRender(componentDetail.component, newPageStructure);

      this.renderPage(rootElement, newPageStructure)
      console.error(this.savedTree)
    });
  },
  updateRender(component, object) {
    function findComponentById(componentId, obj) {
      if (obj.componentKey === componentId) {
        return obj;
      }
      if (obj.children) {
        for (const child of obj.children) {
          const found = findComponentById(componentId, child);
          if (found) return found;
        }
      }
      return null;
    }
  
    let componentToUpdate = findComponentById(component.componentKey, object);
    if (componentToUpdate) {
      const componentStructure = component.renderedStructure

      componentToUpdate.children = componentStructure.children;
      componentToUpdate.needsUpdate = componentStructure.needsUpdate;
      componentToUpdate.props = componentStructure.props;
      componentToUpdate.renderedStructure = componentStructure.renderedStructure;
      componentToUpdate.state = componentStructure.state;
      componentToUpdate.dom = null;
      return true;
    }
  
    return false;
  },
  // updateFiberState(newState, componentId, object) {
  //   function findComponentById(componentId, obj) {
  //     if (obj.componentKey === componentId) {
  //       return obj;
  //     }
  //     if (obj.children) {
  //       for (const child of obj.children) {
  //         const found = findComponentById(componentId, child);
  //         if (found) return found;
  //       }
  //     }
  //     return null;
  //   }
  
  //   const componentToUpdate = findComponentById(componentId, object);
  //   if (componentToUpdate) {
  //     componentToUpdate.state = newState;
  //     return true;
  //   }
  
  //   return false;
  // },

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
      for (let index = 0; index < structure.children.length; index++) {
        const child = structure.children[index];
        try {
          let childToAppend;
          if (
            this.currentFiber &&
            this.currentFiber.componentKey &&
            child.parentProps === this.currentFiber.parentProps &&
            child.state === this.currentFiber.state
          ) {
            console.log('Cache element', this.currentFiber);
            childToAppend = this.currentFiber.dom;
          }
    
          if(!childToAppend) {
            childToAppend = this.renderStructure(child);
            this.currentFiber = child;
          }
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