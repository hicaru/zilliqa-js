import { BlockChain } from './blockchain';

export class VCBlockChain extends BlockChain {
    getBlockFromPersistentStorage() {
        throw new Error('vc block persistent storage not supported');
    }
}
