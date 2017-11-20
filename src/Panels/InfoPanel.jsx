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

    {props.display === 'node' && props.structure === 'scatter'? (
      <Row style={textStyle}>
        <Col sm={12} md={12} style={centered}>
          <Row>
            <h2>{props.selectedNode.name}</h2>
          </Row>
          <Row>
            {/*<img src={props.selectedNode.thumbnail} height={150} width={160}/>*/}
          </Row>
          <Row>
            Age: {props.selectedNode.age}
          </Row>
          <Row>
            Height: {props.selectedNode.height}
          </Row>
          <Row>
            Weight: {props.selectedNode.weight}
          </Row>
          <br/><hr/><br/>
          <Row>
            Click node to show links
          </Row>
        </Col>
      </Row>
  ) : ''}

  {props.display === 'node' && props.structure === 'tree'? (
    <Row style={textStyle}>
      <Col sm={12} md={12} style={centered}>
        <Row>
          <h2>Node: {props.selectedNode.name}</h2>
        </Row>
        <Row>
          {/*<img src={props.selectedNode.thumbnail} height={150} width={160}/>*/}
        </Row>
        {props.selectedNode.parent !== null ? (
          <Row>
            Parent: {props.selectedNode.parent.name}
          </Row>
        ) : ''}
        <hr/>
        <Row>
          Children:
        </Row>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
          <ListGroup>
          {props.selectedNode.children.map((child, i) => (
            <ListGroupItem key={i} style={initialPlaygroundStyle}>
              {child.name}
            </ListGroupItem>
          ))}
          </ListGroup>
          </Col>
          <Col md={2}></Col>
        </Row>
        <Row>
          Weight: {props.selectedNode.likes}
        </Row>
        <br/><hr/><br/>
        <Row>
          Click node to show links
        </Row>
      </Col>
    </Row>
) : ''}

    {props.display === 'link' && props.structure === 'scatter'? (
        <Row className="show-grid" style={textStyle}>
          <Col sm={6} md={6} className='artist1' style={centered}>
            <Row>
              {props.selectedLink.source.name}
            </Row>
            {/*<Row>
              <img src={props.selectedLink.source.thumbnail} height={150} width={160}/>
            </Row>*/}
            <Row>
              Age: {props.selectedLink.source.age}
            </Row>
            <Row>
              Height: {props.selectedLink.source.height}
            </Row>
            <Row>
              Weight: {props.selectedLink.source.weight}
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
              Age: {props.selectedLink.target.age}
            </Row>
            <Row>
              Height: {props.selectedLink.target.height}
            </Row>
            <Row>
              Weight: {props.selectedLink.target.weight}
            </Row>

          </Col>

          <Row>
            Similarity: {Math.floor(props.selectedLink.value*100)}%
          </Row>

        </Row>
    ) : ''}

    {props.display === 'link' && props.structure === 'tree'? (
        <Row className="show-grid" style={textStyle}>
          <Col sm={6} md={6} className='artist1' style={centered}>
            <Row>
              Parent: {props.selectedLink.source.name}
            </Row>
          </Col>
          <Col sm={6} md={6} className='artist2' style={centered}>
            <Row>
              Child: {props.selectedLink.target.name}
            </Row>
          </Col>
          <Row>
            Weight: {props.selectedLink.target.likes}
          </Row>

        </Row>
    ) : ''}

    {props.display === '' ? (
      <Col md={12}>
        <br/>
        <img src='https://coconutgirlwireless.files.wordpress.com/2016/01/surf-icon.png' height={230} width={230}></img>
        <br/>
        <p style={{fontWeight: 'bold'}}>Welcome to Surf Playgrounds</p>
        <p style={initialPlaygroundStyle}>To begin, select a data structure below</p>
      </Col>
    ) : ''}

      </Grid>
    </div>
  )
};

const initialPlaygroundStyle = {
  fontSize: '14px'
}

const textStyle = {
  fontSize: '18px'
}

const centered = {
  textAlign: "center",
  align: "center"
}

const offset = {
  // marginLeft: '7%'
}

export default InfoPanel;
