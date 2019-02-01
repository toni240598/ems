import { GeoLocation } from '../geo-location/geo-location';

export class Province extends GeoLocation {

  constructor(input?: Province) {
    super();
    Object.assign(this, input);
  }

  id: Number;
  label: String;

  toArray(): Array<String | Number> {
    return [this.id, this.label, this.getLat(), this.getLng(), this.zoom];
  }

}
