import { SystemStatus } from './SystemStatus';
import { Device } from './Device';
import { Room } from './Room';
import ApiFullStatus from './api/responses/FullStatus';
import { ZigbeeStatus } from './ZigbeeStatus';
/**
 * Complete status information for a Wiser system.
 *
 * This combines all of the other status models.
 */
export declare class FullStatus {
    /**
     * HeatHub system status.
     */
    readonly system: SystemStatus;
    /**
     * Device statuses.
     */
    readonly devices: Device[];
    /**
     * Room statuses.
     */
    readonly rooms: Room[];
    /**
     * Zigbee module status.
     */
    readonly zigbee: ZigbeeStatus;
    constructor(json: ApiFullStatus);
}
//# sourceMappingURL=FullStatus.d.ts.map