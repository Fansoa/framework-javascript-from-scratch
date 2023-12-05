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
            ['First button']
          )
        ]
      ),
      'Hello',
      MiniReact.createElement(
        'div',
        {
          'className': 'bg-pink-500',
        },
        [
          MiniReact.createElement(
            'button',
            {
              'className': 'bg-yellow-500',
              'event.click': (event) => {
                event.stopPropagation();
                alert('MY BUTTON')
              },
            },
            ['MY BUTTON']
          ),
          MiniReact.createElement(
            'span',
            {
              'className': 'bg-orange-500',
            },
            [
              MiniReact.createElement(
                'div',
                {
                  'className': 'bg-green-300',
                },
                ['test']
              ),
              MiniReact.createElement(
                'div',
                {
                  'className': 'bg-orange-500',
                },
                ['IM BLUE DADOUDI DADOUDA DADOU DI DADOU DAAAAA']
              )
            ]
          )
        ]
      )
    ]
  )
}

const root = document.getElementById("root");

const element = Test();
MiniReact.render(element, root)