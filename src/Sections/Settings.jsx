import React from 'react';
// import ColorPicker from 'rc-color-picker';
import {ChromePicker} from 'react-color';
import {Grid, Row, Col} from 'react-bootstrap';
import $ from 'jquery';
import {Slider, Button, Checkbox, Radio} from 'antd';
const CheckboxGroup = Checkbox.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLinks: false,
      roles: ['rapper', 'producer'],
      label: 'text',
      circleSize: 30,
      linkDistance: 200,
      nodeNumber: 7,
      motion: "false",
      motionSpeed: 1000,
      showPrimary: false,
      primaryColor: '#241587',
      showSecondary: false,
      secondaryColor: '#3f88a3',
      showTopBg: false,
      topBg: '#eff0f2',
      showBottomBg: false,
      bottomBg: '#044191'
    }
    this.hideLinks = this.hideLinks.bind(this);
    this.showLinks = this.showLinks.bind(this);
    this.toggleLabel = this.toggleLabel.bind(this);
    this.toggleMotion = this.toggleMotion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNodeColorChange = this.handleNodeColorChange.bind(this);
    this.toggleNodeColorSelect = this.toggleNodeColorSelect.bind(this);
    this.changeBackgroundColor = this.changeBackgroundColor.bind(this);
    this.toggleBgColorSelect = this.toggleBgColorSelect.bind(this);
  }

  componentDidMount() {
    // console.log('ChromePicker', ChromePicker)
  }

  hideLinks() {
    $('.link').css('display', 'none');
  }

  showLinks() {
    $('.link').css('display', 'inline')
  }

  toggleLabel(e) {
    this.setState({
      label: e.target.value
    }, () =>{
      this.props.passStateInSettings(this.state)
    })
  }

  toggleMotion(e) {
    this.setState({
      motion: e.target.value
    }, () =>{
      this.props.passStateInSettings(this.state)
    })
  }

  handleChange(val, name) {
    console.log('Name', name)
    console.log('val', val)
    this.setState({
      [name]: val
    }, () => {
      this.props.passStateInSettings(this.state)
    })
  };

  toggleNodeColorSelect(name) {
    var opposite = !this.state[name];
    var other; name === 'showPrimary' ? other = 'showSecondary' : other = 'showPrimary';
    var otherState = false;
    this.setState({
      [name]: opposite,
      [other]: otherState
    })
  }

  toggleBgColorSelect(name) {
    var opposite = !this.state[name];
    var other; name === 'showTopBg' ? other = 'showBottomBg' : other = 'showTopBg';
    var otherState = false;
    this.setState({
      [name]: opposite,
      [other]: otherState
    })
  }

  handleNodeColorChange(val, name) {
    this.setState({
      [name]: val.hex
    }, () => {
      this.props.passStateInSettings(this.state);
      if (name === 'topBg' || name === 'bottomBg') this.changeBackgroundColor()
    })
  }

  changeBackgroundColor() {

    $('body').css({background:`linear-gradient(${this.state.topBg}, ${this.state.bottomBg})`})
  }

  render() {

    const primarySelectStyle = {
      backgroundColor: this.state.primaryColor
    }

    const secondarySelectStyle = {
      backgroundColor: this.state.secondaryColor
    }

    const topBgStyle = {
      backgroundColor: this.state.topBg
    }

    const bottomBgStyle = {
      backgroundColor: this.state.bottomBg
    }

    return (
      <Grid style={settingsContainer} className='settingsContainer'>
        <Row>
          <br/>
          <h3>Settings</h3>
          <br/><hr/><br/><br/>

          <Row>
            <Col md={2} style={settingTypeStyle}>
              <p>Links:</p><br/>
            </Col>
            <Col md={8}>
                <Button onClick={this.hideLinks}>Hide</Button>
                <Button onClick={this.showLinks}>Show</Button>
            </Col>
            <Col md={2}></Col>
          </Row>

          <br/><hr/><br/>

        {/*<Row>
          <Col md={2} style={settingTypeStyle}>
            <p>Include: </p>
          </Col>
          <Col md={9}>
            <CheckboxGroup style={{marginLeft: '20%'}} options={checkBoxOptions} defaultValue={['rapper', 'producer']} onChange={this.toggleRoles} />
          </Col>
        </Row>*/}

        <Row>
          <Col md={1} style={settingTypeStyle}>
            <p> Circle size: </p>
          </Col>
          <Col md={7} style={button}>
            <Slider style={sliderStyle} value={this.state.circleSize} max={60} min={3} onChange={(val) => this.handleChange(val, 'circleSize')}/>
          </Col>
        </Row>

        <br/><hr/><br/>

        <Row>
          <Col md={1} style={settingTypeStyle}>
            <p>Link distance:</p>
          </Col>
          <Col md={7} style={button}>
            <Slider style={sliderStyle} value={this.state.linkDistance} max={400} min={20} onChange={(val) => this.handleChange(val, 'linkDistance')}/>
          </Col>
        </Row>

        <br/><hr/><br/>

        <Row>
          <Col md={2} style={settingTypeStyle}>
            <p>Motion </p>
          </Col>

          <Col md={8}>

            <RadioGroup onChange={this.toggleMotion} value={this.state.motion}>
                <RadioButton value="false">Off</RadioButton>
                <RadioButton value="true">On</RadioButton>
            </RadioGroup>

          </Col>
          <Col md={2}></Col>
        </Row>

          { this.state.motion === 'true' ? (
            <div>
            <br/><hr/><br/>
            <Row>
              <Col md={2} style={settingTypeStyle}>
                <p>Speed (ms): </p>
              </Col>

              <Col md={7} style={button}>
                <Slider style={sliderStyle} value={this.state.motionSpeed} max={5000} min={10} onChange={(val) => this.handleChange(val, 'motionSpeed')}/>
              </Col>
            </Row>
            </div>
          ) : ''}


        <br/><hr/><br/>

          <Row>
            <Col md={2} style={settingTypeStyle}>
              <p> Node Colors: </p>
            </Col>
            <Col md={4}>
              <p>Primary</p>
              <Button shape='circle' id='primary' style={primarySelectStyle} onClick={() => this.toggleNodeColorSelect('showPrimary')}/>
              {this.state.showPrimary ? (
                <Row>
                  <ChromePicker onChange={(val) => this.handleNodeColorChange(val, 'primaryColor')} color={this.state.primaryColor} style={colorPickerStyle}/>
                </Row>
              )  : ''}
              {this.state.showSecondary ? (
                <Row>
                  <ChromePicker style={colorPickerStyle} onChange={(val) => this.handleNodeColorChange(val, 'secondaryColor')} color={this.state.secondaryColor}/>
                </Row>
              )  : ''}
            </Col>
            <Col md={4}>
              <p>Secondary</p>
                <Button id='secondary' shape='circle' style={secondarySelectStyle} onClick={() => this.toggleNodeColorSelect('showSecondary')}/>
            </Col>


          </Row>

          <br/><hr/><br/>

            <Row>
              <Col md={2} style={settingTypeStyle}>
                <p> Canvas Colors: </p>
              </Col>
              <Col md={4}>
                <p>Top</p>
                <Button shape='circle' id='primary' style={topBgStyle} onClick={() => this.toggleBgColorSelect('showTopBg')}/>
                {this.state.showTopBg ? (
                  <Row>
                    <ChromePicker onChange={(val) => this.handleNodeColorChange(val, 'topBg')} color={this.state.topBg} style={colorPickerStyle}/>
                  </Row>
                ) : ''}
                {this.state.showBottomBg ? (
                  <Row>
                    <ChromePicker onChange={(val) => this.handleNodeColorChange(val, 'bottomBg')} color={this.state.bottomBg} style={colorPickerStyle}/>
                  </Row>
                ) : ''}
              </Col>
              <Col md={4}>
                <p>Bottom</p>
                  <Button id='secondary' shape='circle' style={bottomBgStyle} onClick={() => this.toggleBgColorSelect('showBottomBg')}/>
              </Col>
            </Row>

            <br/><hr/><br/>

          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <Button type="primary" icon="download" size='large'>Save</Button>
            </Col>
            <Col md={4}></Col>
          </Row>
          <br/>

        </Row>
      </Grid>
    )
  }
};

const secSelect = {
  float: 'left'
}

const colorPickerStyle = {
  zIndex: 1001
}

const checkBoxOptions = [
  {label: 'Rappers', value: 'rapper'},
  {label: 'Producers', value: 'producer'}
]

const settingTypeStyle = {
  marginLeft: '5%'
}

const sliderStyle = {
  marginTop: '-17%'
}

const button = {
  zIndex: '300',
  marginLeft: '30%'
}

const settingsContainer = {
  border: 'solid black 1px',
  zIndex: 200,
  // marginTop: '75%',
  marginLeft: '3%',
  width: '20vw',
  borderRadius: '10px',
  textAlign: 'center'
}

export default Settings;
