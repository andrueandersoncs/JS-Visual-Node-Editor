import { extendObservable, action, computed } from 'mobx';
import { get } from 'lodash';

/*
  References to objects must be held as UUIDs
*/

class TypedMap extends Map {
  constructor(type = 'untyped', defaults) {
    super(defaults);
    this.type = type;
  }
}

class Store {
  constructor() {
    extendObservable(this, {
      Graph: new TypedMap('Graph', { nodes: [], edges: [] }),
      Edge: new TypedMap('Edge', { from: '', to: '' }),
      Node: new TypedMap('Node', { name: '', value: '' }),
      Position: new TypedMap('Position', { x: 0, y: 0 }),
    });
  }

  create = action((type, optionalDefaults) => {
    let collection = get(this, type);
    if (!collection) {
      collection = new TypedMap(type, optionalDefaults);
      extendObservable(this, { [type]: collection });
    }

    const newType = { ...optionalDefaults, type, id: getId() };
    collection.set(newType.id, newType);
    return newType;
  });

  read = computed((type, uuid, optionalDefault) => {
    const collection = get(this, type, optionalDefault);
    return collection.get ? (collection.get(uuid) || optionalDefault) : optionalDefault;
  });
  
  update = action((type, uuid, updates) => {
    const document = this.read(type, uuid, false);
    if (document) {
      for (const p in updates) {
        document[p] = updates[p];
      }
    }
  });

  delete = action((type, uuid) => {
    const collection = get(this, type, false);
    if (collection && collection.has(uuid)) {
      collection.delete(uuid);
    }
  });
}

export default new Store();
