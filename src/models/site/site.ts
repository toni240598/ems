import { GeoLocation } from "../geo-location/geo-location";
import { District } from "../district/district";

export class Site extends GeoLocation {
    constructor(input?: Site) {
        super();
        Object.assign(this, input);
        if (input && input.district) {
            this.district = new District(input.district);
        }
    }

    id: Number;
    label: String;
    district_id: Number;
    district: District;
}
