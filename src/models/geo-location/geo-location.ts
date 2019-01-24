export class GeoLocation {

  location: {
    lat: number;
    lng: number;
  };
  zoom: number;

  getLat(): number {
    return this.location.lat;
  }

  setLat(lat: number) {
    this.location.lat = lat;
  }

  getLng(): number {
    return this.location.lng;
  }

  setLng(lng: number) {
    this.location.lng = lng;
  }

}
