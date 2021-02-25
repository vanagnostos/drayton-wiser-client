import ZigbeeInfo from './api/responses/ZigbeeInfo';
/**
 * Current state of the Zigbee communication module.
 *
 * This is only provided to allow for a unique system identifier.
 */
export declare class ZigbeeStatus {
    /**
     * MAC address of the Zigbee module.
     */
    readonly macAddress: string;
    /**
     * Firmware version of the Zigbee module.
     */
    readonly moduleVersion: string;
    constructor(json: ZigbeeInfo);
}
//# sourceMappingURL=ZigbeeStatus.d.ts.map