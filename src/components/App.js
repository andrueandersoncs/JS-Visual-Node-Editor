import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Editor from './Editor';
import Graph from './Graph';
import store from '../store';


const App = observer(
  class App extends Component {
    constructor() {
      super();
      this.app = store.create('App');
    }

    render() {
      return (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex'
        }}>
          <Editor />
          <Graph />
        </div>
      );
    }
  }
);

export default App;
