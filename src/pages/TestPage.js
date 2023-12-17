import MiniReact from "../../core/MiniReact.js";
import BrowserLink from "../components/BrowserLink.js";
import events from "../../assets/data/events.js";

class RandomChild extends MiniReact.Component {
  renderComponent() {
    const RCTest = (name) => {
      alert(`RandomChild ${name}`);
    }
    this.data.functions[`RCTest_${this.key}`] = RCTest;
  
    this.data.content = `<div onclick="RCTest_${this.key}('${this.props.name}')">
      RandomChild ${this.props.name}
    </div>`;
  
    return this.data;
  }

  render() {
    const component = this.renderComponent();
    const parsedContent = this.parseHTML(component.content);
    this.parseEvents(parsedContent, this.data.functions);
    
    return this.createElement(...parsedContent);
  }
}

class RandomWithoutFunction extends MiniReact.Component {
  renderComponent() {
    const randomThing = new RandomChild({name: 'Poney'}).renderComponent();
    const components = this.getComponentsData({
      randomThing,
    });
  
    this.data.content = `<footer class="bg-cyan-100">
      fouteur
      <div class="bg-slate-500">
        <span class="bg-pink-200">Eau</span>
      </div>
      <span class="bg-slate-700 text-white">La</span>
      ${components.content.randomThing}
    </footer>`
  
    Object.assign(this.data.functions, components.functions);
  
    return this.data;
  }

  render() {
    const component = this.renderComponent();
    const parsedContent = this.parseHTML(component.content);
    this.parseEvents(parsedContent, this.data.functions);
    
    return this.createElement(...parsedContent);
  }
}

class RandomThing extends MiniReact.Component {
  renderComponent() {
    const hello = () => {
      alert('Hello');
    }
    const world = (name) => {
      alert(`World ${name}`)
    }
    this.data.functions[`hello_${this.key}`] = hello;
    this.data.functions[`world_${this.key}`] = world;
    
    this.data.content = `<div>
      <button onclick="hello_${this.key}" class="bg-green-500">
        HELLO
      </button>
      <button onclick="world_${this.key}('Mister')" class="bg-pink-500">
        WORLD
      </button>
    </div>`;
  
    return this.data;
  }

  render() {
    const component = this.renderComponent();
    const parsedContent = this.parseHTML(component.content);
    this.parseEvents(parsedContent, this.data.functions);
    
    return this.createElement(...parsedContent);
  }
}

class EventListItem extends MiniReact.Component 
{
  constructor({event, index}) {
    super({event, index});
    this.state = { counter: 0 };
  }

  renderComponent() {
    const incrementState = () => {
      this.setState((prev) => ({
        ...prev,
        counter: this.state.counter + 1,
      }))
    }
    this.data.functions[`incrementState_${this.props.index}`] = incrementState;
  
    /**
     * Tu renvoie juste le string
     * + la liste des fonctions.
     * Du coup tu fais le parseEvents à la fin dans ta page, et tu récupères toutes tes fonctions de tout tes enfants.
     *    Comme t'as renvoyé un string litterals qui est déjà remplis (il utilise bien les props et states quoi)
     *      Bah pif paf pouet t'est good to go
     */
    this.data.content = `<div data-component-key="${this.key}">
      <img src="${this.props.event.img}" class="w-[100px]" onclick="incrementState_${this.props.index}}">
      SPORT : ${this.props.event.sport}
      PLACE : ${this.props.event.place}
      DATE : ${this.props.event.date}
      STATE Counter : ${this.state.counter}
    </div>`;
  
    return this.data;
  }

  render() {
    const component = this.renderComponent();
    const parsedContent = this.parseHTML(component.content);
    this.parseEvents(parsedContent, this.data.functions);
    
    return this.createElement(...parsedContent);
  }
}

class EventList extends MiniReact.Component {
  renderComponent() {
    const list = [];
    this.props.events.forEach((event, index) => {
      const test = new EventListItem({event, index}).renderComponent();
      list.push(
        test
      );
    });
  
    return list;
  }

  render() {
    const component = this.renderComponent();
    const parsedContent = this.parseHTML(component.content);
    this.parseEvents(parsedContent, this.data.functions);
    
    return this.createElement(...parsedContent);
  }
}

class TestPage extends MiniReact.Component {
  render() {
    const eventList = new EventList({events}).renderComponent();
    // const secondEventList = EventList({events});
    const randomThing = new RandomThing().renderComponent();
    const randomWithoutFunction = new RandomWithoutFunction().renderComponent();
    const browserLink = new BrowserLink({to: '/testpagetwo', content: 'Test page two'}).renderComponent();
  
    const components = this.getComponentsData({
      eventList,
      // secondEventList
      randomThing,
      randomWithoutFunction,
      browserLink
    });
  
    this.data.content = this.parseHTML(`<section>
      <div class="bg-red-500">
        ${components.content.eventList}
      </div>
      <div class="bg-blue-500">
        ${components.content.randomThing}
      </div>
      ${components.content.randomWithoutFunction}
      <div>
        ${components.content.browserLink}
      </div>
    </section>`);
  
  
    this.data.functions = components.functions;
    this.parseEvents(this.data.content,this.data.functions);
  
    return this.createElement(...this.data.content);
  }
}

export default TestPage;