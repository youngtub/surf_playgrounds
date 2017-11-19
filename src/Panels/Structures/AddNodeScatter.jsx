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
      age: '',
      weight: '',
      height: ''
    }
  }

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    })
  }

  handleSubmit = () => {
    this.props.addScatterNodeCallback(this.state)
    this.setState({
      name: '',
      age: '',
      weight: '',
      height: ''
    })
  }

  render() {
    return (
      <Grid fluid={true} id='addNode'>
        <br/>

        <Row>
          <h3 style={addNodeStyle}>Add Node</h3>
          <br/>
        </Row>

        <Row>
          <Col md={2}></Col>
          <Col md={7} style={inputField}>
            <Input
              placeholder='new node name'
              onChange={(e) => this.handleChange(e, 'name')}
              value={this.state.name}
              />
          </Col>
          <Col md={2}></Col>
        </Row>
        <Row>
          <Col md={2}></Col>
          <Col md={7} style={inputField}>
            <Input
              placeholder='age'
              onChange={(e) => this.handleChange(e, 'age')}
              value={this.state.age}
              />
          </Col>
          <Col md={2}></Col>
        </Row>
        <Row>
          <Col md={2}></Col>
          <Col md={7} style={inputField}>
            <Input
              placeholder='weight (kg pref)'
              onChange={(e) => this.handleChange(e, 'weight')}
              value={this.state.weight}
              />
          </Col>
          <Col md={2}></Col>
        </Row>
        <Row>
          <Col md={2}></Col>
          <Col md={7} style={inputField}>
            <Input
              placeholder='height (cm pref)'
              onChange={(e) => this.handleChange(e, 'height')}
              value={this.state.height}
              />
          </Col>
          <Col md={2}></Col>
        </Row>
        <Row style={submitButton}>
            <Button icon='plus-circle' onClick={this.handleSubmit}>Submit</Button>
        </Row>

      </Grid>
    )
  }
};

const inputField = {
  marginLeft: '2%'
}

const submitButton = {
  textAlign: 'center'
}

const addNodeStyle = {
  textAlign: 'center',
  color: 'black'
}

export default AddNodeScatter
