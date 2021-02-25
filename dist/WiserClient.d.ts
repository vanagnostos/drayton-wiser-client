import { Room } from './Room';
import { Device } from './Device';
import { SystemStatus } from './SystemStatus';
import { FullStatus } from './FullStatus';
/**
 * Client for querying and controlling Wiser HeatHub systems.
 */
export declare class WiserClient {
    private readonly secret;
    private readonly fixedAddress?;
    private readonly discovery?;
    /**
     * Creates a new client instance that will attempt to auto-detect the address
     * of the HeatHub.
     *
     * @param secret secret key for the HeatHub.
     * @param prefix optional hostname prefix for finding HeatHub (defaults to
     *        `WiserHeat`).
     */
    static clientWithDiscovery(secret: string, prefix?: string): WiserClient;
    /**
     * Creates a new client instance that will connect to the specified HeatHub.
     *
     * @param secret secret key for the HeatHub.
     * @param address IP address or hostname of the HeatHub.
     */
    static clientWithAddress(secret: string, address: string): WiserClient;
    private constructor();
    /**
     * Fetch the full status of the system. This includes statuses from all
     * of the other endpoints - only use this if you _really_ need all of the
     * information at once as it is a slow endpoint.
     *
     * @return full status of the system.
     */
    fullStatus(): Promise<FullStatus>;
    /**
     * Fetch the status of the HeatHub.
     *
     * @return status of the system.
     */
    systemStatus(): Promise<SystemStatus>;
    /**
     * Enable Away mode.
     *
     * This set the set point of all rooms to a preset low temperature and
     * disables all schedules.
     */
    enableAwayMode(): Promise<FullStatus>;
    /**
     * Disable current Away mode. This does nothing if Away mode is not currently
     * active.
     */
    disableAwayMode(): Promise<FullStatus>;
    /**
     * Boosts the set points of all rooms by 2ºC.
     */
    boostAllRooms(): Promise<FullStatus>;
    /**
     * Cancels any manual set points or boost for all rooms.
     */
    cancelAllOverrides(): Promise<FullStatus>;
    /**
     * Fetch a list of all devices in the system.
     *
     * @return details of each device.
     */
    listDevices(): Promise<Device[]>;
    /**
     * Fetch the status of a device.
     *
     * @param id system ID of the device to fetch.
     * @return details of the device.
     */
    deviceStatus(id: number): Promise<Device>;
    /**
     * Fetch the status of all rooms in the system.
     *
     * @return the status of each room.
     */
    roomStatuses(): Promise<Room[]>;
    /**
     * Fetch the status of an individual room.
     *
     * @param id system ID of the room to fetch.
     * @return status of the room or `undefined` if not found.
     */
    roomStatus(id: number): Promise<Room>;
    /**
     * Overrides the set point of an individual room.
     *
     * @param roomId system ID of the room to override.
     * @param setPoint temperature to set the room to (in Celsius).
     * @return updated status of the room.
     */
    overrideRoomSetPoint(roomId: number, setPoint: number): Promise<Room>;
    /**
     * Disables (turns off) the radiators in a room.
     *
     * @param roomId  system ID of the room to disable.
     * @return updated status of the room.
     */
    disableRoom(roomId: number): Promise<Room>;
    /**
     * Cancel any overrides set on a room.
     *
     * @param roomId system ID of the room to clear overrides for.
     * @return updated status of the room.
     */
    cancelRoomOverride(roomId: number): Promise<Room>;
    private overrideRoom;
    private overrideSystem;
    private request;
}
//# sourceMappingURL=WiserClient.d.ts.map