/* eslint-disable no-restricted-syntax */
import MiniReact from "../../../core/MiniReact.js";

import Breadcrumb from "../Breadcrumb/index.js";
import Image from "../Image/index.js";

class PageTopper extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.src = props.src;
    this.alt = props.alt;
    this.typeCheck(props, this.propTypes);
  }

  propTypes = {
    title: { type: "string" },
    src: { type: "string" },
    alt: { type: "string" },
  };

  renderComponent() {
    const breadcrumb = new Breadcrumb({
      title: this.props.title,
    }).renderComponent();
    const image = new Image({
      src: this.props.src,
      alt: this.props.alt,
    }).renderComponent();

    this.components = this.getComponentsData({
      breadcrumb,
      image,
    });

    this.data.content = `<section>
      <div class="py-2 pl-6 sm:pl-12">
        {{components.content.breadcrumb}}
      </div>
      <div class="h-[9.375rem] sm:h-[18.75rem]">
        {{components.content.image}}
      </div>
    </section>`.interpolate(this);

    return this.data;
  }
}

PageTopper.propTypes = {
  title: {
    type: "number",
    enum: [{ toto: "toto" }, "Les sites de competitions"],
  },
  src: { type: "number" },
  alt: { type: "number" },
};

export default PageTopper;
