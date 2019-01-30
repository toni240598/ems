import { Channel } from "../channel/channel";

export class SensorType {
    constructor(input?: SensorType) {
        Object.assign(this, input);
    }

    private id: Number;
    private label: String;
    private channels: Channel[];
    private deleteChannels: Channel[];
    private newChannels: Channel[];
    
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

    getChannels(): Channel[] {
        return this.channels
    }

    setChannel(channels: Channel[]) {
        this.channels = channels;
    }

    getNewChannels(): Channel[] {
        return this.newChannels;
    }

    setNewChannels(newChannels: Channel[]) {
        this.newChannels = newChannels;
    }

    setChannelSensorIds(id: Number) {
        this.channels.forEach(channel => channel.setSensorTypeId(id));
        this.newChannels.forEach(channel => channel.setSensorTypeId(id));
    }

    getDeleteChannels(): Channel[] {
        return this.deleteChannels;
    }

    setDeleteChannels(deleteChannels: Channel[]) {
        this.deleteChannels = deleteChannels;
    }

    addChannel(channel: Channel) {
        this.channels = [...this.channels, channel];
        this.newChannels = [...this.newChannels, channel];
    }

    deleteChannel(channel: Channel) {
        this.deleteChannels = [...this.deleteChannels, channel];
        this.channels = this.channels.filter(result => result.getLabel() !== channel.getLabel());
        this.newChannels = this.channels.filter(result => result.getLabel() !== channel.getLabel());
    }
}