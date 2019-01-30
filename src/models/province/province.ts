import { GeoLocation } from '../geo-location/geo-location';

export class Province extends GeoLocation {

  constructor(input?: Province) {
    super();
    Object.assign(this, input);
  }

  id: Number;
  label: String;
}
