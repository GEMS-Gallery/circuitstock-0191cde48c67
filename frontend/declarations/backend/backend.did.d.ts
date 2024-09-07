import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Item {
  'id' : bigint,
  'name' : string,
  'description' : string,
  'quantity' : bigint,
}
export interface ItemInput {
  'name' : string,
  'description' : string,
  'quantity' : bigint,
}
export type Result = { 'ok' : Item } |
  { 'err' : string };
export type Result_1 = { 'ok' : null } |
  { 'err' : string };
export interface _SERVICE {
  'createItem' : ActorMethod<[ItemInput], Result>,
  'deleteItem' : ActorMethod<[bigint], Result_1>,
  'getAllItems' : ActorMethod<[], Array<Item>>,
  'updateItem' : ActorMethod<[bigint, ItemInput], Result>,
  'updateItemQuantity' : ActorMethod<[bigint, bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
