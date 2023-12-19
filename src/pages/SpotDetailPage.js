import InteractiveMapLocation from "../../components/InteractiveMap/InteractiveMapLocation/index.js";
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

  render() {
    if (!this.state.spot) {
      this.fetchSpotData();
    }

    const interactiveMapLocation = new InteractiveMapLocation({
      locations: this.state.spot,
    }).renderComponent();

    const components = this.getComponentsData({
      interactiveMapLocation,
    });

    this.data.content = this.parseHTML(
      `<main data-component-key="{{ key }}" class="bg-slate-100 grid grid-cols-3 min-h-[600px]">
        <div class="h-[300px] w-[100vw]">
          ${components.content.interactiveMapLocation}
        </div>
        zkmleezmkljeaz
      </main>`.interpolate(this),
    );

    return this.createElement(...this.data.content);
  }
}
