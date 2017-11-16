import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Input, Icon, Button, Radio} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class AddNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      role: 'secondary'
    }
  }

  handleChange = (e) => {
    this.setState({
      val: e.target.value
    })
  }

  toggleRole = (e) => {
    this.setState({
      role: e.target.value
    })
  }

  handleSubmit = () => {
    this.props.addNodeCallback(this.state.val, this.state.role)
    this.setState({
      val: '',
      role: 'secondary'
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
                  onChange={this.handleChange}
                  value={this.state.val}
                  />
              </Col>
              <Col md={2}></Col>

            </Row>

            <br/>

            <Row>
              <Col md={2}></Col>
              <Col md={8}>
                <RadioGroup onChange={this.toggleRole} value={this.state.role}>
                  <RadioButton value="secondary">Secondary</RadioButton>
                  <RadioButton value="primary">Primary</RadioButton>
                </RadioGroup>
              </Col>
              <Col md={2}></Col>
            </Row>
            <br/>
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

export default AddNode;
