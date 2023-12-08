import { MiniReact } from "./restart_new/core/MiniReact.js";
import events from "./assets/data/events.js";

function EventListItem({event}) {
  // const [state, setState] = MiniReact.useState(0);

  return MiniReact.createElement(
    'div',
    {
      'className': 'bg-pink-200',
      // 'event.click': () => setState(state => state+1),
    },
    [
      MiniReact.createElement(
        'img',
        {
          'src': event.img,
          'className': 'w-[100px]'
        },
        []
      ),
      `SPORT : ${event.sport}`,
      `PLACE : ${event.place}`,
      `DATE : ${event.date}`,
    ]
  );
}

function EventList(params) {
  const list = [];
  params.events.forEach(event => {
    list.push(
      MiniReact.createElement(EventListItem, {event})
    );
  });

  return list;
}

function TestPage() {
  // const [state, setState] = MiniReact.useState(0);

  return MiniReact.createElement(
    'div',
    {
      'id': 'myDiv',
      'className': 'bg-red-500',
    },
    // [
      // MiniReact.createElement(
      //   'div',
      //   {
      //     'className': 'bg-green-300',
      //     'event.click': () => setState(state => state+1),
      //   },
      //   [
      //     `State TP = ${state}`,
      //     MiniReact.createElement(RandomComponent, {}),
      //     'State TP static string',
      //   ]
      // ),
      // "helloooo",
      // "heya"
    // ]
    MiniReact.createElement(EventList, {events})
  )
}

const root = document.getElementById("root");

MiniReact.render(TestPage, root)