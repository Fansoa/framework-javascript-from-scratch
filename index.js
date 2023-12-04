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
        [
          MiniReact.createElement(
            'button',
            {
              'className': 'bg-green-500',
              'event.click': (event) => {
                event.stopPropagation();
                alert('MY BUTTON')
              },
            },
            ['MY BUTTON']
          )
        ]
      ),
      'Hello'
    ]
  )
}

const root = document.getElementById("root");

const element = Test();
MiniReact.render(element, root)