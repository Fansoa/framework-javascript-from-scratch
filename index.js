import { MiniReact } from "./restart_new/core/MiniReact.js";

function RandomComponent() {
  const [state, setState] = MiniReact.useState("Hello");

  return MiniReact.createElement(
    'div',
    {
      'className': 'bg-orange-500',
      'event.click': () => setState(state => state+'S'),
    },
    ['IM BLUE DADOUDI DADOUDA DADOU DI DADOU DAAAAA']
  );
}

function TestPage() {
  const [state, setState] = MiniReact.useState(0);

  return MiniReact.createElement(
    'div',
    {
      'id': 'myDiv',
      'className': 'w-[150px] h-[150px] bg-red-500',
    },
    [
      // MiniReact.createElement(
      //   'div',
      //   {
      //     'className': 'bg-blue-500',
      //     'event.click': () => alert('Test'),
      //   },
      //   [
      //     MiniReact.createElement(
      //       'button',
      //       {
      //         'className': 'bg-green-500',
      //         'event.click': (event) => {
      //           event.stopPropagation();
      //           alert('First button')
      //         },
      //       },
      //       ['First button']
      //     )
      //   ]
      // ),
      // 'Hello',
      // MiniReact.createElement(
      //   'div',
      //   {
      //     'className': 'bg-pink-500',
      //   },
      //   [
      //     MiniReact.createElement(
      //       'button',
      //       {
      //         'className': 'bg-yellow-500',
      //         'event.click': (event) => {
      //           event.stopPropagation();
      //           alert('MY BUTTON')
      //         },
      //       },
      //       ['MY BUTTON']
      //     ),
      //     MiniReact.createElement(
      //       'span',
      //       {
      //         'className': 'bg-orange-500',
      //       },
      //       [
      //         MiniReact.createElement(
      //           'div',
      //           {
      //             'className': 'bg-green-300',
      //             'event.click': () => setState(state => state+1)
      //           },
      //           [`test set State = ${state}`]
      //         ),
      //         MiniReact.createElement(RandomComponent, {})
      //       ]
      //     )
      //   ]
      // )

      MiniReact.createElement(
        'div',
        {
          'className': 'bg-green-300',
          'event.click': () => setState(state => state+1),
        },
        [`test set State = ${state}`]
      ),
      MiniReact.createElement(RandomComponent, {})
    ]
  )
}

const root = document.getElementById("root");

MiniReact.render(TestPage, root)