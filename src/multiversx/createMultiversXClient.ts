import { ApiNetworkProvider } from "@multiversx/sdk-core";


export function createMultiversXClient() {
    const apiNetworkProvider = new ApiNetworkProvider(process.env?.MULTIVERSX_PROVIDER_URL, { clientName: "AgenteX" });
    return apiNetworkProvider;
}