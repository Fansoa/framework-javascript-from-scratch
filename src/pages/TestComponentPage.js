import MiniReact from "../../core/MiniReact.js";

import PageTopper from "../../components/PageTopper/index.js";
import SpotList from "../../components/SpotList/index.js";

class TestComponentPage extends MiniReact.Component {
  render() {
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

    const components = this.getComponentsData({
      pageTopper,
      spotList,
    });

    this.data.content = this.parseHTML(`<section>
      <div class="bg-red-500">
      ${components.content.pageTopper}
      ${components.content.spotList}
      </div>
    </section>`);

    this.data.functions = components.functions;
    this.parseEvents(this.data.content, this.data.functions);

    return this.createElement(...this.data.content);
  }
}

export default TestComponentPage;
