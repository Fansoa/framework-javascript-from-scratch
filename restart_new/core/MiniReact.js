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
    executeTask(nextTask);
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

    const nextFiber = child ? {
      parent: elementDom,
      type: 'create',
      content: child,
    } : null;
    task.child = nextFiber;

    nextTask = task.child ?? null;
  }
}

requestIdleCallback(workQueue);

export const MiniReact = {
  createElement,
  createDom,
  render
}