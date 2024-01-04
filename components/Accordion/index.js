import MiniReact from "../../core/MiniReact.js";
import AccordionListItem from "./AccordionListItem/index.js";

class Accordion extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.typeCheck(props, this.propsType)
  }

  propsType = {
    data: "array",
  };

  renderComponent() {
    const listItems = {};

    this.props.data.forEach((list, index) => {
      listItems[`accordion_${index}`] = new AccordionListItem({
        list,
      }).renderComponent();
    });

    const components = this.getComponentsData({
      ...listItems,
    });

    this.data.content = `<div class="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
      ${Object.keys(components.content)
      .map((componentName) => {
        return components.content[componentName];
      })
      .join("")}
    </div>`;

    return this.data;
  }
}

export default Accordion;
