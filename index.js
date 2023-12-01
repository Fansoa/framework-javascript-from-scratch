// import MiniReactDom from "./core/MiniReactDom.js";
// import routes from "./routes.js";

// MiniReactDom.render(document.getElementById("root"), routes);


import { MiniReactInstance } from "./restart/core/MiniReact.js";

const buttonComponent = MiniReactInstance.createElement(
  'button',
  {
    'className': 'w-full bg-green-500',
    'event.click': function (event) {
      event.stopPropagation()
      alert('button component click')
    },
  },
  [
    'Button component'
  ]
);

const element = MiniReactInstance.createElement(
  'div',
  {
    'id': 'myDiv',
    'className': 'w-[150px] h-[150px] bg-red-500',
    'event.click': function () {
      alert('Coucou')
    },
  },
  [
    'Hello',
    MiniReactInstance.createElement(
      'button',
      {
        'id': 'myButton',
        'className': 'w-full bg-blue-500',
        'event.click': function (event) {
          event.stopPropagation()
          alert('button click')
        },
      },
      [
        'Button'
      ]
    ),
    buttonComponent
  ]
);
const root = document.getElementById("root");
MiniReactInstance.render(element, root);