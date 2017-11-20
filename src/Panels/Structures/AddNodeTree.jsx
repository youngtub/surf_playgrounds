import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Input, Icon, Button, Radio} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class AddNodeTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      weight: 1
    }
  }

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    })
  }

  toggleRole = (e) => {
    this.setState({
      role: e.target.value
    })
  }

  handleSubmit = () => {
    // this.props.addTreeNodeCallback(this.state.val, this.state.role)
    this.props.replyToCommentCallback(this.props.selectedNode, this.state.val, this.state.weight)
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

            { this.props.show ? (
              <Row>
              <Row>

                <Col md={2}></Col>
                <Col md={7} style={inputField}>
                  <Input
                    placeholder='new node name'
                    onChange={(e) => this.handleChange(e, 'val')}
                    value={this.state.val}
                    />
                </Col>
                <Col md={2}></Col>

              </Row>

              <br/>

              <Row>
                <Col md={2}></Col>
                <Col md={7} style={inputField}>
                  <Input
                    placeholder='weight'
                    onChange={(e) => this.handleChange(e, 'weight')}
                    value={this.state.weight}
                    />
                </Col>
                <Col md={2}></Col>

              </Row>

              <br/>
              <Row style={submitButton}>
                <Button icon='plus-circle' onClick={this.handleSubmit}>Submit</Button>
              </Row>
              </Row>
            ) : (
              <Row>
                Select a node to attach to!
              </Row>
            )
          }

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

export default AddNodeTree;
