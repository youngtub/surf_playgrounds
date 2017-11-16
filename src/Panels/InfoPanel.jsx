import React from 'react';
import {Col, Row, Grid, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Button} from 'antd';


const InfoPanel = (props) => {

  const calculateLinks = () => {
    var relevantLinks = props.links.reduce((acc, curr) => {
      if (curr.source.name === props.selectedArtist.name && curr.value > 0) {
        acc[`${curr.target.name}`] = curr.value;
      }
      if (curr.target.name === props.selectedArtist.name && curr.value > 0) {
        acc[`${curr.source.name}`] = curr.value;
      }
      return acc;
    }, {})
    var outputArr = [];
    for (var key in relevantLinks) {
      let tempObj = {
        'name':key,
        'count': relevantLinks[key]
      }
      outputArr.push(tempObj)
    }
    outputArr.sort((a,b)=>b.count-a.count);
    return outputArr
  }

  return (
    <div id='infoPanel'>

      <Grid fluid={true}>

    {props.display === 'node' ? (
      <Row>
        <Col sm={12} md={12} style={centered}>
          <Row>
            <h2>{props.selectedNode.name}</h2>
          </Row>
          <Row>
            {/*<img src={props.selectedNode.thumbnail} height={150} width={160}/>*/}
          </Row>
          <Row>
            {props.selectedNode.role}
          </Row>
        </Col>
      </Row>
  ) : ''}

    {props.display === 'link' ? (
        <Row className="show-grid">
          <Col sm={6} md={6} className='artist1' style={centered}>
            <Row>
              {props.selectedLink.source.name}
            </Row>
            {/*<Row>
              <img src={props.selectedLink.source.thumbnail} height={150} width={160}/>
            </Row>*/}
            <Row>
              {props.selectedLink.source.role}
            </Row>
          </Col>
          <Col sm={6} md={6} className='artist2' style={centered}>
            <Row>
              {props.selectedLink.target.name}
            </Row>
            {/*<Row>
              <img src={props.selectedLink.target.thumbnail} height={150} width={160}/>
            </Row>*/}
            <Row>
              {props.selectedLink.target.role}
            </Row>

          </Col>

        </Row>
    ) : ''}

    {props.display === '' ? (
      <Col md={12}>
        <br/>
        <img src='https://coconutgirlwireless.files.wordpress.com/2016/01/surf-icon.png' height={230} width={230}></img>
        <br/><br/>
        <p style={{fontWeight: 'bold'}}>Welcome to Surf Playground</p>
      </Col>
    ) : ''}

      </Grid>
    </div>
  )
};

const centered = {
  textAlign: "center",
  align: "center"
}

const offset = {
  // marginLeft: '7%'
}

export default InfoPanel;
