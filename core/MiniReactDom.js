import { BrowserRouter, BrowserService } from "../components/BrowserRouter.js";
import { EVENT_TYPE_LIST } from "./constants.js";

const MiniReactDom = {
  render: function (rootElement, routes) {
    BrowserRouter.bind(this)(routes, rootElement);
    /** 
     * @todo mettre en place le rerender de toute la page, pas juste d'un élément
     * 
     * Actuellement lors du setState on ne sauvegarde pas le nouveau state dans la structure
     * */
    window.addEventListener("reRender", (event) => {
      const newPageStructure = BrowserService.getRouteStructure();
      // const newStructure = event.detail.structure;
      // const newElement = this.renderStructure(newStructure);

      // element.replaceWith(newElement);
      const componentDetail = event.detail.componentDetail;
      this.updateFiberState(componentDetail.newState, componentDetail.componentId, newPageStructure);
      // console.log(newPageStructure)
      // rootElement.innerHtml = this.renderStructure(newPageStructure)
      console.group('Root')
      // console.log(rootElement);
      console.error(newPageStructure);
      console.groupEnd();
      this.renderStructure(newPageStructure)
      // rootElement.appendChild(this.renderStructure(newPageStructure));
    });
  },
  updateFiberState(newState, componentId, object) {
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
  
    const componentToUpdate = findComponentById(componentId, object);
    if (componentToUpdate) {
      componentToUpdate.state = newState;
      return true;
    }
  
    return false;
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
          console.log('poney', child)
    
          this.currentFiber = child;
    
          // console.error(element)
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