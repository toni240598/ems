import { GeoLocation } from "../geo-location/geo-location";
import { City } from "../city/city";

export class District extends GeoLocation {
    constructor(input?: District) {
        super();
        Object.assign(this, input);
        if ( input && input.city) {
            this.city = new City(input.city);
        }
    }

    id: Number;
    label: String;
    city: City;

    getCityId(): Number {
        return this.city.id;
    }

    getCityLabel(): String {
        return this.city.label;
    }
}