import MiniReact from "../../core/MiniReact.js";
import InteractiveMap from "../../components/InteractiveMap/index.js";

export default class InteractiveMapPage extends MiniReact.Component {
  render() {
    const interactiveMap = new InteractiveMap().renderComponent();
    const components = this.getComponentsData({
      interactiveMap,
    });

    this.data.content = this.parseHTML(`<div>
      INTERACTIVE MAP PAGE
      ${components.content.interactiveMap}
    </div>`);

    this.data.functions = components.functions;
    this.parseEvents(this.data.content, this.data.functions);

    return this.createElement(...this.data.content);
  }
}
