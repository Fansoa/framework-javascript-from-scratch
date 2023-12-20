import Footer from "../../components/Footer/index.js";
import InteractiveMapLocation from "../../components/InteractiveMap/InteractiveMapLocation/index.js";
import Navbar from "../../components/Navbar/index.js";
import PageTopper from "../../components/PageTopper/index.js";
import SectionTitle from "../../components/SectionTitle/index.js";
import MiniReact from "../../core/MiniReact.js";

export default class SpotDetailPage extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { slug: null, spot: null, spotMapUrl: null };
  }

  fetchSpotData() {
    const params = new URLSearchParams(document.location.search);

    fetch("../../assets/data/spots.json")
      .then((response) => response.json())
      .then((spots) => {
        const locationSlug = params.get("place");
        const pageSpot = spots.find((spot) => spot.slug === locationSlug);

        this.setState((prev) => ({
          ...prev,
          slug: locationSlug,
          spot: pageSpot,
        }));
      });
  }

  // Will be used in order to rerender the page when the states / datas are loaded
  renderPageWithData() {
    const interactiveMapLocation = new InteractiveMapLocation({
      locations: this.state.spot,
    }).renderComponent();

    const navbar = new Navbar().renderComponent();
    const pageTopper = new PageTopper({
      title: this.state.spot.title,
      src: this.state.spot.src,
      alt: this.state.spot.alt,
    }).renderComponent();
    const mapSectionTitle = new SectionTitle({
      title: "Carte",
    }).renderComponent();
    const descriptionSectionTitle = new SectionTitle({
      title: "Description du spot",
    }).renderComponent();
    const pageFooter = new Footer().renderComponent();

    this.components = this.getComponentsData({
      interactiveMapLocation,
      navbar,
      pageTopper,
      mapSectionTitle,
      descriptionSectionTitle,
      pageFooter,
    });

    this.data.content = this.parseHTML(
      `<main data-component-key="{{ key }}">
        {{components.content.navbar}}
        {{components.content.pageTopper}}
        <div class="py-8 pl-10">
          {{components.content.mapSectionTitle}}
        </div>
        <div class="h-[300px] w-[100vw] px-10">
          {{components.content.interactiveMapLocation}}
        </div>
        <div class="pb-3 pt-8 pl-10">
          {{components.content.descriptionSectionTitle}}
        </div>
        <p class="pl-10 pt-2">{{ state.spot.description }}</p>
        <div class="mt-10">
          {{components.content.pageFooter}}
        </div>
      </main>`.interpolate(this),
    );

    this.data.functions = this.components.functions;
    this.parseEvents(this.data.content, this.data.functions);

    return this.createElement(...this.data.content);
  }

  render() {
    if (!this.state.spot) {
      this.fetchSpotData();
    } else {
      const locationSlug = new URLSearchParams(document.location.search).get(
        "place",
      );

      if (locationSlug !== this.state.slug) {
        this.fetchSpotData();
      }
      return this.renderPageWithData();
    }

    this.data.content = this.parseHTML(
      `<main data-component-key="{{ key }}" class="bg-slate-100">
      </main>`.interpolate(this),
    );

    return this.createElement(...this.data.content);
  }
}
