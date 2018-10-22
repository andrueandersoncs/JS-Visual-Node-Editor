import React, { Component } from 'react';
import { editor } from 'monaco-editor';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount = () => {
    this.editor = editor.create(this.ref.current);
  }
  render() {
    return (
      <div
        ref={this.ref}
        style={{
          flex: 1,
          border: 'solid 1px black',
          overflow: 'hidden',
        }}
      ></div>
    );
  }
}

export default Editor;
