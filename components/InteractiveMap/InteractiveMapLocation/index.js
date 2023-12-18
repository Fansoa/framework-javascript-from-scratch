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
      const olympicSites = this.props.eventLocations.filter((eventLocation) =>
        eventLocation[3].includes(this.props.selectedSport),
      );

      olympicSites.forEach(([position, title], index) => {
        const image = {
          url: "../../../assets/images/icons/mark_sport.svg",
          scaledSize: new google.maps.Size(30, 30), // Adjust as needed
        };

        const marker = new google.maps.Marker({
          position,
          map,
          icon: image,
          title: `${index + 1}. ${title}`,
          optimized: false,
        });

        marker.addListener("click", () => {
          const content = `
            <section>
              <h1>${marker.getTitle()}</h1>
              <button class="underline text-indigo-400 hover:text-indigo-600 pt-3">Informations du lieu</button>
            </section>
          `;

          const fragment = document
            .createRange()
            .createContextualFragment(content);

          fragment.querySelector("button").addEventListener("click", () => {
            history.pushState(null, null, "/testpage");
          });

          infoWindow.setContent(fragment);
          infoWindow.open(map, marker);
        });
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
