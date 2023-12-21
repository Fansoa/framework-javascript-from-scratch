import CacheDataService from "./cacheDataService.js";

class GoogleMapService {
  constructor(
    mapId,
    centerLat = 48.856858,
    centerLng = 2.351415,
    mapZoom = 10,
  ) {
    this.defaultMapCenter = {
      lat: centerLat,
      lng: centerLng,
    };
    this.mapMarkers = {
      place: "../../../assets/images/icons/mark_sport.svg",
      spot: "../../../assets/images/icons/mark_spot.svg",
      user: "../../../assets/images/icons/mark_user.svg",
    };
    this.defaultMarkerSize = 30;
    this.mapZoom = mapZoom;
    this.mapContainer = document.getElementById(mapId);
    this.map = new google.maps.Map(this.mapContainer, this.getMapOptions());
    this.infoWindow = new google.maps.InfoWindow();
    this.cacheDataService = CacheDataService.getInstance();

    this.handleCurrentLocation();
  }

  handleCurrentLocation() {
    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      locationButton,
    );

    if (navigator.geolocation) {
      const { userPosition, userPositionChoice } = this.cacheDataService;
      if (!userPosition && userPositionChoice !== false) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.cacheDataService.userPosition = pos;
          this.cacheDataService.userPositionChoice = true;
          this.generateMarker({
            position: pos,
            icon: "user",
          });
        });
      } else {
        this.cacheDataService.userPositionChoice = false;
      }

      this.generateMarker({
        position: userPosition,
        icon: "user",
      });
    }
  }

  generateGoogleMapsDirections(origin, destination) {
    const originString = origin ? `${origin.lat},${origin.lng}` : "";
    const destinationString = `${destination.lat},${destination.lng}`;

    return `https://www.google.com/maps/dir/?api=1&origin=${originString}&destination=${destinationString}`;
  }

  setMapContainer() {
    this.mapContainer = map;
  }

  getMapOptions(
    lat = this.defaultMapCenter.lat,
    lng = this.defaultMapCenter.lng,
  ) {
    const mapCenter = new google.maps.LatLng(lat, lng);
    return {
      zoom: this.mapZoom,
      center: mapCenter,
      mapTypeIds: [google.maps.MapTypeId.RoadMap],
      streetViewControl: true,
    };
  }

  generateMarkerIcon(
    markerType = this.mapMarkers.place,
    size = this.defaultMarkerSize,
  ) {
    const url = this.mapMarkers[markerType] ?? this.mapMarkers.place;
    return {
      url,
      scaledSize: new google.maps.Size(size, size),
    };
  }

  generateMarker(params) {
    params.icon = this.generateMarkerIcon(params.icon);

    return new google.maps.Marker({
      ...params,
      map: this.map,
      optimized: false,
    });
  }

  removeMarkers(markers) {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
  }
}

export default GoogleMapService;
