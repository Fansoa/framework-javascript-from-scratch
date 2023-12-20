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
    };
    this.defaultMarkerSize = 30;
    this.mapZoom = mapZoom;
    this.mapContainer = document.getElementById(mapId);
    this.map = new google.maps.Map(this.mapContainer, this.getMapOptions());
    this.infoWindow = new google.maps.InfoWindow();
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
