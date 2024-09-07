export const idlFactory = ({ IDL }) => {
  const ItemInput = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
    'quantity' : IDL.Nat,
  });
  const Item = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'quantity' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'ok' : Item, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'createItem' : IDL.Func([ItemInput], [Result], []),
    'deleteItem' : IDL.Func([IDL.Nat], [Result_1], []),
    'getAllItems' : IDL.Func([], [IDL.Vec(Item)], ['query']),
    'updateItemQuantity' : IDL.Func([IDL.Nat, IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
