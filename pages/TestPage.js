import MiniReact from "../core/MiniReact.js";
import Testing from "../components/Testing.js";

class TestPage extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick() {
    alert('handleClick')
  }

  render() {
    const testingComponent = new Testing({test: 'EAULA'}).renderComponent();

    const components = this.getComponentsData({
      testingComponent
    });

    this.data.content = this.parseHTML(`<section>
      ${components.content.testingComponent}
    </section>`);

    this.data.functions = components.functions;
    this.parseEvents(this.data.content, this.data.functions);

    return this.createElementNew(...this.data.content);
  }
}

export default TestPage;
