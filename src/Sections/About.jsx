import React from 'react';
import {Row, Col} from 'react-bootstrap';

const About = (props) => {

  return (
    <div style={centered}>
    <h3><u>About</u></h3>
    <br/>
    <h5>Surf Playgrounds exposes the essence of the platform with simple dummy data</h5>
    <br/>
    <p> Currently supports two types of data: </p>
    <ul style={{textAlign: 'left'}}>
      <li>-Hierarchical (tree) structures, where every node has a parent (except the root), and the potential to have children </li>
      <li>-Dimensional, where every node has some properties, with which their similarity is computed </li>
    </ul>
    <br/>
    <p>Once you select a data structure, you can add nodes and see for yourself how things work</p>
      <br/>
      <p>Feel free to mess around with the Settings, and check out our proprietary <i>Surch</i>! It helps you to build up an aggregate search composed of multiple searches.</p>
      <br/>
      {/*<Row>
        <Col md={4}></Col>
        <Col md={2}>
          <img src='https://drive.google.com/uc?id=0BxlVLOVlVGhdWllPTTFJMEQ3cWs' height={200} width={200}></img>
        </Col>
        <Col md={2}>
          <img src='https://drive.google.com/uc?id=0BxlVLOVlVGhdWmlCMFdJd2Y4Nnc' height={200} width={200}></img>
        </Col>
        <Col md={4}></Col>
      </Row>*/}
      <br/>
     <br/>

     </div>
  )
};

const centered = {
  textAlign: 'center'
}

export default About;
