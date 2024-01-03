import MiniReact from "../../core/MiniReact.js";

import Image from "../Image/index.js";

class EventCard extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.date = props.date;
    this.description = props.description;
    this.src = props.src;
    this.alt = props.alt;
    this.typeCheck(props, this.propTypes);
  }

  propTypes = {
    title: {
      type: "string",
    },
    date: {
      type: "string",
    },
    description: {
      type: "string",
    },
    src: {
      type: "string",
    },
    alt: {
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

    this.data.content =
      `<section class="flex flex-col sm:flex-row shadow-md bg-slate-100">
    <div class="w-full sm:w-[21.875rem] h-[12.5rem]">
    {{components.content.image}}
    </div>
        <div class="px-7 py-3">
          <h1 class="text-2xl text-zinc-800">{{ props.title }}</h1>
          <p class="text-xs italic text-zinc-800">{{ props.date }}</p>
          <p class="text-base text-zinc-800 mt-3">{{ props.description }}</p>
        </div>
        </section>`.interpolate(this);

    return this.data;
  }
}

export default EventCard;
