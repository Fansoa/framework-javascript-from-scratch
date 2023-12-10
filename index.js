import { MiniReact } from "./core/MiniReact.js";
import events from "./assets/data/events.js";
import { parseHTML, parseFunction, parseEvents } from "./core/HtmlParser.js";

function EventListItem({ event }) {
  return MiniReact.createElement(
    "div",
    {
      className: "bg-pink-200",
    },
    [
      MiniReact.createElement(
        "img",
        {
          src: event.img,
          className: "w-[100px]",
        },
        [],
      ),
      `SPORT : ${event.sport}`,
      `PLACE : ${event.place}`,
      `DATE : ${event.date}`,
    ],
  );
}

/**
 * @function EventListItemNEW
 * @description Creates an event list item component.
 * @param {object} event The event object to display.
 * @returns {React.Element} The React element for the event list item.
 */
function EventListItemNEW({ event }) {
  const [state, setState] = MiniReact.useState(0);
  function test(test) {
    setState((state) => state + 1);
  }

  const functions = {
    test,
  };

  const content = parseHTML(`<div className="bg-pink-200">
    <img src="${event.img}" className="w-[100px]" event.click="test('${event.sport}')}">
    SPORT : ${event.sport}
    PLACE : ${event.place}
    DATE : ${event.date}
    STATE : ${state}
  </div>`);
  parseEvents(content, functions);

  return MiniReact.createElement(...content);
}

function EventList(params) {
  const list = [];
  params.events.forEach((event) => {
    list.push(MiniReact.createElement(EventListItemNEW, { event }));
  });

  return list;
}

function TestPage() {
  return MiniReact.createElement(
    "div",
    {},

    MiniReact.createElement(EventList, { events }),
  );
}

const root = document.getElementById("root");

MiniReact.render(TestPage, root);
