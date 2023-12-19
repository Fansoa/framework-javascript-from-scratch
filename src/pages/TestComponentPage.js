import Image from "../../components/Image/index.js";
import MiniReact from "../../core/MiniReact.js";

class TestComponentPage extends MiniReact.Component {
  render() {
    const image = new Image({
      src: "https://cdn.paris.fr/paris/2020/04/08/huge-40b319345ead743d298859b404c93733.jpg",
      alt: "Quai de seine",
    }).renderComponent();

    const components = this.getComponentsData({
      image,
    });

    this.data.content = this.parseHTML(`<section>
      <div class="bg-red-500">
        ${components.content.image}
      </div>
    </section>`);

    this.data.functions = components.functions;
    this.parseEvents(this.data.content, this.data.functions);

    return this.createElement(...this.data.content);
  }
}

export default TestComponentPage;
