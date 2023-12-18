import MiniReact from "../../core/MiniReact.js";

export default class LocationDetailPage extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { slug: null, spots: [] };
  }

  render() {
    if (!this.state.slug) {
      const params = new URLSearchParams(document.location.search);

      const spotsPromise = fetch("../../assets/data/spots.json").then(
        (response) => {
          return response.json();
        },
      );

      // Afterwards we will have another promise to fetch the events
      Promise.all([spotsPromise]).then((results) => {
        const [spots] = results;
        const locationSlug = params.get("place");
        const filteredSpots = spots.filter(
          (spot) => spot.parentLocationSlug === locationSlug,
        );
        console.log(locationSlug);
        console.log(filteredSpots);

        this.setState((prev) => ({
          ...prev,
          slug: locationSlug,
          spots,
        }));
      });
    }

    this.data.content = this.parseHTML(
      `<main data-component-key="{{ key }}" class="bg-slate-100 grid grid-cols-3 max-h-[600px]">
      {{ state.slug }}
      <span class="bg-red-500">Pouet</span>
    </main>`.interpolate(this),
    );

    return this.createElement(...this.data.content);
  }
}
