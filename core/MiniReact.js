import { createElement, isFunction } from "./ElementStructureUtils.js";

let nextTask = null;
let renderedRoot = null;
let currentRoot = null;
let hookId = 0;
let hooks = [];
let hooksLenght = 0;

// RENDER - (render the element inside the container)
function render(element, container) {
  // Permet de stocker l'arborescence qui est en cours
  currentRoot = {
    parent: container,
    type: 'create',
    cache: renderedRoot,
    page: element,
    hooks
  };

  // On utilise la workQueue donc on doit set le nextTask
  nextTask = currentRoot;
  const content = isFunction(element) ? element() : element;

  /**
   * Si on a un state qui est utilisé et que l'on créer notre composant directement dans currentRoot
   *    Dans le useState comme le composant (et donc le useState sera créer avant / pendant la création du currentRoot)
   */

  currentRoot.content = content;
  nextTask.content = content;
  hooksLenght = hooks.length;
}

// CREATE DOM - (create the dom of ONE element. Not in charge of child dom creation, with unitOfWork tasks they are all handled independently)
function createDom(structure) {
  const dom = structure.type === "TEXT_NODE" ?
    document.createTextNode(structure.props.content) :
    document.createElement(structure.type);
  
  updateDom(dom, {}, structure);
  
  return dom;
}

// UPDATE DOM - (update the dom of an element, it's props event etc. On createDom it will only be adding, not updating)
function updateDom(dom, prevStructure, newStructure) {
  if (Object.keys(prevStructure).length) {
    setDomParameters(dom, newStructure, true);
  }

  setDomParameters(dom, newStructure);
}

// SET DOM PARAMETERS & SET DOM PROPS - (in charge of setting or resetting the dom parameters, props, events etc)
function setDomParameters(dom, structure, mustReset = false) {
  setDomProps(dom, structure.props, mustReset);
  setDomEvents(dom, structure.props, mustReset);
}

function setDomProps(dom, props, mustReset = false) {
  Object.keys(props)
    .filter((propName) => !isEvent(propName))
    .forEach(propName => {
      dom[propName] = mustReset ? "" : props[propName];
    });
}

function setDomEvents(dom, props, mustReset = false) {
  Object.keys(props)
  .filter((propName) => isEvent(propName))
  .forEach(eventName => {
    const eventType = eventName.split('.')[1]
    const eventAction = mustReset ? 'removeEventListener' : 'addEventListener';
    const eventFunction = typeof props[eventName] === 'string' ?
      new Function(props[eventName]) :
      props[eventName];

    dom[eventAction](eventType, props[eventName]);
  });
}

function isEvent(propName) {
  return propName.includes('event.');
}

// WORK QUEUE - (The functions that will allow to handle our work queue)
function workQueue(reqIdleCall) {
  while (nextTask) {
    nextTask = executeTask(nextTask);
  }

  /**
   * Si plus de nextTask ça veut dire que notre render est complété
   * Comme ça va tourner en background (et en boucle) on check si currentRoot est présent
   *    pour pas lancer notre commitRoot en boucle (commitRoot set currentRoot à null)
   */
  if (!nextTask && currentRoot) {
    commitRoot();
  }

  requestIdleCallback(workQueue);
}

function executeTask(task) {
  const elementDom = createDom(task.content);
  task.parent.appendChild(elementDom);

  const child = task.content.children[0];

  const nextFiber = child ? {
    parent: elementDom,
    parentFiber: task,
    type: 'create',
    content: child,
    hooks
  } : null;

  let previousSibling = null;
  // Permet de gérer les siblings, on récupère notre enfant et créer une liste chainée de sibling.
  for (let index = 1; index < task.content.children.length; index++) {
    const sibling = task.content.children[index];
    const siblingFiber = sibling ? {
      parent: elementDom,
      parentFiber: task,
      type: 'create',
      content: sibling,
      hooks
    } : null;

    if (previousSibling) {
      previousSibling.sibling = siblingFiber;
    } else {
      nextFiber.sibling = siblingFiber;
    }
    previousSibling = siblingFiber;
  }

  task.child = nextFiber;

  /**
   * Si il y a un enfant on le renvoie afin d'être sûr de le traiter lui puis ces enfants etc.
   * Les siblings ne seront géré qu'a la fin, lorsque l'on atteint le bout d'une branche
   * Ensuite on remontera au parent, on executera son sibling et ainsi de suite
   */ 
  if (task.child) {
    return task.child;
  }

  while (nextTask) {
    if(nextTask && nextTask.sibling) {
      return nextTask.sibling;
    }
    // Si il n'y a plus d'enfant (et ici de sibling) on retourne au parent afin de prendre en compte les sibling du parent puis ces enfants etc
    nextTask = nextTask.parentFiber;
  }
}


