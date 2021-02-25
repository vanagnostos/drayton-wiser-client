"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemStatus = void 0;
const utils_1 = require("./utils");
/**
 * Current status of a Wiser system.
 */
class SystemStatus {
    constructor(json) {
        this.version = json.ActiveSystemVersion;
        this.ecoMode = json.EcoModeEnabled;
        this.awayMode = json.OverrideType === 'Away';
        this.awayModeSetPoint = (utils_1.temperatureFromApi(json.AwayModeSetPointLimit));
        this.heatingOverrideEnabled = json.HeatingButtonOverrideState === 'On';
        this.overridesActive = json.UserOverridesActive || false;
    }
}
exports.SystemStatus = SystemStatus;
//# sourceMappingURL=SystemStatus.js.map