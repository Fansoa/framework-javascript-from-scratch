import MiniReact from "../../core/MiniReact.js";

import PageTopper from "../../components/PageTopper/index.js";
import SpotList from "../../components/SpotList/index.js";
import Footer from "../../components/Footer/index.js";
import EventList from "../../components/EventList/index.js";
import Navbar from "../../components/Navbar/index.js";

class TestComponentPage extends MiniReact.Component {
  render() {
    const footer = new Footer({}).renderComponent();
    const pageTopper = new PageTopper({
      title: "Quai de Seine",
      src: "https://cdn.paris.fr/paris/2020/04/08/huge-40b319345ead743d298859b404c93733.jpg",
      alt: "Quai de Seine",
    }).renderComponent();

    const spotList = new SpotList({
      title: "Liste des spots",
      spots: [
        {
          title: "Quai de Seine",
          src: "https://cdn.paris.fr/paris/2020/04/08/huge-40b319345ead743d298859b404c93733.jpg",
          alt: "Quai de Seine",
        },
        {
          title: "Quai de Seine",
          src: "https://cdn.paris.fr/paris/2020/04/08/huge-40b319345ead743d298859b404c93733.jpg",
          alt: "Quai de Seine",
        },
        {
          title: "Quai de Seine",
          src: "https://cdn.paris.fr/paris/2020/04/08/huge-40b319345ead743d298859b404c93733.jpg",
          alt: "Quai de Seine",
        },
      ],
    }).renderComponent();

    const eventList = new EventList({
      title: "Liste des evenements",
      events: [
        {
          title: "Athletisme",
          date: "du 01-08-2024 au 11-08-2024",
          description:
            "Des remises de médailles sont prévues lors de toutes les sessions.",
          src: "https://cdn.paris.fr/paris/2020/04/08/huge-40b319345ead743d298859b404c93733.jpg",
          alt: "Quai de Seine",
        },
        {
          title: "Athletisme",
          date: "du 01-08-2024 au 11-08-2024",
          description:
            "Des remises de médailles sont prévues lors de toutes les sessions.",
          src: "https://cdn.paris.fr/paris/2020/04/08/huge-40b319345ead743d298859b404c93733.jpg",
          alt: "Quai de Seine",
        },
        {
          title: "Athletisme",
          date: "du 01-08-2024 au 11-08-2024",
          description:
            "Des remises de médailles sont prévues lors de toutes les sessions.",
          src: "https://cdn.paris.fr/paris/2020/04/08/huge-40b319345ead743d298859b404c93733.jpg",
          alt: "Quai de Seine",
        },
      ],
    }).renderComponent();

    const navbar = new Navbar().renderComponent();

    const components = this.getComponentsData({
      pageTopper,
      spotList,
      footer,
      eventList,
      navbar,
    });

    this.data.content = this.parseHTML(`<section>
      ${components.content.navbar}
      <div class="bg-red-500">
      ${components.content.pageTopper}
      ${components.content.spotList}
      ${components.content.eventList}
      </div>
      ${components.content.footer}
    </section>`);

    this.data.functions = components.functions;
    this.parseEvents(this.data.content, this.data.functions);

    return this.createElement(...this.data.content);
  }
}

export default TestComponentPage;
