let nextTask = null;
let currentRoot = null;
let vdomRoot = null;

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

  currentRoot = {
    dom: container,
    props: {},
    children: [element],
  };

  console.log(currentRoot);
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
  if (task.type === "create") {
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
}


requestIdleCallback(workQueue);

export const MiniReact = {
  createElement,
  createDom,
  render
}

/**
 * Gestion des states
 * 
 * Reprendre ce qui a été fait sur les précédentes branch pour le useState
 * Maintenant on utilise un principe de workQueue, donc on doit utiliser ce même principe pour les states (?)
 * 
 * Dans tous les cas il faudra mettre en place un cache / alternate.
 * Dans le cache on stockera notre précedente version de root (currentRoot)
 * Est-ce qu'on stocke le alternate pour chaque fiber ou directement TOUS le root / currentRoot ?
 * Si on stock le alternate par fiber on devrait avoir notre arborescence de cache dans l'arborescence root donc c'est bon (?)
 * 
 * Même si on stocke le alternate, comment on indique quel partie rerender ?
 * Il faut repasser sur tout le root du début à la fin et comparer chaque élément avec leur alternate ?
 * 
 * 
 * 1. currentRoot devient renderedRoot, moins confus car il s'agit du root déjà en place currentRoot est celui sur lesquel on travail
 * 2. Créer des phases de commit (au moins pour le root pour gérer le renderedRoot etc) // cf: https://www.youtube.com/watch?v=0ympFIwQFJw
 * 3. La partie utilisée dans le render sera notre currentRoot (celle en cours)
 *    a. On créer le currentRoot
 *    b. On set nextTask = currentRoot. 
 *      Le but ici est de conserver le currentRoot pdt toute la durée de notre workQueue.
 *      Lorsque l'on aura fini on la remettra a null, puis on la set de nouveau lorsque l'on rerender etc
 *      nextTask = currentRoot permet de garder le fonctionnement actuel (parent->enfant->sibling etc)
 * 
 * 2.a Ici dans la partie commit notre workQueue est completé (pour cette partie) donc
 *    on pourra reset le currentRoot
 *    On va aussi set le renderedRoot
 * 
 * 4. récupérer le useState fait dans l'une des branch de restart (sans toucher au contenu, juste pour voir et écrire la logique à suivre pour après)
 */