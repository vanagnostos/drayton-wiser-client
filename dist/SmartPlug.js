"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartPlug = void 0;
/**
 * Details of a smart plug in a Wiser system.
 */
class SmartPlug {
    constructor(json) {
        this.id = json.id;
        this.outputState = json.OutputState;
        this.targetState = json.TargetState;
        this.instantaneousDemand = json.InstantaneousDemand;
        this.roomId = json.RoomId;
        this.name  = json.Name;
    }
}
exports.SmartPlug = SmartPlug;
//# sourceMappingURL=SmartPlug.js.map
