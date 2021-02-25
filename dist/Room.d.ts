import ApiRoom from './api/responses/Room';
import { ControlType } from './api/ControlType';
import { HeatingType } from './api/HeatingType';
import { RoomMode } from './RoomMode';
/**
 * Current state of a room in a Wiser system.
 */
export declare class Room {
    /**
     * Internal ID of the room.
     */
    readonly id: number;
    /**
     * Display name for the room.
     */
    readonly name: string;
    /**
     * Whether the room is valid or not. Invalid rooms do not have any TRVs or
     * room thermostats and cannot be controlled.
     */
    readonly isValid: boolean;
    /**
     * Control type for this room.
     *
     * Currently only `HeatingOnly` rooms are supported.
     */
    readonly controlType: ControlType;
    /**
     * Type of radiators in a room.
     *
     * Currently only `HydronicRadiator`s are supported.
     */
    readonly heatingType: HeatingType;
    /**
     * Current measured temperature of the room.
     *
     * This will be `undefined` if the room is invalid.
     */
    readonly temperature?: number;
    /**
     * Current target temperature for the room.
     *
     * This will be `undefined` if the room is invalid.
     */
    readonly setTemperature?: number;
    /**
     * Whether the room is being actively heated.
     *
     * This will be `undefined` if the room is invalid.
     */
    readonly active?: boolean;
    /**
     * Current control mode for a room.
     */
    readonly mode: RoomMode;
    /**
     * ID of linked RoomStat (if any).
     */
    readonly roomStatId?: number;
    /**
     * IDs of linked TRVs (if any).
     */
    readonly thermostatIds: number[];
    constructor(json: ApiRoom);
}
//# sourceMappingURL=Room.d.ts.map