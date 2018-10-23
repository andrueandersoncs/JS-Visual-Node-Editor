import { extendObservable, action, computed } from 'mobx';
import { get } from 'lodash';
import getId from './utils/getId';

/*
  References to objects must be held as UUIDs
*/

class TypedMap extends Map {
  constructor(type = 'untyped', defaults = {}) {
    super(Object.keys(defaults).map(key => ([ key, defaults[key] ])));
    this.type = type;
  }
}

class State {
  constructor() {
    extendObservable(this, {
      App: new TypedMap('App', { currentlyEditing: '1' }),
      Graph: new TypedMap('Graph', { nodes: ['2', '3'], edges: ['4'] }),
      Edge: new TypedMap('Edge', { from: '2', to: '3' }),
      Node: new TypedMap('Node', { name: 'Node A', value: '' }),
      Position: new TypedMap('Position', { x: 0, y: 0 }),
    });
  }
}

export class Store {
  constructor() {
    this.state = new State();
  }

  create = action((type, optionalDefaults) => {
    let collection = get(this.state, type);
    if (!collection) {
      collection = new TypedMap(type, optionalDefaults);
      extendObservable(this.state, { [type]: collection });
    }
    const newType = { ...optionalDefaults, type, id: getId() };
    collection.set(newType.id, newType);
    return newType;
  });

  read = computed((type, uuid, optionalDefault) => {
    const collection = get(this.state, type, optionalDefault);
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
    const collection = get(this.state, type, false);
    if (collection && collection.has(uuid)) {
      collection.delete(uuid);
    }
  });
}

export default new Store();
