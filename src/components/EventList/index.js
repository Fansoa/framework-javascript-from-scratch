import MiniReact from "../../../core/MiniReact.js";

import SectionTitle from "../SectionTitle/index.js";
import EventCard from "../EventCard/index.js";

class EventList extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.events = props.events;
    this.typeCheck(props, this.propTypes);
  }

  propTypes = {
    title: {
      type: "string",
    },
    events: {
      type: "array",
    },
  };

  renderComponent() {
    const sectionTitle = new SectionTitle({
      title: this.props.title,
    }).renderComponent();

    const eventList = this.props.events.map((event) =>
      new EventCard({
        title: event.title,
        date: event.date,
        description: event.description,
        src: event.src,
        alt: event.alt,
      }).renderComponent(),
    );

    this.components = this.getComponentsData({
      sectionTitle,
      eventList,
    });

    this.data.content = `
      <div class="sm:px-[3.125rem]">
        <div class="px-2.5 sm:px-0 py-4">
          <h1 class="text-2xl md:text-4xl uppercase text-zinc-800 font-bold">{{ props.title }}</h1>
        </div>
        <div class="flex flex-col gap-10">
          {{components.content.eventList}}
        </div>
      </div>
    `.interpolate(this);

    return this.data;
  }
}

export default EventList;
