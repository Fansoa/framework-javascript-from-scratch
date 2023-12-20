import MiniReact from "../../core/MiniReact.js";
import InteractiveMap from "../../components/InteractiveMap/index.js";
import PageTopper from "../../components/PageTopper/index.js";
import SectionTitle from "../../components/SectionTitle/index.js";
import Footer from "../../components/Footer/index.js";
import Navbar from "../../components/Navbar/index.js";

export default class Homepage extends MiniReact.Component {
  render() {
    const navbar = new Navbar().renderComponent();
    const pageTopper = new PageTopper({
      title: "Les sites de competitions",
      src: "../../assets/images/locations/les-sites-de-competitions.png",
      alt: "Les sites de competitions",
    }).renderComponent();
    const interactiveMapTitle = new SectionTitle({
      title: "Carte interactive",
    }).renderComponent();
    const interactiveMap = new InteractiveMap().renderComponent();
    const pageFooter = new Footer().renderComponent();

    this.components = this.getComponentsData({
      navbar,
      interactiveMap,
      pageTopper,
      interactiveMapTitle,
      pageFooter,
    });

    this.data.content = this.parseHTML(
      `<main>
      {{ components.content.navbar }}
      {{ components.content.pageTopper }}
      <div class="py-3 pl-10">
        {{ components.content.interactiveMapTitle }}
      </div>
      {{ components.content.interactiveMap }}
      <div class="mt-10">
        {{ components.content.pageFooter }}
      </div>
    </main>`.interpolate(this),
    );

    this.data.functions = this.components.functions;
    this.parseEvents(this.data.content, this.data.functions);

    return this.createElement(...this.data.content);
  }
}
