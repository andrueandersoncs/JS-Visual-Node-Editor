import Identifier from './Identifier';

class EdgeStruct extends Identifier {
  constructor() {
    super()
    this.from = '0'; // noderef
    this.to = '1'; // noderef
  }
}

export default EdgeStruct;
