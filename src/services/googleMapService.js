class GoogleMapService {
  constructor(mapId = null, centerLat = 48.856858, centerLng = 2.351415) {
    this.defaultMapCenter = {
      lat: centerLat,
      lng: centerLng,
    };
    this.mapMarkers = {
      place: "../../../assets/images/icons/mark_sport.svg",
      spot: "../../../assets/images/icons/mark_spot.svg",
    };
    this.defaultMarkerSize = 30;
    this.mapContainer = mapId && document.getElementById(mapId);
    this.map =
      mapId && new google.maps.Map(this.mapContainer, this.getMapOptions());
    this.infoWindow = new google.maps.InfoWindow();
    this.apiKey = "AIzaSyCz6KtXcjWODSfRePd8v-NDobL35z-4D28";
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
      zoom: 10,
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

  getStaticImagePromise(
    lat,
    lng,
    width,
    height,
    zoom = 10,
    mapType = "roadmap",
  ) {
    const url = `https://maps.googleapis.com/maps/api/staticmap?key=${this.apiKey}&center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=${mapType}&markers=color:818CF8%7C${lat},${lng}`;
    const request = new Request(url);

    return fetch(request).then((response) => response.url);
  }
}

export default GoogleMapService;
