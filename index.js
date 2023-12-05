/* eslint-disable prefer-destructuring */
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

let nextUnitOfWork = null;

function performUnitOfWork(element) {
  let fiber = null;
  if (!element.dom) {
    fiber = {
      type: element.type,
      props: element.props,
      dom: createDom(element),
      parent: null,
      child: element.props.children[0] || null,
      sibling: element.props.children[1] || null,
    };

    // Si il y a un enfant,
    // la prochaine unité de travail sera l'enfant
    // Sinon si il a un frere,
    // ce sera son plus proche frere
    if (element.props.children[0].length) {
      nextUnitOfWork = element.props.children[0];
    } else if (element.props.children[1]) {
      nextUnitOfWork = element.props.children[1];
    }

    return fiber;
  }
}

// performUnitOfWork me return une fibre
// maintenant je dois trouver un moyen pour que la function passe a travers
// tout l'arbre d'element afin qu'il puisse me generer l'arborescence de mes fibres
// creuser les notions tel que la workloop et le render qui permet d'initialiser
// la les units of work

console.log(
  "🚀 ~ file: index.js:60 ~ performUnitOfWork(example):",
  performUnitOfWork(example),
);

requestIdleCallback(() => console.log("toto"));
