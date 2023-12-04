/*
import { MiniReactInstance } from "./restart/core/MiniReact.js";

function buttonComponent() {
  const [state, setState] = MiniReactInstance.useState(0);
  return MiniReactInstance.createElement(
    'button',
    {
      'className': 'w-full bg-green-500',
      'event.click': function (event) {
        event.stopPropagation()
        setState(state => state+1)
      },
    },
    [
      `Button component ${state}`
    ]
  );
}

function page() {
  const [state, setState] = MiniReactInstance.useState(9);
  return MiniReactInstance.createElement(
    'div',
    {
      'id': 'myDiv',
      'className': 'w-[150px] h-[150px] bg-red-500',
    },
    [
      `Hello ${state}`,
      MiniReactInstance.createElement(
        'button',
        {
          'id': 'myButton',
          'className': 'w-full bg-blue-500',
          'event.click': function (event) {
            setState(state => state+1)
            alert(`State equal = ${state}`)
          },
        },
        [
          'Button'
        ]
      ),
      buttonComponent()
    ]
  );
}
const root = document.getElementById("root");
MiniReactInstance.render(page(), root);
*/

import { MiniReact } from "./restart_new/core/MiniReact.js";

function Test() {
  return MiniReact.createElement(
    'div',
    {
      'id': 'myDiv',
      'className': 'w-[150px] h-[150px] bg-red-500',
    },
    [
      MiniReact.createElement(
        'div',
        {
          'className': 'bg-blue-500',
          'event.click': () => alert('Test'),
        },
        ['Sub text']
      )
    ]
  )
}

const root = document.getElementById("root");

const element = Test();
MiniReact.render(element, root)