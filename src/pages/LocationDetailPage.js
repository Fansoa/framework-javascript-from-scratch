import EventList from "../../components/EventList/index.js";
import Footer from "../../components/Footer/index.js";
import Navbar from "../../components/Navbar/index.js";
import PageTopper from "../../components/PageTopper/index.js";
import SectionTitle from "../../components/SectionTitle/index.js";
import SpotList from "../../components/SpotList/index.js";
import MiniReact from "../../core/MiniReact.js";

export default class LocationDetailPage extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { slug: null, spots: [], place: null, events: [] };
  }

  fetchPlaceData() {
    const params = new URLSearchParams(document.location.search);

    const spotsPromise = fetch("../../assets/data/spots.json").then(
      (response) => response.json(),
    );

    const placePromise = fetch("../../assets/data/locations.json").then(
      (response) => response.json(),
    );

    const eventsPromise = fetch("../../assets/data/events.json").then(
      (response) => response.json(),
    );

    // Afterwards we will have another promise to fetch the events
    Promise.all([spotsPromise, placePromise, eventsPromise]).then((results) => {
      const [spots, places, events] = results;
      const locationSlug = params.get("place");
      const filteredSpots = spots.filter(
        (spot) => spot.parentLocationSlug === locationSlug,
      );

      const place = places.find((location) => location[2] === locationSlug);
      const filteredEvents = events.filter(
        (event) => event.parentSlug === locationSlug,
      );

      this.setState((prev) => ({
        ...prev,
        slug: locationSlug,
        spots: filteredSpots,
        place,
        events: filteredEvents,
      }));
    });
  }

  // Will be used in order to rerender the page when the states / datas are loaded
  renderPageWithData() {
    const navbar = new Navbar().renderComponent();
    const pageTopper = new PageTopper({
      title: this.state.place[1],
      src: this.state.place[6],
      alt: this.state.place[1],
    }).renderComponent();

    const spotsSectionTitle = new SectionTitle({
      title: "Liste des spots",
    }).renderComponent();

    const eventSectionTitle = new SectionTitle({
      title: "Liste des evenements",
    }).renderComponent();

    const spotList = new SpotList({
      title: "Liste des spots",
      spots: this.state.spots,
    }).renderComponent();

    const eventList = new EventList({
      title: "Liste des evenements",
      events: this.state.events,
    }).renderComponent();
    const pageFooter = new Footer().renderComponent();

    this.components = this.getComponentsData({
      navbar,
      pageTopper,
      spotsSectionTitle,
      eventSectionTitle,
      spotList,
      eventList,
      pageFooter,
    });

    this.data.content = this.parseHTML(
      `<main data-component-key="{{ key }}">
        {{components.content.navbar}}
        {{components.content.pageTopper}}
        {{components.content.spotList}}
        {{components.content.eventList}}
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
    if (!this.state.slug) {
      this.fetchPlaceData();
    } else {
      const locationSlug = new URLSearchParams(document.location.search).get(
        "place",
      );

      if (locationSlug !== this.state.slug) {
        this.fetchPlaceData();
      }
      return this.renderPageWithData();
    }

    this.data.content = this.parseHTML(
      `<main data-component-key="{{ key }}">
      </main>`.interpolate(this),
    );

    // this.data.functions = components.functions;
    this.parseEvents(this.data.content, this.data.functions);

    return this.createElement(...this.data.content);
  }
}
