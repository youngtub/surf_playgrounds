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

  componentDidMount() {
    this.setState({
      code: JSON.stringify(this.props.JSONcode, null, 4)
    })
  }

   componentWillReceiveProps() {
     console.log('props', this.props)
     this.setState({
       code: JSON.stringify(this.props.JSONcode, null, 4)
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

const JSONtree = {
  "nodes": [
  { id: 0, name: 'A', level: 0, children: [1, 2, 3], parent: null, likes: 2, author: 'BeagleBob7', url: "http://www.animalgenetics.us/images/canine/Beagle4.jpg"},
  { id: 1, name: 'B', level: 1, children: [ 4, 5 ], parent: 0, likes: 0, author: "catnip47" },
  { id: 2, name: 'C', level: 1, children: [ 6 ], parent: 0, likes: 3, author: "jackrabbit5" },
  { id: 3, name: 'D', level: 1, children: [ 7 ], parent: 0, likes: 2, author: "meanstack91" },
  { id: 4, name: 'E', level: 2, children: [ 8 ], parent: 1, likes: 1, author: "hooplahadup" },
  { id: 5, name: 'F', level: 2, children: [], parent: 1, likes: 0, author: "bballoo" },
  { id: 6, name: 'G', level: 2, children: [ 9 ], parent: 2, likes: 0, author: "timpumbo" },
  { id: 7, name: 'H', level: 2, children: [], parent: 3, likes: 2, author: "skrrrttt88" },
  { id: 8, name: 'I', level: 3, children: [], parent: 4, likes: 1, author: "lil uzi horizont" },
  { id: 9, name: 'J', level: 3, children: [], parent: 6 , likes: 0, author: "bathtub gin"} ],
  "type":"tree"
}

const JSONscatter = {
  "nodes": [
    { "name": "A", "height": 160, "weight": 50, "age": 23 },
    { "name": "B", "height": 180, "weight": 70, "age": 31 },
    { "name": "C", "height": 163, "weight": 47, "age": 25 },
    { "name": "D", "height": 175, "weight": 80, "age": 40 },
    { "name": "E", "height": 170, "weight": 67, "age": 35 }
  ],
  "type": "scatter"
}

export default Editor;
