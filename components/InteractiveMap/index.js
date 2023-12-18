import MiniReact from "../../core/MiniReact.js";
import InteractiveMapList from "./InteractiveMapList/index.js";
import InteractiveMapLocation from "./InteractiveMapLocation/index.js";

export default class InteractiveMap extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { sport: "baseball" };
    this.sports = null;
    this.eventLocations = null;
  }

  renderComponent() {
    const selectSport = (selectedSport) => {
      this.setState((prev) => ({
        ...prev,
        sport: selectedSport,
      }));
    };
    const selectSportString = `selectSport_${this.key}`;
    this.data.functions[selectSportString] = selectSport;

    const fetchSports = () => {
      const firstFetch = fetch("../../assets/data/sports.json").then(
        (response) => {
          return response.json();
        },
      );

      const secondFetch = fetch("../../assets/data/locations.json").then(
        (response) => {
          return response.json();
        },
      );

      Promise.all([firstFetch, secondFetch])
        .then((results) => {
          const [sports, eventLocations] = results;

          this.setState({
            sports,
            sport: sports[0].name,
            eventLocations,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    // Prevent infinite loop
    if (!this.state.sports) {
      fetchSports();
    }

    const sports = this.state.sports ?? [];
    const eventLocations = this.state.eventLocations ?? [];

    const interactiveMapList = new InteractiveMapList({
      sports,
      selectSportString,
      selectedSport: this.state.sport,
    }).renderComponent();
    const interactiveMapLocation = new InteractiveMapLocation({
      eventLocations,
      selectedSport: this.state.sport,
    }).renderComponent();

    const components = this.getComponentsData({
      interactiveMapList,
      interactiveMapLocation,
    });

    this.data.content =
      `<section data-component-key="{{ key }}" class="bg-slate-100 grid grid-cols-3 max-h-[600px]">
        <div class="p-3 overflow-y-scroll max-h-[inherit] col-span-1">
          ${components.content.interactiveMapList}
        </div>
        <div class="bg-cyan-500 col-span-2">
          ${components.content.interactiveMapLocation}
        </div>
    </section>`.interpolate(this);

    return this.data;
  }
}
