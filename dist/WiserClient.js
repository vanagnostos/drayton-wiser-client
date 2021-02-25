"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WiserClient = void 0;
const Room_1 = require("./Room");
const node_fetch_1 = __importDefault(require("node-fetch"));
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const OverrideType_1 = require("./api/OverrideType");
const HeatHubDiscovery_1 = require("./HeatHubDiscovery");
const Device_1 = require("./Device");
const SmartPlug_1 = require("./SmartPlug");
const SystemStatus_1 = require("./SystemStatus");
const FullStatus_1 = require("./FullStatus");
const SystemOverrideRequest_1 = require("./api/requests/SystemOverrideRequest");
/**
 * Client for querying and controlling Wiser HeatHub systems.
 */
class WiserClient {
    constructor(secret, fixedAddress, discoveryPrefix) {
        this.secret = secret;
        this.fixedAddress = fixedAddress;
        if (!fixedAddress) {
            // attempt to discover a hub
            this.discovery = new HeatHubDiscovery_1.HeatHubDiscovery(discoveryPrefix);
        }
    }
    /**
     * Creates a new client instance that will attempt to auto-detect the address
     * of the HeatHub.
     *
     * @param secret secret key for the HeatHub.
     * @param prefix optional hostname prefix for finding HeatHub (defaults to
     *        `WiserHeat`).
     */
    static clientWithDiscovery(secret, prefix) {
        return new WiserClient(secret, undefined, prefix);
    }
    /**
     * Creates a new client instance that will connect to the specified HeatHub.
     *
     * @param secret secret key for the HeatHub.
     * @param address IP address or hostname of the HeatHub.
     */
    static clientWithAddress(secret, address) {
        return new WiserClient(secret, address);
    }
    /**
     * Fetch the full status of the system. This includes statuses from all
     * of the other endpoints - only use this if you _really_ need all of the
     * information at once as it is a slow endpoint.
     *
     * @return full status of the system.
     */
    async fullStatus() {
        const response = await this.request('domain/');
        if (response.status === 200) {
            const apiStatus = response.json;
            return new FullStatus_1.FullStatus(apiStatus);
        }
        throw new Error('unexpected-response');
    }
    /**
     * Fetch the status of the HeatHub.
     *
     * @return status of the system.
     */
    async systemStatus() {
        const response = await this.request('domain/System');
        if (response.status === 200) {
            const apiStatus = response.json;
            return new SystemStatus_1.SystemStatus(apiStatus);
        }
        throw new Error('unexpected-response');
    }
    /**
     * Enable Away mode.
     *
     * This set the set point of all rooms to a preset low temperature and
     * disables all schedules.
     */
    async enableAwayMode() {
        return this.overrideSystem(SystemOverrideRequest_1.SystemOverrideType.Away);
    }
    /**
     * Disable current Away mode. This does nothing if Away mode is not currently
     * active.
     */
    async disableAwayMode() {
        return this.overrideSystem(SystemOverrideRequest_1.SystemOverrideType.Normal);
    }
    /**
     * Boosts the set points of all rooms by 2ºC.
     */
    async boostAllRooms() {
        return this.overrideSystem(SystemOverrideRequest_1.SystemOverrideType.BoostAllRooms);
    }
    /**
     * Cancels any manual set points or boost for all rooms.
     */
    async cancelAllOverrides() {
        return this.overrideSystem(SystemOverrideRequest_1.SystemOverrideType.CancelAllOverrides);
    }
    /**
     * Fetch a list of all devices in the system.
     *
     * @return details of each device.
     */
    async listDevices() {
        const response = await this.request('domain/Device');
        if (response.status === 200) {
            const apiDevices = response.json;
            return apiDevices.map((d) => new Device_1.Device(d));
        }
        throw new Error('unexpected-response');
    }
    /**
     * Fetch the status of a device.
     *
     * @param id system ID of the device to fetch.
     * @return details of the device.
     */
    async deviceStatus(id) {
        const response = await this.request(`domain/Device/${id}`);
        switch (response.status) {
            case 200:
                return new Device_1.Device(response.json);
            case 404:
                throw new Error('device-not-found');
            default:
                throw new Error('unexpected response');
        }
    }
    /**
     * Fetch the status of all rooms in the system.
     *
     * @return the status of each room.
     */
    async roomStatuses() {
        const response = await this.request('domain/Room');
        if (response.status === 200) {
            const apiRooms = response.json;
            return apiRooms.map((r) => new Room_1.Room(r));
        }
        throw new Error('unexpected-response');
    }
    /**
     * Fetch the status of an individual room.
     *
     * @param id system ID of the room to fetch.
     * @return status of the room or `undefined` if not found.
     */
    async roomStatus(id) {
        const response = await this.request(`domain/Room/${id}`);
        if (response.status === 200) {
            return new Room_1.Room(response.json);
        }
        if (response.status === 404) {
            throw new Error('room-not-found');
        }
        throw new Error('unexpected response');
    }
    /**
     * Overrides the set point of an individual room.
     *
     * @param roomId system ID of the room to override.
     * @param setPoint temperature to set the room to (in Celsius).
     * @return updated status of the room.
     */
    async overrideRoomSetPoint(roomId, setPoint) {
        if (setPoint < constants_1.MIN_SET_POINT || setPoint > constants_1.MAX_SET_POINT) {
            return Promise.reject(new RangeError('setPoint must be between 5 and 30'));
        }
        return this.overrideRoom(roomId, OverrideType_1.OverrideType.Manual, setPoint);
    }
    /**
     * Disables (turns off) the radiators in a room.
     *
     * @param roomId  system ID of the room to disable.
     * @return updated status of the room.
     */
    async disableRoom(roomId) {
        return this.overrideRoom(roomId, OverrideType_1.OverrideType.Manual, constants_1.OFF_SET_POINT);
    }
    /**
     * Cancel any overrides set on a room.
     *
     * @param roomId system ID of the room to clear overrides for.
     * @return updated status of the room.
     */
    async cancelRoomOverride(roomId) {
        return this.overrideRoom(roomId, OverrideType_1.OverrideType.None);
    }
    /**
     * Fetch the status of an individual smart plug.
     *
     * @param plugId system ID of the plug to fetch.
     * @return status of the plug or `undefined` if not found.
     */
    async smartPlugStatus(plugId) {
        const response = await this.request(`domain/SmartPlug/${plugId}`);
        if (response.status === 200) {
            return new SmartPlug_1.SmartPlug(response.json);
        }
        if (response.status === 404) {
            throw new Error('smart-plug-not-found');
        }
        throw new Error('unexpected response');
    }
    /**
     * Sets the state (on/off) of a smart plug.
     *
     * @param plugId system ID of the plug
     * @param state true/false
     * @return updated status of the room.
     */
    async setSmartPlugState(plugId, state) {
        const payload = {
            RequestOutput: state ? 'On' : 'Off'
        };
        const response = await this.request(`domain/SmartPlug/${plugId}`, 'PATCH', payload);
        if (response.status === 200) {
            return this.smartPlugStatus(plugId);
        }
        if (response.status === 404) {
            throw new Error('smart-plug-not-found');
        }
        throw new Error('unexpected-response');
    }
    async overrideRoom(roomId, type, setPoint) {
        const payload = {
            RequestOverride: {
                Type: type,
            },
        };
        if (setPoint) {
            payload.RequestOverride.SetPoint = utils_1.temperatureToApi(setPoint);
        }
        const response = await this.request(`domain/Room/${roomId}`, 'PATCH', payload);
        if (response.status === 200) {
            // wiser returns a stale room status so we need to re-request an update
            return this.roomStatus(roomId);
        }
        if (response.status === 404) {
            throw new Error('room-not-found');
        }
        throw new Error('unexpected-response');
    }
    async overrideSystem(overrideType) {
        const payload = {
            RequestOverride: {
                Type: overrideType,
            },
        };
        const response = await this.request('domain/System', 'PATCH', payload);
        if (response.status === 200) {
            // we want to return the full system info
            return this.fullStatus();
        }
        throw new Error('unexpected-response');
    }
    async request(endpoint, method = 'GET', body) {
        let address = this.fixedAddress;
        if (!address && this.discovery) {
            address = await this.discovery.discoverHub();
        }
        if (!address) {
            throw new Error('system-not-found');
        }
        const headers = {
            SECRET: this.secret,
            Accept: 'application/json',
        };
        const args = {
            headers,
            method: method,
            timeout: 2000,
        };
        if (body) {
            headers['Content-Type'] = 'application/json';
            args.body = JSON.stringify(body);
        }
        try {
            const response = await node_fetch_1.default(`http://${address}/data/${endpoint}`, args);
            if (response.ok) {
                const json = await response.json();
                return {
                    status: 200,
                    json,
                };
            }
            return {
                status: response.status,
            };
        }
        catch (error) {
            // node-fetch specific error
            if (error.type === 'request-timeout') {
                throw new Error('system-not-found');
            }
            throw new Error('unexpected-error');
        }
    }
}
exports.WiserClient = WiserClient;
//# sourceMappingURL=WiserClient.js.map