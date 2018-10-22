import Identifier from './Identifier';

class GraphStruct extends Identifier {
  constructor() {
    super()
    this.nodes = ['0', '1', 'etc']; // array of noderef
    this.edges = ['2', '3', 'etc']; // array of edgeref
  }
}

export default GraphStruct;
