import MiniReact from "../../core/MiniReact.js";
import InteractiveMapList from "./InteractiveMapList/index.js";

export default class InteractiveMap extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { sport: "baseball" };
    this.sports = null;
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
      fetch("../../assets/data/events.json")
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          this.setState((prev) => ({
            ...prev,
            sports: json,
            sport: json[0].name,
          }));
          return json;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (!this.state.sports) {
      fetchSports();
    }

    const sports = this.state.sports ?? [
      {
        name: "baseball",
        index: 0,
      },
      {
        name: "football",
        index: 1,
      },
    ];

    const interactiveMapList = new InteractiveMapList({
      sports,
      selectSportString,
      selectedSport: this.state.sport,
    }).renderComponent();

    const components = this.getComponentsData({
      interactiveMapList,
    });

    this.data.content =
      `<section data-component-key="{{ key }}" class="bg-slate-100 grid grid-cols-2 max-h-[600px]">
        <div class="p-3 overflow-y-scroll max-h-[inherit]">
          ${components.content.interactiveMapList}
        </div>
        <div class="bg-cyan-500">
          Selected sport : {{ state.sport }}
        </div>
    </section>`.interpolate(this);

    return this.data;
  }
}
