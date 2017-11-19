import React, { Component } from 'react';
import VizPanel from './Panels/VizPanel';
import 'antd/dist/antd.css';
import axios from 'axios';
import Menu from './Sections/Menu.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import ScrollableAnchor from 'react-scrollable-anchor'
import About from './Sections/About';
import Contribute from './Sections/Contribute';
import Editor from './Sections/Editor';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsObj: {},
      currentNodes: [],
      structure: ''
    }
    this.passStateInSettings = this.passStateInSettings.bind(this);
    this.passNodesInViz = this.passNodesInViz.bind(this);
  }

  componentDidMount() {
    // axios.get('/api/test').then((res)=>console.log('test', res))
  }

  passStateInSettings(obj) {
    this.setState({
      settingsObj: obj
    })
  }

  passNodesInViz(nodes) {
    this.setState({
      currentNodes: nodes
    })
  }

  render() {
    return (
      <div className="App">
        <ScrollableAnchor id={'main'}>
          <Row>
            <Col md={1}>
              <h2 className='Balmain'> Surf </h2>
            </Col>
            <Col md={1}>
              <h2 style={movieHeaderStyle}> Playgrounds </h2>
            </Col>
          </Row>
      </ScrollableAnchor>
        <Grid fluid={true}>


        <Row>
          <Col md={2}>
            <Menu passStateInSettings={this.passStateInSettings}/>
          </Col>

          <Col md={10}>
            <VizPanel settings={this.state.settingsObj} passNodesInViz={this.passNodesInViz}/>
          </Col>

        </Row>
        <br/><hr/><br/>
        <Row style={{backgroundColor: '#d9d9db'}}>
          <Col md={6}>
            <Editor JSONcode={this.state.currentNodes}/>
          </Col>
          <Col md={6}>
            <About />
          </Col>
        </Row>


      {/*<ScrollableAnchor id={'about'}>
        <hr/>
      </ScrollableAnchor>
        <Row style={aboutStyle}>
          <br/>
          <About/>
          <br/><br/><hr/><br/><br/>
        </Row>


        <ScrollableAnchor id={'contribute'}>
        <Row>
          <Contribute />
        </Row>
        </ScrollableAnchor>

        <Row>
          <Col md={12} style={surfStyle}>
            <div style={surfStyle}>
              <h2 className='Balmain'> Surf </h2>
              </div>
              </Col>
            </Row>*/}

        </Grid>
      </div>
    );
  }
}

const movieHeaderStyle = {
  marginLeft: '40%',
  marginTop: '20%',
  fontFamily: 'Montserrat',
  fontSize: '37px'
}

const surfStyle = {
  float: 'right',
  backgroundColor: '#dbdde0'
}

// const black = {
//   color: 'black'
// }

const aboutStyle = {
  backgroundColor: '#afbdd3'
}

export default App;
