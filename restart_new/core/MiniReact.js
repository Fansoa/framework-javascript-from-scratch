let nextTask = null;
let renderedRoot = null;
let currentRoot = null;

const isFunction = (element) => typeof element === "function";

// RENDER - (render the element inside the container)
function render(element, container) {
  // Permet de stocker l'arborescence qui est en cours
  currentRoot = {
    parent: container,
    type: 'create',
    content: isFunction(element) ? element() : element,
    cache: renderedRoot,
  };


  // On utilise la workQueue donc on doit set le nextTask
  nextTask = currentRoot;
}

// CREATE ELELEMNT - (create element structure)
function createElement(type, props, children) {
  if (isFunction(type)) {
    // If the type is a function, it's a component; instantiate and return it
    return type({ ...props, children });
  }

  return {
    type,
    props: {
      ...props,
    },
    children: children.map(child =>
      typeof child === "object"
        ? child
        : createTextElement(child)
    ),
  }
}

function createTextElement(content) {
  return {
    type: "TEXT_NODE",
    props: {
      content,
    },
    children: [],
  }
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
    } : null;

    nextFiber.sibling = siblingFiber;
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
  
}

// COMMIT - (Will allow us to commit our work, setting the renderedRoot / currentRoot in order to have a sort of caching system used in case of updates)
function commitRoot() {
  renderedRoot = currentRoot;
  currentRoot = null;
}

// STATE - (our state handling hook)
function useState(initialState) {
  let state = initialState;

  const setState = callback => {
    state = callback(state);
    // currentRoot = {
    //   parent: container,
    //   type: 'create',
    //   content: element,
    //   cache: renderedRoot,
    // }
    // wipRoot = {
    //   dom: container,
    //   props: {
    //     children: [element],
    //   },
    //   alternate: currentRoot,
    // }

    console.log(renderedRoot);
    currentRoot = {
      parent: renderedRoot.parent,
      type: 'update',
      content: renderedRoot.child.content,
      cache: renderedRoot,
    }

    nextTask = currentRoot;
    console.log(state);
  }
  return [state, setState];
}

// REQUEST IDLE CALLBACK - (used to initiate the start of our work queue)
requestIdleCallback(workQueue);

export const MiniReact = {
  createElement,
  createDom,
  render,
  useState
}