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
    city_id: Number;
    city: City;

}
