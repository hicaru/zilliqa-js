export type MicroBlockInfo = {
    microBlockHash: string;
    txnRootHash: string;
    shardId: number;
}
export type CoSignatures = {
    CS1: string; // Signature
    CS2: string; // Signature
    B2: boolean;
    B1: boolean;
}
