"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullStatus = void 0;
const SystemStatus_1 = require("./SystemStatus");
const Device_1 = require("./Device");
const Room_1 = require("./Room");
const SmartPlug_1 = require("./SmartPlug");
const ZigbeeStatus_1 = require("./ZigbeeStatus");
/**
 * Complete status information for a Wiser system.
 *
 * This combines all of the other status models.
 */
class FullStatus {
    constructor(json) {
        this.system = new SystemStatus_1.SystemStatus(json.System);
        this.devices = json.Device.map((d) => new Device_1.Device(d));
        this.rooms = json.Room.map((r) => new Room_1.Room(r));
        this.zigbee = new ZigbeeStatus_1.ZigbeeStatus(json.Zigbee);
        this.smartPlugs = (json.SmartPlug || []).map((d) => new SmartPlug_1.SmartPlug(d));
    }
}
exports.FullStatus = FullStatus;
//# sourceMappingURL=FullStatus.js.map
