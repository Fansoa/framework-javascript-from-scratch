import { MiniReact } from "./core/MiniReact.js";
import events from "./assets/data/events.js";
import { parseHTML, parseFunction, parseEvents } from "./core/HtmlParser.js";

// function testNoArgs () {alert('str');}
// function test (str) {alert(str);}

// const htmlString = `<footer className="justify-center">
//   <button event.click="${parseFunction(test, 'reazraz')}">Hello world</button>
// </footer>`;
// const result = parseHTML(htmlString);

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

function EventListItemNEW({event}) {
  const [state, setState] = MiniReact.useState(0);
  const pouet = 'pouet';
  /**
   * <img src="${event.img}" className="w-[100px]" event.click="${() => alert(pouet)}">
   *    Ne fonctionne pas
   * <img src="${event.img}" className="w-[100px]" event.click="${() => setState(state => state+1)}"></img>
   *    Ne fonctionne pas
   * 
   * C'est parce que dans le parse function la variable n'est pas présente.
   * Tous dois être présent dans la fonction ou ça ne marche pas.
   */
  function test(test) {
    const miaou = `${test} ooooolaaaa`;
    console.log(miaou);
    setState(state => state+1)
  }

  const functions = {
    'test': test,
  };

  const content = parseHTML(`<div className="bg-pink-200">
    <img src="${event.img}" className="w-[100px]" event.click="test('${event.sport}')}">
    SPORT : ${event.sport}
    PLACE : ${event.place}
    DATE : ${event.date}
    STATE : ${state}
  </div>`);
  parseEvents(content,functions);

  return MiniReact.createElement(...content);
}

function EventList(params) {
  const list = [];
  params.events.forEach(event => {
    list.push(
      MiniReact.createElement(EventListItemNEW, {event})
      // MiniReact.createElement(EventListItem, {event})
    );
  });

  return list;
}

function HelloWorld() {
  const [state, setState] = MiniReact.useState(0);

  function testage (str) {alert(str);}
  function testing() {
    const elem = document.getElementById('poney3');
    elem.classList.add('POUET');
    alert('pouet')
  }
  function updateState() {
    setState(state => state+1);
  }

  const functions = {
    'testage': testage,
    'testing': testing,
    'updateState': updateState,
  };

  const content = parseHTML(`
    <div className="bg-red-500">
      <section>
        <aside>
          <p event.click="testage('reazraz', 'poney')" className="bg-blue-500">Hello ALERT</p>
        </aside>
        <article>
          <ul>
            <li event.click="testing">Poney TESTING</li>
            <li>Poney 2</li>
            <li id="poney3">Poney 3</li>
            <li>Poney 4</li>
            <li event.click="updateState">Poney STATE ${state}</li>
            <li>Poney 6 <a href="#">Link</a></li>
          </ul>
        </article>
      </section>
    </div>
  `);
  parseEvents(content,functions);

  return MiniReact.createElement(...content);
}

function TestPage() {
  // const [state, setState] = MiniReact.useState(0);

  // return MiniReact.createElement(HelloWorld, {})
  // return MiniReact.createElement(...result);
  return MiniReact.createElement(
    'div',
    {},
    // ['']
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