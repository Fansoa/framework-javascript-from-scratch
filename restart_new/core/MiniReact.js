let nextTask = null;

function createElement(type, props, children) {
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

function render(element, container) {
  nextTask = {
    parent: container,
    type: 'create',
    content: element
  }
}

function createDom(structure) {
  const dom = structure.type === "TEXT_NODE" ?
    document.createTextNode(structure.props.content) :
    document.createElement(structure.type);    
  
  updateDom(dom, {}, structure);
  
  return dom;
}

function updateDom(dom, prevStructure, newStructure) {
  if (Object.keys(prevStructure).length) {
    setDomParameters(dom, newStructure, true);
  }

  setDomParameters(dom, newStructure);
}

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

function workQueue(reqIdleCall) {
  while (nextTask) {
    nextTask = executeTask(nextTask);
  }

  requestIdleCallback(workQueue);
}

function executeTask(task) {
  // Pour le moment on va juste gérer le create, par la suite en fonction du type d'action on fera un update, un delete etc.
  console.log(task)
  if (task.type === "create") {
    const elementDom = createDom(task.content);
    task.parent.appendChild(elementDom);

    const child = task.content.children[0];
    const sibling = task.content.children[1];

    const nextFiber = child ? {
      parent: elementDom,
      parentFiber: task,
      type: 'create',
      content: child,
    } : null;

    const siblingFiber = sibling ? {
      parent: elementDom,
      parentFiber: task,
      type: 'create',
      content: sibling,
      previousSibling: nextFiber,
    } : null;

    if (nextFiber) {
      nextFiber.sibling = siblingFiber;
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

    /**
     * Return la new task task.child si c'est pas vide
     *    Sinon
     *        while nextTask
     *            si nextFiber.sibling
     *              return nextFiber.sibling
     *            Sinon
     *              return nextFiber.parent
     * 
     * Comme ça si il y a un enfant il va les traiter avant de toucher le sibling grace au return.
     * Et si il a des sibling il va les traiter grace au return puis seulement lorsque tous les sibling ont été fait (il n'en reste plus)
     * il va return le parent, et ainsi de suite jusqu'à ce qu'il recroise des siblings etc
     * 
     * Normalement cela traitera TOUS les cas de figure, enfant multiple, parent, sibling etc
     */

    /**
     * @todo Gestion des sibling.
     * 
     * Actuellement on gère uniquement le cas d'un child.
     * Si l'élément à un enfant
     *    on créer une fiber à partir de celui ci
     *    on set le child de notre task actuel avec la fiber créer
     *    on set nextTask = à notre fiber créer
     * 
     * Maintenant, on doit :
     * 
     * Garder le check de l'enfant.
     * Si pas d'enfant
     *    Check si il y a un sibling
     *      reproduire le comportement du child :
     *          création du fiber
     *          set du sibling
     *          set de nextTask
     */
  }
}

requestIdleCallback(workQueue);

export const MiniReact = {
  createElement,
  createDom,
  render
}