export declare const DEFAULT_HUB_PREFIX = "WiserHeat";
export declare class HeatHubDiscovery {
    readonly prefix: string;
    private discoveredHub?;
    private discoveryPromise?;
    private discoveryTimeout?;
    constructor(prefix?: string);
    discoverHub(): Promise<string | null>;
    forceRefresh(): void;
    private startDiscovery;
}
//# sourceMappingURL=HeatHubDiscovery.d.ts.map