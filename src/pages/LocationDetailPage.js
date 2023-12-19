import MiniReact from "../../core/MiniReact.js";

export default class LocationDetailPage extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { slug: null, spots: [], place: null };
  }

  fetchPlaceData() {
    const params = new URLSearchParams(document.location.search);

    const spotsPromise = fetch("../../assets/data/spots.json").then(
      (response) => response.json(),
    );

    const placePromise = fetch("../../assets/data/locations.json").then(
      (response) => response.json(),
    );

    // Afterwards we will have another promise to fetch the events
    Promise.all([spotsPromise, placePromise]).then((results) => {
      const [spots, places] = results;
      const locationSlug = params.get("place");
      const filteredSpots = spots.filter(
        (spot) => spot.parentLocationSlug === locationSlug,
      );

      const place = places.find((place) => place[2] === locationSlug);

      this.setState((prev) => ({
        ...prev,
        slug: locationSlug,
        spots: filteredSpots,
        place,
      }));
    });
  }

  render() {
    if (!this.state.slug) {
      this.fetchPlaceData();
    }

    this.data.content = this.parseHTML(
      `<main data-component-key="{{ key }}" class="bg-slate-100 grid grid-cols-3 max-h-[600px]">
        {{ state.slug }}
      <span class="bg-red-500">Hello</span>
      <div class="w-full h-[400px]">
        
      </div>
    </main>`.interpolate(this),
    );

    return this.createElement(...this.data.content);
  }
}
