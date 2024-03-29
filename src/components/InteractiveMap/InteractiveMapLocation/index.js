import MiniReact from "../../../../core/MiniReact.js";
import CacheDataService from "../../../services/cacheDataService.js";
import GoogleMapService from "../../../services/googleMapService.js";

export default class InteractiveMapLocation extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.displayedSpots = [];
    this.googleMapService = null;
    this.cacheDataService = CacheDataService.getInstance();
  }

  createPlaceChildMarker(marker, slug, markerPosition) {
    const locationPathUrl = this.googleMapService.generateGoogleMapsDirections(
      this.cacheDataService.userPosition,
      markerPosition,
    );
    const content = `
      <section class="p-5">
        <h1><b>${marker.getTitle()}</b></h1>
        <a href="${locationPathUrl}" target="_blank" class="text-indigo-500 flex items-center">
          Voir l'itinéraire
          <img src="../../../assets/images/icons/map.svg" class="ml-2">
        </a>
        <button class="underline text-indigo-400 hover:text-indigo-600 pt-3">Informations du lieu</button>
      </section>
    `;

    // fragment allows us to bind an event to the element
    const fragment = document.createRange().createContextualFragment(content);

    const route = `/lieu?place=${slug}`;

    fragment.querySelector("button").addEventListener("click", () => {
      history.pushState(null, null, route);
    });

    return fragment;
  }

  createInteractiveSpots() {
    const displayedPlaces = [];

    this.props.locations.forEach(
      ([position, title, slug, placeType, sports, spotLocations]) => {
        const generateMark = () => {
          if (displayedPlaces.includes(title)) {
            return;
          }

          const marker = this.googleMapService.generateMarker({
            position,
            title,
          });

          marker.addListener("click", () => {
            this.googleMapService.removeMarkers(this.displayedSpots);

            // Otherwise the infoWindow stay open, prevent a bug rendering an empty infoWindow
            if (this.googleMapService.infoWindow) {
              this.googleMapService.infoWindow.close();
            }
            const fragment = this.createPlaceChildMarker(
              marker,
              slug,
              position,
            );

            this.googleMapService.infoWindow.setContent(fragment);
            this.googleMapService.infoWindow.open(this.map, marker);

            this.generateSpotsMark(spotLocations);
          });

          displayedPlaces.push(title);
        };

        generateMark();
      },
    );
  }

  createStaticSpot() {
    const marker = this.googleMapService.generateMarker({
      position: this.props.locations.location,
    });

    marker.addListener("click", () => {
      const locationPathUrl =
        this.googleMapService.generateGoogleMapsDirections(
          this.cacheDataService.userPosition,
          this.props.locations.location,
        );
      const content = `
        <section class="p-3">
          <a href="${locationPathUrl}" target="_blank" class="text-indigo-500 flex items-center">
            Voir l'itinéraire
            <img src="../../../assets/images/icons/map.svg" class="ml-2">
          </a>
        </section>
      `;

      this.googleMapService.infoWindow.setContent(content);
      this.googleMapService.infoWindow.open(this.map, marker);
    });
  }

  delayedInitMap() {
    const initMap = () => {
      if (Array.isArray(this.props.locations)) {
        this.googleMapService = new GoogleMapService("map");
        this.createInteractiveSpots();
      } else if (this.props?.locations?.location) {
        this.googleMapService = new GoogleMapService(
          "map",
          ...Object.values(this.props?.locations?.location),
          15,
        );
        this.createStaticSpot();
      }
    };

    // This allow to use initMap when all other important tasked are completed, including first rendering (mandatory since googleMap uses a displayed element as it's base)
    window.requestIdleCallback(initMap);
  }

  generateSpotsMark(spotLocations) {
    if (spotLocations) {
      spotLocations.forEach((spotLocation) => {
        const spotMarker = this.googleMapService.generateMarker({
          position: spotLocation,
          icon: "spot",
        });

        this.displayedSpots.push(spotMarker);
      });
    }
  }

  renderComponent() {
    this.delayedInitMap();

    this.data.content =
      `<div id="map" class="w-full sm:h-full h-[400px]"></div>`.interpolate(
        this,
      );

    return this.data;
  }
}
