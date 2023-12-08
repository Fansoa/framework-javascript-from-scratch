/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import example from "./src/components/example.js";
import AVAILABLES_EVENTS_TYPE from "./core/constants.js";

/**
 * Crée un élément DOM à partir de la structure fournie.
 * @param {object} structure - Structure représentant les propriétés de l'élément à créer.
 * @returns {HTMLElement|Text} - Renvoie l'élément DOM créé ou un nœud de texte.
 */
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

/**
 * Represente la prochaine unité de travail
 * @type {Object|null}
 */

let nextUnitOfWork = null;

/**
 * Noeud Fiber en cours de travail pour le rendu.
 * Sa valeur est Initialisé après le premier appel de la fonction render
 */

let wipRoot = null;

/**
 * Effectue une unité de travail pour la réconciliation de la fibre dans la construction de l'arbre virtuel.
 * @function performUnitOfWork
 * @param {object} fiber Objet représentant un nœud dans la structure de l'arbre virtuel.
 * @returns {object|null} Renvoie le prochain nœud à traiter ou null s'il n'y a plus de nœud à traiter.
 */

function performUnitOfWork(fiber) {
  const hasNoDomInFiber = !fiber.dom;
  const hasParentInFiber = fiber.parent;

  if (hasNoDomInFiber) {
    fiber.dom = createDom(fiber);
  }

  if (hasParentInFiber) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  // Récupère la liste des enfants d'un élément (probablement un nœud du DOM ou un composant) à partir de l'objet.
  const elements = fiber.props.children;

  // Initialise une variable pour garder une trace du nœud précédent (frère précédent) dans la création de la structure d'arbre.
  let prevSibling = null;

  // Itère à travers chaque élément dans le tableau elements en utilisant la méthode forEach,
  // où element représente l'élément actuel et i est l'index de cet élément dans le tableau.
  elements.forEach((element, i) => {
    const isFirstChild = i === 0;
    // Crée un nouvel objet newFiber représentant un nœud dans la structure d'arbre.
    const newFiber = {
      type: element.type, // Le type de l'élément.
      props: element.props, // Les propriétés de l'élément.
      parent: fiber, // Une référence vers le nœud parent dans l'arbre.
      dom: null, // Une référence vers le nœud du DOM associé à cet élément (initialisé à null).
    };

    // Vérifie si c'est le premier élément enfant. Si oui, attribue le nœud nouvellement créé comme enfant du nœud actuel (fiber).
    // Sinon, attribue le nœud nouvellement créé comme frère suivant du nœud précédent.
    if (isFirstChild) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    // Met à jour prevSibling pour qu'il pointe vers le nœud actuel pour la prochaine itération.
    prevSibling = newFiber;
  });

  // Vérifie s'il y a un enfant pour le nœud fiber.
  // Si c'est le cas, cela signifie qu'il y a un nœud enfant à traiter, donc il le retourne.
  const hasChild = fiber.child;
  if (hasChild) {
    return fiber.child;
  }

  // Initialise une variable nextFiber avec la valeur de fiber actuelle,
  // prête à être utilisée pour parcourir les nœuds parents si nécessaire.
  let nextFiber = fiber;

  // Démarre une boucle while qui va parcourir les nœuds parents à partir du nœud actuel (fiber) vers le haut de l'arbre.
  while (nextFiber) {
    // À chaque itération, vérifie s'il y a un nœud frère (sibling) pour le nœud nextFiber actuel. Si un frère existe,
    // cela signifie qu'il y a un autre nœud à traiter au même niveau, donc il le retourne.
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // Si aucun frère n'est trouvé, le code remonte d'un niveau dans l'arbre en faisant référence au parent du nœud actuel.
    // Cela permet de remonter progressivement dans la structure de l'arbre pour chercher le prochain nœud à traiter.
    nextFiber = nextFiber.parent;
  }
}

/**
 * Exécute une boucle de travail tant qu'il y a une unité de travail en attente.
 * @function workLoop
 * @returns {void}
 */

function workLoop() {
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
}

function commitRoot() {
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}
​
function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  domParent.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

/**
 * Return un élément dans le container, initialise l'unité de travail suivante.
 * @function render
 * @param {object} element - L'element à rendre.
 * @param {HTMLElement} container - Le container où l'élément devra être rendu.
 * @returns {void}
 */

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };
  nextUnitOfWork = wipRoot;
}

render(example, document.getElementById("root"));

// Lance le processus de rendu de l'application ou de l'interface utilisateur.
requestIdleCallback(workLoop);
