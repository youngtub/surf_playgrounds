import React from 'react';
import Autosuggest from './Autosuggest';
import {Tag, Button} from 'antd';
import 'antd/dist/antd.css';
import {Row, Col} from 'react-bootstrap';

class Surch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      surchedNodes: []
    }
    this.surchArtists = this.surchArtists.bind(this);
    this.removeArtist = this.removeArtist.bind(this);
    this.resetSurch = this.resetSurch.bind(this);
    this.demoSurch = this.demoSurch.bind(this);
  }

  componentWillMount() {
    console.log('all artists', this.props.allArtists)
  }

  surchArtists(name) {
    var newArtistsArray = this.state.surchedNodes.concat(name);
    this.setState({
      surchedNodes: newArtistsArray
    }, () => {
      // console.log('artists in Surch state', this.state.surchedArtists);
      this.props.applySurchCb(this.state.surchedNodes)
    })
  }

  removeArtist(name) {
    console.log('NAME IN SURCH', name)
    var filteredArtistsArray = this.state.surchedNodes.filter(artist => artist !== name);
    this.setState({
      surchedNodes: filteredArtistsArray
    }, () => {
      console.log('artists after delete state', this.state.surchedNodes);
      this.props.applySurchCb(this.state.surchedNodes)
    })
  }

  resetSurch() {
    this.setState({
      surchedNodes: []
    }, this.props.reset)
  };

  demoSurch() {
    this.setState({
      surchedNodes: ['A1', 'B2']
    }, () => {
      this.props.applySurchCb(this.state.surchedNodes)
    })
  }

  render() {
    return (
      <div id='surchContainer'>
        <div id='autosuggest' style={surchStyle}>

          <Row>
            <h3 style={surchHeader}>Surch</h3>
            <br/>
          </Row>


          <Row>
            <Col md={8}>
              <Autosuggest allNodes={this.props.allNodes} SurchCb={this.surchArtists} style={autosuggestStyle}/>
            </Col>
            <Col md={4} style={surchButtons}>
              <Button onClick={this.demoSurch}>Demo</Button>
              <Button onClick={this.resetSurch}> Reset</Button>
            </Col>
          </Row>
        </div>
        <br/>
        <Row>
        <Col md={4}>
          {
            this.state.surchedNodes.slice(0, 5).map((artist, i) => (
              <div style={surchStyle}>
                <Tag key={artist} closable={true}
                  afterClose={() => this.removeArtist(artist)} style={tagStyle}>
                  {artist}
                </Tag><br/><br/>
              </div>
            ))
          }
        </Col>

        <Col md={4} style={surchStyle}>
          {
            this.state.surchedNodes.slice(5, 10).map((artist, i) => (
              <div style={surchStyle}>
                <Tag key={artist} closable={true}
                  afterClose={() => this.removeArtist(artist)} style={tagStyle}>
                  {artist}
                </Tag><br/><br/>
              </div>
            ))
          }
        </Col>

        <Col md={4}></Col>
        </Row>
        <br/>
      </div>
    )
  }

};

const surchHeader = {
  textAlign: 'center',
  color: 'black'
}

const surchButtons = {
  // marginLeft: '3%'
}

const autosuggestStyle = {
  width: '70%'
}

const surchStyle = {
  // padding: '10px',
  marginLeft: '2%',
  marginTop: '2%'
}

const tagStyle = {
  // height: '5vh',
  // width: '7vw',
  // fontSize: '12px'
  marginLeft: '4%'
}

export default Surch;
