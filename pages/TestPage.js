import { parseHTML, parseEvents, getComponentsData } from "../core/HtmlParser.js";
import { generateRandomKey } from "../core/ElementStructureUtils.js";
import { MiniReact } from "../core/MiniReact.js";
import events from "../assets/data/events.js";

function RandomWithoutFunction() {
  const element = {
    content: null,
    functions: {},
  }

  element.content = `<footer className="bg-cyan-100">
    fouteur
    <div className="bg-slate-500">
      <span className="bg-pink-200">Eau</span>
    </div>
    <span className="bg-slate-700 text-white">La</span>
  </footer>`

  return element;
}

function RandomThing() {
  const componentKey = generateRandomKey();
  function hello() {
    alert('Hello');
  }
  function world(name) {
    alert(`World ${name}`)
  }

  const element = {
    content: null,
    functions: {},
  }
  element.functions[`hello_${componentKey}`] = hello;
  element.functions[`world_${componentKey}`] = world;
  
  element.content = `<div>
    <button event.click="hello_${componentKey}" className="bg-green-500">
      HELLO
    </button>
    <button event.click="world_${componentKey}('Mister')" className="bg-pink-500">
      WORLD
    </button>
  </div>`;

  return element;
}

function EventListItem({event, index}) {
  const [state, setState] = MiniReact.useState(0);
  function test(test) {
    setState(state => state+1)
  }
  function pouet() {
    alert('pouet')
  }

  const element = {
    content: null,
    functions: {},
  }
  element.functions[`test_${index}`] = test;
  element.functions[`pouet_${index}`] = pouet;

  /**
   * Tu renvoie juste le string
   * + la liste des fonctions.
   * Du coup tu fais le parseEvents à la fin dans ta page, et tu récupères toutes tes fonctions de tout tes enfants.
   *    Comme t'as renvoyé un string litterals qui est déjà remplis (il utilise bien les props et states quoi)
   *      Bah pif paf pouet t'est good to go
   */
  element.content = `<div event.click="pouet_${index}">
    <img src="${event.img}" className="w-[100px]" event.click="test_${index}('${event.sport}')}">
    SPORT : ${event.sport}
    PLACE : ${event.place}
    DATE : ${event.date}
    STATE : ${state}
  </div>`;

  return element;
}

function EventList(params) {
  const list = [];
  params.events.forEach((event, index) => {
    const test = EventListItem({event, index});
    list.push(
      test
    );
  });

  return list;
}

/**
 * @todo générer une clé par composant.
 * Si on utlilse l'index et qu'on utilse 2 foit des noms de fonctions similaire marche pas car ça écrase.
 */
function TestPage() {
  const eventList = new EventList({events});
  // const secondEventList = new EventList({events});
  const randomThing = new RandomThing();
  const randomWithoutFunction = new RandomWithoutFunction();

  const components = getComponentsData({
    eventList,
    // secondEventList
    randomThing,
    randomWithoutFunction
  });

  const content = parseHTML(`<section>
    <div className="bg-red-500">
      ${components.content.eventList}
    </div>
    <div className="bg-blue-500">
      ${components.content.randomThing}
    </div>
    ${components.content.randomWithoutFunction}
  </section>`);


  const functionList = components.functions;
  parseEvents(content,functionList);

  return MiniReact.createElement(...content);
}

export default TestPage;