function updateComponent(task) {
  /**
   * On imagine que l'on est dans une update d'un composant (sans savoir comment on arrive ici)
   * 
   * nextTask = task // pour indiquer qu'il s'agit de notre prochaine task
   * /!\ il faut rerender l'élélemnt si c'est une fonction ! /!\
   *    Car un composant (une fonction du coup) effectue le use state lorsqu'il est render, donc on ne peut pas juste récupérer la structure.
   *      Il faut la rerender, ce qui va relancer son useState
   *        Comme on relance le useState, on utilise l'ancien state du composant +
   *            On execute les actions sauvegardé à l'interieur précedement
   *        Donc on se retrouve avec un rerender qui s'effectue avec les states mis à jour.
   * 
   * Pour récupérer les anciens state, comme on se base sur task, on peut récupérer le hook via son cache (?)
   * Du coup si on reprend l'ancien cache et qu'on fait les updates sur le nouveau etc
   *    On va avoir un doublon (?) comme on prend la valeur de l'ancien cache, on lance les callback dans la queue du hook.
   *      Le hook du task sera égal à quoi ici ?
   */
  nextTask = task;

  // Si c'est une fonction / composant on relance la fonction
  const children = isFunction(task.type) ? task.type(task.props) : task.children;
}

// Ici on va gérer la reconciliation des enfants. Bon courage.
function reconciliation() {

}

// COMMIT - (Will allow us to commit our work, setting the renderedRoot / currentRoot in order to have a sort of caching system used in case of updates)
function commitRoot() {
  currentRoot.parent.replaceChildren(currentRoot.child.parent);
  renderedRoot = currentRoot;
  currentRoot = null;
  // hookId = 0;
  // rerenderCount++;
}

// STATE - (our state handling hook)
function useState(initialState) {
  /**
   * Lors du rerender, on vas récupérer le hook du render précedent.
   *    Dans le setState on va push notre action dans la queue.
   *    Donc lorsque l'on va récupérer le hook du render précedent, on aura push l'action sans l'executer, car l'éxecution se fait avant le setState.
   *      Par conséquent, on indique que dans notre prochain render il faudra faire une action sur le state
   *      puis on ammorce le nouveau render.
   * 
   * -----
   * 
   * Ici c'est quand on utilise le useState
   * Techniquement, on instancie le useState lorsque l'on est sur notre composant
   *    Autrement dit sur notre nextTask
   *      Donc on peut set le hook du nextTask car il s'agira forcement de la task actuelle
   * 
   * @todo changer le nom callback
   */

  const hookIndex = hooksLenght === 0 ? hookId : hookId - hooksLenght;
  const cachedHook = nextTask?.cache?.hooks[hookIndex];
  /**
   * On rajoute un hook id pour identifier notre hook. On ne peux pas juste avec son index dans hooks car on n'as pas de moyen de savoir à quel index on est
   *    Méthode js permettant d'indiquer le nombre de fois ou l'on call une fonction ?
   */
  const hook = {
    state: cachedHook ? cachedHook.state : initialState,
    queue: []
  };

  nextTask.hook = hook;

  /**
   * Ici on utilisera donc la queue de l'ancier hook, mais on modifiera bien le hook.state, car il s'agit du hook actuel (de notre nouvelle etape de render)
   * Puisqu'on est dans le next task on peut utiliser son cache
   */
  cachedHook?.queue.forEach(callback => {
    hook.state = callback(hook.state)
  });

  const setState = callback => {
    hook.queue.push(callback);

    /**
     * Ici on doit lancer notre rerender. Pour cela on doit donc "remettre à 0" notre nextTask en la rendant égal à notre renderedRoot, ce qui permettra de relancer tous le proccess.
     * Il faudra donc gérer la reconciliation
     */

    currentRoot = {
      parent: renderedRoot.parent,
      type: 'create',
      cache: renderedRoot,
      page: renderedRoot.page,
      hooks
    };
  
    nextTask = currentRoot;
    const content = isFunction(renderedRoot.page) ? renderedRoot.page() : renderedRoot.page;
  
    currentRoot.content = content;
    nextTask.content = content;
  }

  hookId++;
  hooks.push(hook);
  return [hook.state, setState];
}

// REQUEST IDLE CALLBACK - (used to initiate the start of our work queue)
requestIdleCallback(workQueue);

export const MiniReact = {
  createElement,
  createDom,
  render,
  useState
}