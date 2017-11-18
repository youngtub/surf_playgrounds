import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Input, Icon, Button, Radio} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class SelectStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    }
  }

  toggleStructure = (e) => {
    this.setState({
      selected: e.target.value
    })
  }

  submit = () => {
    this.props.selectStructureCb(this.state.selected)
  }

  render() {
    return (
      <Grid fluid={true} id='addNode' style={selectStructureStyle}>
        <br/>
        <Row>
          <h4>Select Data Structure</h4>
        </Row>
        <br/><hr/><br/>
        <Row>
          <RadioGroup onChange={this.toggleStructure} value={this.state.selected}>
            <RadioButton value="scatter">Scatter</RadioButton>
            <RadioButton value="tree">Tree</RadioButton>
          </RadioGroup>
        </Row>
        <br/>

        {this.state.selected === 'scatter' ? (
          <Row>
            <hr/>
            A fleet of nodes of the same level, placed by similarity based on some dimensions
          </Row>
        ) : ''}

        {this.state.selected === 'tree' ? (
          <Row>
            <hr/>
            Heirarchical data structure with root and children
          </Row>
        ) : ''}

        {this.state.selected !== '' ? (
          <Row>
            <Button type='primary' icon='caret-right' onClick={this.submit}>Go</Button>
          </Row>
        ) : ''}

      </Grid>
    )
  }
};

const selectStructureStyle = {
  textAlign: 'center'
}

export default SelectStructure;
