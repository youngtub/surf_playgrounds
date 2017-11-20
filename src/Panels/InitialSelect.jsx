import React from 'react';
import {Input, Button} from 'antd';

class InitialSelect extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        search: ''
      }
    }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  submit = () => {
    this.props.initialSurch(this.state.search)
    this.setState({
      val: ''
    })
  }

  render() {
    return (
      <div style={initialSurchStyle}>
        <div style={inputStyle}>
          <h4 style={{color: '#ededed'}}>Welcome to Surf Playgrounds!</h4>
          <br/>
          <p>To begin, select an option</p>
        </div>
      </div>
      )
  }

}

const inputStyle = {
  width: '70%',
  textAlign: 'center',
  marginTop: '30%',
  marginLeft: '14%',
  color: '#ACBDBA'
}

const initialSurchStyle = {
  backgroundColor: '#033860',
  border: 'solid black 1px',
  borderRadius: '1000px',
  height: '25vh',
  width: '13vw',
  marginTop: '25%',
  marginLeft: '40%',
  textAlign: 'center',
  zIndex: 2000,
  position: 'absolute'
}

export default InitialSelect;
