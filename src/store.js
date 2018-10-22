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
      Graph: new Map(),
      Node: new Map(),
      Position: new Map(),
      Edge: new Map(),
    });
  }

  create = action((type, optionalDefault) => {});

  read = computed((type, uuid, optionalDefault) => get(this, `${type}.${uuid}`, optionalDefault));
  
  update = action((type, uuid, updates) => {
    const document = this.read(type, uuid);
    for (const p in updates) {
      document[p] = updates[p];
    }
  });

  delete = action(() => {});

}

export default new Store();
