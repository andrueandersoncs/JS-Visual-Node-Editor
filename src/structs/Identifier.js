const getId = (() => {
  let id = 0;
  return () => {
    return (id++ + '');
  }
})();

class Identifier {
  constructor() {
    this.id = getId(); // 0, 1, 2, ...
  }
}

export default Identifier;
