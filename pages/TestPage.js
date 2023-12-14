import { parseHTML, parseEvents, getComponentsData } from "../core/HtmlParser.js";
import { generateRandomKey } from "../core/ElementStructureUtils.js";
import { MiniReact } from "../core/MiniReact.js";
import events from "../assets/data/events.js";

/**
 * Pour chaque COMPOSANT (pas page)
 *  créer l'objet element qui contiendra :
 *      content = le contenu / le ou les string
 *      functions = les fonctions du commposant
 *          Dans element.functions on vas insérer chacune des fonctions de notre composant.
 *            Pour cela in nous faudra une clé unique, générée soit avec generateRandomKey ou en utilisant l'index si on est dans une boucle
 *      Dans content, toute les fonctions présentes devront être des strings équivalentes au nom de fonction ajoutés dans element.functions.
 *          J'ai dans mon composant la fonction test
 *            Je génère l'id avec generateRandomKey que je stocke dans componentKey
 *              J'ajoute a element.functions test_componentKey = test
 *            Dans content, si je veux utiliser la fonction, je met en string test_componentKey
 * 
 *  Les fonctions doivent êtres stockées pour pouvoir les renvoyer au parent du parent etc
 *      Elle seront traitées à la fin par la page, via la fonction parseEvents
 *          1. la structure des objets sera créer via le string
 *          2. On récupère getComponentsData
 *              Prend en paramètre un objet, chaque valeur = l'instance d'un composant
 *              Renvoie un objet sous la forme suivante :
 *              {
 *                "content" : {
 *                    "nom_du_composant": string/html du composant,
 *                    ...
 *                }
 *                "functions": {
 *                  TOUTES les fonctions de tous les composants (enfants etc)
 *                }
 *              }
 *              functions sera ensuite utilisé pour parseEvents
 *              content contiendra le html de chaque composant avec sa clé en guise d'identifiant (clé = nom de la variable ou est stocké l'instance), permettant d'indiquer ou s'affiche tel ou tel composant
 *              
 * Pour les PAGES
      const randomWithoutFunction = new RandomWithoutFunction();

      // Ici on envoie tous nos composants, puis on récupère du coup les string + functions
      const components = getComponentsData({
        randomWithoutFunction
      });

      content = parseHTML avec le string de la page.
          ParseHTML du coup vas prendre TOUT le string, comprenant le contenu des enfants qui retourneront un string, pas un objet.
 *    parseEvents vas récupérer TOUTES les fonctions des composants (enfants d'enfants etc) via components.functions
 *              a. Il prend les clés qui sont les noms des fonctions + la clé identifiant le composant
 *              b. Avec ça il remplace le callback dans le html qui est un string avec la function matchant le string présent
 * 
 *  Puis à la fin on return :
 *    MiniReact.createElement(...content);
 * 
 * Car on doit renvoyer un objet / structure pour le renderer
 */


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