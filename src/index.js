import React, { Component } from 'react';
import { render } from 'react-dom';
import Editor from './Editor.js';
import Graph from './Graph.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
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

render(<App />, document.getElementById('root'));
