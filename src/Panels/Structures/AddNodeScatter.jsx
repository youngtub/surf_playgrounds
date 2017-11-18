import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Input, Icon, Button, Radio} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class AddNodeScatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      value: 0
    }
  }


  render() {
    return (
      <p>Text from Add nodeo scatter</p>
    )
  }
};

export default AddNodeScatter
