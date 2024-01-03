import MiniReact from "../../core/MiniReact.js";

import Image from "../Image/index.js";

class SpotCard extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.src = props.src;
    this.alt = props.alt;
    this.slug = props.slug;
    this.typeCheck(props, this.propTypes);
  }

  propTypes = {
    title: {
      type: "string",
    },
    src: {
      type: "string",
    },
    alt: {
      type: "string",
    },
    slug: {
      type: "string",
    },
  };

  renderComponent() {
    const image = new Image({
      src: this.props.src,
      alt: this.props.alt,
    }).renderComponent();

    this.components = this.getComponentsData({
      image,
    });

    const handleClick = () => {
      const spotUrl = `lieu/spot?place={{props.slug}}`.interpolate(this);
      history.pushState(null, null, spotUrl);
    };
    this.data.functions[`handleClick_{{key}}`.interpolate(this)] = handleClick;

    this.data.content =
      `<section class="min-w-[18.75rem] h-[12.5rem] rounded-lg bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all spotCard cursor-pointer" onclick="handleClick_{{key}}">
    <div class="h-[9.375rem]">
      {{components.content.image}}
    </div>
    <h1 class="h-[3.125rem] ml-[1.25rem] flex items-center text-indigo-400">{{ props.title }}</h1>
  </section>`.interpolate(this);

    return this.data;
  }
}

export default SpotCard;
