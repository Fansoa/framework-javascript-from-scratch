// import MiniReactDom from "./core/MiniReactDom.js";
// import routes from "./routes.js";

// MiniReactDom.render(document.getElementById("root"), routes);


import { MiniReactInstance } from "./restart/core/MiniReact.js";

const element = MiniReactInstance.createElement(
  'div',
  {
    'id': 'myDiv',
    'className': 'w-[150px] h-[150px] bg-red-500',
    'event.click': function () {
      alert('Coucou')
    },
    'event.mouseout': function () {
      alert('mouseout')
    }
  },
  [
    MiniReactInstance.createTextElement('Hello')
  ]
);
const root = document.getElementById("root");
MiniReactInstance.render(element, root);