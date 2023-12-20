import MiniReact from "../../core/MiniReact.js";
import InteractiveMap from "../../components/InteractiveMap/index.js";

export default class Homepage extends MiniReact.Component {
  render() {
    const interactiveMap = new InteractiveMap().renderComponent();
    const components = this.getComponentsData({
      interactiveMap,
    });

    this.data.content = this.parseHTML(`<main>
      INTERACTIVE MAP PAGE
      ${components.content.interactiveMap}
    </main>`);

    this.data.functions = components.functions;
    this.parseEvents(this.data.content, this.data.functions);

    return this.createElement(...this.data.content);
  }
}
