"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
/**
 * Details of a physical device in a Wiser system.
 */
class Device {
    constructor(json) {
        this.id = json.id;
        this.serialNumber = json.SerialNumber;
        this.productType = json.ProductType;
        this.batteryLevel = json.BatteryLevel;
        this.deviceLocked = json.DeviceLockEnabled;
        this.firmwareVersion = json.ActiveFirmwareVersion;
    }
}
exports.Device = Device;
//# sourceMappingURL=Device.js.map