import MiniReact from "../../core/MiniReact.js";
import InteractiveMapList from "./InteractiveMapList/index.js";
import InteractiveMapLocation from "./InteractiveMapLocation/index.js";

export default class InteractiveMap extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { sport: "Athlétisme", searchSport: "" };
    this.sports = null;
    this.eventLocations = null;
  }

  fetchSports() {
    const sportPromise = fetch("../../assets/data/sports.json").then(
      (response) => {
        return response.json();
      },
    );

    const locationsPromise = fetch("../../assets/data/locations.json").then(
      (response) => {
        return response.json();
      },
    );

    Promise.all([sportPromise, locationsPromise])
      .then((results) => {
        const [sports, eventLocations] = results;

        this.setState({
          sports,
          filteredSports: this.state.filteredSports ?? sports,
          sport: sports[0].name,
          eventLocations,
          searchSport: this.state.searchSport ?? "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderComponent() {
    const selectSport = (selectedSport) => {
      this.setState((prev) => ({
        ...prev,
        sport: selectedSport,
      }));
    };
    const selectSportString = `selectSport_{{key}}`.interpolate(this);
    this.data.functions[selectSportString] = selectSport;

    // Prevent infinite loop
    if (!this.state.sports) {
      this.fetchSports();
    }

    const filteredSports = this.state.filteredSports ?? [];
    const sports = this.state.sports ?? [];
    const eventLocations = this.state.eventLocations
      ? this.state.eventLocations.filter(
          (eventLocation) =>
            eventLocation[4].includes(this.state.sport) ||
            this.state.sport.includes(eventLocation[4]),
        )
      : [];

    const interactiveMapList = new InteractiveMapList({
      sports: filteredSports,
      selectSportString,
      selectedSport: this.state.sport,
    }).renderComponent();
    const interactiveMapLocation = new InteractiveMapLocation({
      locations: eventLocations,
    }).renderComponent();

    this.components = this.getComponentsData({
      interactiveMapList,
      interactiveMapLocation,
    });

    const searchSport = (search) => {
      const searchValue = search.target.parentNode.parentNode.firstElementChild.value ?? "";

      const listSport = sports.filter((sport) => {
        return sport.name.toLowerCase().includes(searchValue.toLowerCase());
      });

      this.setState({
        sports: this.state.sports, // Prevent fetchSports() to be called
        eventLocations: this.state.eventLocations, // Prevent fetchSports() to be called
        sport: this.state.sport, // Prevent fetchSports() to be called

        searchSport: searchValue,
        filteredSports: listSport,
      });
    };

    this.data.functions[`handleClick_{{key}}`.interpolate(this)] = searchSport;

    this.data.content =
      `<section data-component-key="{{ key }}" class="bg-slate-100 grid sm:grid-cols-3 grid-cols-1 sm:h-[600px] py-2">
        <div class="p-3 overflow-y-scroll sm:max-h-[inherit] max-h-[200px] col-span-1 sm:my-0 my-4">
          <div class="flex items-center justify-center w-full">
            <div class="bg-white flex rounded w-full">
              <input class="bg-transparent border-none focus:outline-none outline-none px-4 py-1 text-gray-400 w-full" value="{{ state.searchSport }}" name="search" placeholder="Rechercher un sport">
              <button class="bg-blue-600 m-2 px-4 py-2 rounded text-white" onclick="handleClick_{{key}}()">
                <img src="../../../assets/images/icons/search.svg">
              </button>
            </div>
          </div>
          
          {{components.content.interactiveMapList}}
        </div>
        <div class="sm:col-span-2 col-span-1">
          {{components.content.interactiveMapLocation}}
        </div>
    </section>`.interpolate(this);

    return this.data;
  }
}
