import React, { Component } from 'react';
import store from './store';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    const context = this.ref.current.getContext('2d');
    const renderNodes = () => null;
    const renderEdges = () => null;
    const renderGraph = () => {
      renderEdges();
      renderNodes();
    };
  }

  render() {
    return (
      <div
        style={{
          flex: 1,
          border: 'solid 1px black',
          overflow: 'hidden',
        }}
      >
        <canvas ref={this.ref} width="100%" height="100%" />
      </div>
    ); 
  }
} 

export default Graph;
