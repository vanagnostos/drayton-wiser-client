"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomMode = void 0;
/**
 * Current scheduling mode for a room.
 * @internal
 */
var RoomMode;
(function (RoomMode) {
    /**
     * Normal scheduling for this room has been disabled and the only heat applied
     * will be to prevent freezing.
     *
     * This mode will not expire and will remain active until manually disabled.
     */
    RoomMode[RoomMode["Off"] = 0] = "Off";
    /**
     * Normal scheduling for this room has been disabled and a preset 'away' mode
     * temperature set.
     *
     * This mode will not expire and will remain active until manually disabled.
     */
    RoomMode[RoomMode["Away"] = 1] = "Away";
    /**
     * Normal scheduling is active for this room without any overrides.
     */
    RoomMode[RoomMode["Auto"] = 2] = "Auto";
    /**
     * A temporary boost has been set above the scheduled temperature.
     *
     * This boost will expire after a set period of time.
     */
    RoomMode[RoomMode["Boost"] = 3] = "Boost";
    /**
     * A manual override temperature has been set.
     *
     * This override will not expire and will remain active until manually disabled.
     */
    RoomMode[RoomMode["Manual"] = 4] = "Manual";
    /**
     * Mode for this room could not be determined.
     */
    RoomMode[RoomMode["Unknown"] = -1] = "Unknown";
})(RoomMode = exports.RoomMode || (exports.RoomMode = {}));
//# sourceMappingURL=RoomMode.js.map