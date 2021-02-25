"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.temperatureToApi = exports.temperatureFromApi = void 0;
function temperatureFromApi(apiValue) {
    if (apiValue) {
        return apiValue / 10;
    }
    return undefined;
}
exports.temperatureFromApi = temperatureFromApi;
function temperatureToApi(temperature) {
    if (temperature) {
        return Math.floor(temperature * 10);
    }
    return undefined;
}
exports.temperatureToApi = temperatureToApi;
//# sourceMappingURL=utils.js.map