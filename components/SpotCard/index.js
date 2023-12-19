import MiniReact from "../../core/MiniReact.js";

import Image from "../Image/index.js";

class SpotCard extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.src = props.src;
    this.alt = props.alt;
  }

  renderComponent() {
    const image = new Image({
      src: this.props.src,
      alt: this.props.alt,
    }).renderComponent();

    const components = this.getComponentsData({
      image,
    });

    this.data.content =
      `<section class="min-w-[18.75rem] h-[12.5rem] rounded-lg bg-white shadow-sm hover:shadow">
    <div class="h-[9.375rem]">
      ${components.content.image}
    </div>
    <h1 class="h-[3.125rem] ml-[1.25rem] flex items-center text-indigo-400">{{ props.title }}</h1>
  </section>`.interpolate(this);

    return this.data;
  }
}

export default SpotCard;
