import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/github';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    }
  }

   componentWillMount() {
     this.setState({
       code: JSON.stringify(initialCode)
     })
   }

   onChange = (e) => {
     console.log('e', e)
   }

  render() {
    return (
      <AceEditor
        mode="javascript"
        theme="github"
        value={this.state.code}
        onChange={this.onChange}
        />
    )
  }
};

const initialCode = {
  "nodes": [
    { "name": "A1", "role": "primary" },
    { "name": "B2", "role": "secondary" },
    { "name": "C3", "role": "secondary" },
  ]
}

export default Editor;
