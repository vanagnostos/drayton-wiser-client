"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZigbeeStatus = void 0;
/**
 * Current state of the Zigbee communication module.
 *
 * This is only provided to allow for a unique system identifier.
 */
class ZigbeeStatus {
    constructor(json) {
        this.macAddress = json.ZigbeeEUI;
        this.moduleVersion = json.ZigbeeModuleVersion;
    }
}
exports.ZigbeeStatus = ZigbeeStatus;
//# sourceMappingURL=ZigbeeStatus.js.map