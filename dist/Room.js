"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const RoomMode_1 = require("./RoomMode");
const SetpointOrigin_1 = require("./api/SetpointOrigin");
/**
 * Current state of a room in a Wiser system.
 */
class Room {
    constructor(json) {
        var _a;
        this.id = json.id;
        this.name = json.Name;
        this.isValid = !json.Invalid;
        this.controlType = json.ControlSequenceOfOperation;
        this.heatingType = json.HeatingType;
        this.roomStatId = json.RoomStatId;
        this.thermostatIds = (_a = json.SmartValveIds) !== null && _a !== void 0 ? _a : [];
        if (this.isValid) {
            this.temperature = utils_1.temperatureFromApi(json.CalculatedTemperature);
            const setTemperature = utils_1.temperatureFromApi(json.CurrentSetPoint);
            if (setTemperature !== constants_1.OFF_SET_POINT) {
                this.setTemperature = setTemperature;
            }
            this.active = json.PercentageDemand ? json.PercentageDemand > 0 : false;
            switch (json.SetpointOrigin) {
                case SetpointOrigin_1.SetpointOrigin.FromAwayMode:
                    this.mode = RoomMode_1.RoomMode.Away;
                    break;
                case SetpointOrigin_1.SetpointOrigin.FromBoost:
                    this.mode = RoomMode_1.RoomMode.Boost;
                    break;
                case SetpointOrigin_1.SetpointOrigin.FromManualOverride:
                case SetpointOrigin_1.SetpointOrigin.FromManualOverrideDuringAway:
                    if (this.setTemperature) {
                        this.mode = RoomMode_1.RoomMode.Manual;
                    }
                    else {
                        this.mode = RoomMode_1.RoomMode.Off;
                    }
                    break;
                case SetpointOrigin_1.SetpointOrigin.FromSchedule:
                    this.mode = RoomMode_1.RoomMode.Auto;
                    break;
                default:
                    this.mode = RoomMode_1.RoomMode.Unknown;
            }
        }
        else {
            this.mode = RoomMode_1.RoomMode.Unknown;
        }
    }
}
exports.Room = Room;
//# sourceMappingURL=Room.js.map