import { BlockChain } from './blockchain';

export class FallbackBlockChain extends BlockChain {
    getBlockFromPersistentStorage() {}
}
