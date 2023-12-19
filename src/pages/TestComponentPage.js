import Image from "../../components/Image/index.js";
import Breadcrumb from "../../components/Breadcrumb/index.js";
import MiniReact from "../../core/MiniReact.js";

class TestComponentPage extends MiniReact.Component {
  render() {
    const breadcrumb = new Breadcrumb({
      title: "Quai de Seine",
    }).renderComponent();
    const image = new Image({
      src: "https://cdn.paris.fr/paris/2020/04/08/huge-40b319345ead743d298859b404c93733.jpg",
      alt: "Quai de Seine",
    }).renderComponent();

    const components = this.getComponentsData({
      breadcrumb,
      image,
    });

    this.data.content = this.parseHTML(`<section>
      <div class="bg-red-500">
      ${components.content.breadcrumb}
      ${components.content.image}
      </div>
    </section>`);

    this.data.functions = components.functions;
    this.parseEvents(this.data.content, this.data.functions);

    return this.createElement(...this.data.content);
  }
}

export default TestComponentPage;
