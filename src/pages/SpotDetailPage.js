import MiniReact from "../../core/MiniReact.js";
import GoogleMapService from "../services/googleMapService.js";

export default class SpotDetailPage extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { slug: null, spot: {}, spotMapUrl: null };
    this.googleMapService = null;
  }

  fetchSpotData() {
    const params = new URLSearchParams(document.location.search);

    fetch("../../assets/data/spots.json")
      .then((response) => response.json())
      .then((spots) => {
        const locationSlug = params.get("place");
        const pageSpot = spots.find((spot) => spot.slug === locationSlug);

        this.googleMapService
          .getStaticImagePromise(...Object.values(pageSpot.location), 500, 500)
          .then((staticMapSrc) => {
            this.setState((prev) => ({
              ...prev,
              slug: locationSlug,
              spot: pageSpot,
              spotMapUrl: staticMapSrc,
            }));
          });
      });
  }

  render() {
    this.googleMapService = new GoogleMapService();

    if (!this.state.slug) {
      this.fetchSpotData();
    }

    this.data.content = this.parseHTML(
      `<main data-component-key="{{ key }}" class="bg-slate-100 grid grid-cols-3 max-h-[600px]">
      <img src="{{ state.spotMapUrl }}" alt="{{ state.spot.name }}">
    </main>`.interpolate(this),
    );

    return this.createElement(...this.data.content);
  }
}
