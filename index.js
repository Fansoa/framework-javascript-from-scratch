// import MiniReactDom from "./core/MiniReactDom.js";
// import routes from "./routes.js";

// MiniReactDom.render(document.getElementById("root"), routes);


import { MiniReactInstance } from "./restart/core/MiniReact.js";

const element = MiniReactInstance.createElement(
  'div',
  {
    'id': 'myDiv'
  },
  [
    MiniReactInstance.createTextElement('Hello')
  ]
);

console.log(element)
const root = document.getElementById("root");
MiniReactInstance.render(element, root);