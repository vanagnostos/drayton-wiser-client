"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatHubDiscovery = exports.DEFAULT_HUB_PREFIX = void 0;
const bonjour_1 = __importDefault(require("bonjour"));
exports.DEFAULT_HUB_PREFIX = 'WiserHeat';
const DISCOVERY_TIMEOUT = 5 * 1000;
class HeatHubDiscovery {
    constructor(prefix = exports.DEFAULT_HUB_PREFIX) {
        this.prefix = prefix;
        // eagerly start the discovery
        this.startDiscovery();
    }
    discoverHub() {
        if (this.discoveredHub !== undefined) {
            return Promise.resolve(this.discoveredHub);
        }
        if (this.discoveryPromise) {
            return this.discoveryPromise;
        }
        return this.startDiscovery();
    }
    forceRefresh() {
        this.discoveredHub = undefined;
    }
    startDiscovery() {
        const bonjour = bonjour_1.default();
        const timeoutPromise = new Promise((resolve) => {
            this.discoveryTimeout = setTimeout(() => {
                bonjour.destroy();
                resolve(null);
            }, DISCOVERY_TIMEOUT);
        });
        const bonjourPromise = new Promise((resolve) => {
            bonjour.find({ type: 'http' }, (service) => {
                if (service.name.startsWith(this.prefix)) {
                    // found a matching device
                    bonjour.destroy();
                    if (this.discoveryTimeout) {
                        // cancel the timeout race
                        clearInterval(this.discoveryTimeout);
                    }
                    resolve(service.host);
                }
            });
        });
        this.discoveryPromise = Promise.race([bonjourPromise, timeoutPromise]);
        return this.discoveryPromise;
    }
}
exports.HeatHubDiscovery = HeatHubDiscovery;
//# sourceMappingURL=HeatHubDiscovery.js.map