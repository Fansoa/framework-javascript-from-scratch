import MiniReact from "../../core/MiniReact.js";

import SpotCard from "../SpotCard/index.js";
import SectionTitle from "../SectionTitle/index.js";

class SpotList extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.spots = props.spots;
  }

  renderComponent() {
    const sectionTitle = new SectionTitle({
      title: this.props.title,
    }).renderComponent();

    const cardList = this.props.spots.map((spot) =>
      new SpotCard({
        title: spot.title,
        src: spot.src,
        alt: spot.alt,
      }).renderComponent(),
    );

    const components = this.getComponentsData({
      sectionTitle,
      cardList,
    });

    this.data.content = `
      <section>
        <div class="my-4 ml-11">
          ${components.content.sectionTitle}
        </div>
        <div class="flex flex-col sm:flex-row gap-7 bg-slate-100 py-5 px-12 overflow-x-auto">
          ${components.content.cardList}
        </div>
      </section>
    `;

    return this.data;
  }
}

export default SpotList;
