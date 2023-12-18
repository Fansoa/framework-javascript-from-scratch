import MiniReact from "../../../core/MiniReact.js";

export default class InteractiveMapLocation extends MiniReact.Component {
  delayedInitMap() {
    const initMap = () => {
      const mapCenter = new google.maps.LatLng(48.856858, 2.351415);
      const mapContainer = document.getElementById("map");

      const mapOptions = {
        zoom: 10,
        center: mapCenter,
        mapTypeIds: [google.maps.MapTypeId.RoadMap],
        streetViewControl: true,
      };

      const map = new google.maps.Map(mapContainer, mapOptions);

      const infoWindow = new google.maps.InfoWindow();
      // Récupère les sites olympiques liés au sport séléctioné
      const olympicSites = this.props.eventLocations.filter(
        (eventLocation) =>
          eventLocation[4].includes(this.props.selectedSport) ||
          this.props.selectedSport.includes(eventLocation[4]),
      );

      const displayedPlaces = [];
      olympicSites.forEach(([position, title, slug]) => {
        const image = {
          url: "../../../assets/images/icons/mark_sport.svg",
          scaledSize: new google.maps.Size(30, 30), // Adjust as needed
        };

        const generateMark = () => {
          if (displayedPlaces.includes(title)) {
            return;
          }

          const marker = new google.maps.Marker({
            position,
            map,
            icon: image,
            title,
            optimized: false,
          });

          marker.addListener("click", () => {
            // Fix a bug rendering an empty infoWindow
            if (infoWindow) {
              infoWindow.close();
            }

            const content = `
              <section>
                <h1><b>${marker.getTitle()}</b></h1>
                <button class="underline text-indigo-400 hover:text-indigo-600 pt-3">Informations du lieu</button>
              </section>
            `;

            // fragment allow us to bind an event to the element
            const fragment = document
              .createRange()
              .createContextualFragment(content);

            const route = `/lieu?place=${slug}`;

            fragment.querySelector("button").addEventListener("click", () => {
              history.pushState(null, null, route);
            });

            infoWindow.setContent(fragment);
            infoWindow.open(map, marker);
          });

          displayedPlaces.push(title);
        };

        generateMark();
      });
    };

    window.requestIdleCallback(initMap);
  }

  renderComponent() {
    this.delayedInitMap();

    this.data.content =
      `<div id="map" style='{"width": "100%", "height": "100%"}'></div>`.interpolate(
        this,
      );

    return this.data;
  }
}
