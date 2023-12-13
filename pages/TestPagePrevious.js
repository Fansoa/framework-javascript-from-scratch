import { parseHTML, parseEvents } from "../core/HtmlParser.js";
import { MiniReact } from "../core/MiniReact.js";
import events from "../assets/data/events.js";

function EventListItemNEW({event, index}) {
  const [state, setState] = MiniReact.useState(0);
  function test(test) {
    setState(state => state+1)
  }

  const functions = {};
  functions[`test_${index}`] = test;

  /**
   * Tu renvoie juste le string
   * + la liste des fonctions.
   * Du coup tu fais le parseEvents à la fin dans ta page, et tu récupères toutes tes fonctions de tout tes enfants.
   *    Comme t'as renvoyé un string litterals qui est déjà remplis (il utilise bien les props et states quoi)
   *      Bah pif paf pouet t'est good to go
   */
  const content = parseHTML(`<div className="bg-pink-200">
    <img src="${event.img}" className="w-[100px]" event.click="test_${index}('${event.sport}')}">
    SPORT : ${event.sport}
    PLACE : ${event.place}
    DATE : ${event.date}
    STATE : ${state}
  </div>`);
  // parseEvents(content,functions);
  console.log(content)

  return MiniReact.createElement(...content);
}

function EventList(params) {
  const list = [];
  params.events.forEach(event => {
    const test = EventListItemNEW({event});
    console.error(MiniReact.createElement(EventListItemNEW, {event}))
    list.push(
      test
      // MiniReact.createElement(EventListItem, {event})
    );
  });

  return list;
}

function TestPage() {
  const eventList = MiniReact.createElement(EventList, {events});
  const content = parseHTML(`<section>
    ${eventList}
  </section>`);

  return MiniReact.createElement(...content);
  /*
  return MiniReact.createElement('section',
    {},
    [...eventList]
  )
  */
}

export default TestPage;