import { EventEmitter } from 'events';

enum Types {
  txBlock = 'txBlock',
  dsBlock = 'dsBlock',
  transaction = 'transaction',
  error = 'error'
}

export class ChainEvent extends EventEmitter {
  readonly types = Types; 
}