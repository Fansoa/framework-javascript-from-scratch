import MiniReact from "../../core/MiniReact.js";

import Breadcrumb from "../Breadcrumb/index.js";
import Image from "../Image/index.js";

class PageTopper extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.src = props.src;
    this.alt = props.alt;
  }

  renderComponent() {
    const breadcrumb = new Breadcrumb({
      title: this.props.title,
    }).renderComponent();
    const image = new Image({
      src: this.props.src,
      alt: this.props.alt,
    }).renderComponent();

    const components = this.getComponentsData({
      breadcrumb,
      image,
    });

    this.data.content = `<section>
      <div class="my-2 ml-6 sm:ml-12">
        ${components.content.breadcrumb}
      </div>
      <div class="h-[9.375rem] sm:h-[18.75rem]">
        ${components.content.image}
      </div>
    </section>`;

    return this.data;
  }
}

export default PageTopper;
