import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor {
  type Item = {
    id: Nat;
    name: Text;
    description: Text;
    quantity: Nat;
  };

  type ItemInput = {
    name: Text;
    description: Text;
    quantity: Nat;
  };

  stable var nextId: Nat = 0;
  let itemStore = HashMap.HashMap<Nat, Item>(10, Nat.equal, Nat.hash);

  public func createItem(input: ItemInput): async Result.Result<Item, Text> {
    let id = nextId;
    nextId += 1;
    let newItem: Item = {
      id = id;
      name = input.name;
      description = input.description;
      quantity = input.quantity;
    };
    itemStore.put(id, newItem);
    #ok(newItem)
  };

  public query func getAllItems(): async [Item] {
    Iter.toArray(Iter.map(itemStore.entries(), func (entry: (Nat, Item)): Item { entry.1 }))
  };

  public func updateItem(id: Nat, input: ItemInput): async Result.Result<Item, Text> {
    switch (itemStore.get(id)) {
      case (null) {
        #err("Item not found")
      };
      case (?item) {
        let updatedItem = {
          id = id;
          name = input.name;
          description = input.description;
          quantity = input.quantity;
        };
        itemStore.put(id, updatedItem);
        #ok(updatedItem)
      };
    }
  };

  public func updateItemQuantity(id: Nat, newQuantity: Nat): async Result.Result<Item, Text> {
    switch (itemStore.get(id)) {
      case (null) {
        #err("Item not found")
      };
      case (?item) {
        let updatedItem = {
          id = id;
          name = item.name;
          description = item.description;
          quantity = newQuantity;
        };
        itemStore.put(id, updatedItem);
        #ok(updatedItem)
      };
    }
  };

  public func deleteItem(id: Nat): async Result.Result<(), Text> {
    switch (itemStore.remove(id)) {
      case (null) {
        #err("Item not found")
      };
      case (?_) {
        #ok()
      };
    }
  };
}
