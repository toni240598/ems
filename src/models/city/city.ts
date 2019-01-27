import { GeoLocation } from '../geo-location/geo-location';
import { Province } from '../province/province';

export class City extends GeoLocation {
  constructor(input?: City) {
    super();
    Object.assign(this, input);
    if (input && input.province) {
      this.province = new Province(input.province);
    }
  }

  id: number;
  label: string;
  province: Province;


  getProvinceId(): number {
    return this.province.id;
  }

  getProvinceLabel(): string {
    return this.province.label;
  }

}
