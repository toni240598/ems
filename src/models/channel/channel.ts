import { SensorType } from "../sensor-type/sensor-type";

export class Channel {
    constructor(input?: Channel) {
        Object.assign(this, input);
        if (input && input.sensorType) {
            this.setSensorType(new SensorType(input.sensorType));
        }
    }

    private id: Number;
    private label: String;
    private sensorType: SensorType;
    private sensorTypeId: Number;

    getId(): Number {
        return this.id;
    }

    setId(id: Number) {
        this.id = id;
    }

    getLabel(): String {
        return this.label;
    }

    setLabel(label: String) {
        this.label = label;
    }

    getSensorType(): SensorType {
        return this.sensorType;
    }

    setSensorType(sensorType: SensorType) {
        this.sensorType = sensorType;
    }

    getSensorTypeId(): Number {
        return this.sensorTypeId;
    }

    setSensorTypeId(sensorTypeId: Number) {
        this.sensorTypeId = sensorTypeId;
    }
}