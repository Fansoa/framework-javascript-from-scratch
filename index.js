/* eslint-disable prefer-destructuring */
import MiniReact from "./core/MiniReact.js";
import MiniReactDOM from "./core/MiniReactDOM.js";
import example from "./src/components/example.js";

function createFiber() {}

// class VirtualDOM {
//   constructor(){
//     this.fiberThree
//   }
// }

const unitOfWork = null;

function workLoop(reqIdleCall) {
  while (newTask) {
    createFiberTree();
  }
}

function createFiberTree(fiber) {
  // creation de la fiber avec son child, sibling, nextFiber
  const elementDOM = MiniReact.createElement(fiber.virtualNode);

  elementDOM.appendChild(fiber);

  const child = fiber.virtualNode.children[0];
  const sibling = fiber.virtualNode.children[1];

  const nextFiber = {
    parentFiber: fiber,
    child,
    sibling,
  };

  fiber.nextFiber;

  const fiberQueue = {};

  if (fiber.children.length) {
    return fiber;
  }

  // eslint-disable-next-line prefer-destructuring
  fiber.nextFiber = fiber.children[0];

  fiber.children.forEach((child, i) => {
    if (i !== 0) {
      fiber.nextFiber = child;
    }

    if (this.child === 1) {
      fiber.nextFiber.sibling = child;
    }
    fiber.child = child;

    console.log(
      "🚀 ~ file: index.js:23 ~ createFiberTree ~ child, i:",
      child,
      i,
    );
  });
}

console.log(createFiberTree(example));

const root = document.getElementById("root");
MiniReactDOM.render(root, MiniReactDOM.renderStructure(example));
