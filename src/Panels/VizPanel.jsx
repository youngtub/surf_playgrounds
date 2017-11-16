import React from 'react';
import * as d3 from 'd3';
import InfoPanel from './InfoPanel';
import Surch from '../Surch/Surch';
import AddNode from './AddNode'
import {Grid, Row, Col} from 'react-bootstrap';
import $ from 'jquery';
import axios from 'axios';
import {Tooltip} from 'antd';

class VizPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // jsonObj: {},
      nodes: [],
      links: [],
      nodesLibrary: [],
      linksLibrary: [],
      selectedNode: {},
      selectedLink: {},
      display: ''
    }
    this.generateCharts = this.generateCharts.bind(this);
    this.applySurchCb = this.applySurchCb.bind(this);
    this.infoPanelCallback = this.infoPanelCallback.bind(this);
    this.resetSurchCb = this.resetSurchCb.bind(this);
    this.addNodeCallback = this.addNodeCallback.bind(this);
  }

  componentDidMount() {
    //axios call to db

    this.setState({
      // jsonObj: jsonData,
      nodes: jsonData.nodes,
      nodesLibrary: jsonData.nodes,
      links: jsonData.links,
      linksLibrary: jsonData.links
    }, () => {
      this.generateCharts();
      // setInterval(() => this.linkDistanceMotion(), 3000)
    });

  };

  componentWillReceiveProps() {
    // console.log('PROPS IN VIZPANEL', this.props.settings)
    window.clearInterval();
    setTimeout(() => this.generateCharts(), 100)
  }

  generateCharts() {
    var that = this;
    d3.select('#canvas').selectAll('svg').remove();

    var width = 880,
        height = 700

    var svg = d3.select("#canvas").append("svg")
        .attr("width", width)
        .attr("height", height);

    var linkDistance = this.props.settings.linkDistance|| 200;
    var circleSize = this.props.settings.circleSize || 30;
    var nodesNum = this.props.settings.nodesNumber || 7;
    var roles = this.props.settings.roles || ['primary', 'secondary'];
    var label = this.props.settings.label || 'text';
    var alpha = this.props.settings.slippery || 0.5
    var showMotion = this.props.settings.motion || 'false'
    var speed = this.props.settings.motionSpeed || 1000;
    var primaryC = this.props.settings.primaryColor || '#241587';
    var secC = this.props.settings.secondaryColor || '#3f88a3';

    var limitedNodes = this.state.nodes.filter((artist, i) => {
      return i < nodesNum;
    })

    var limitedNodesIds = limitedNodes.reduce((acc, curr) => {
      acc.push(curr.id); return acc;
    }, [])
    var limitedLinks = this.state.linksLibrary.filter((link, i) => {
      // console.log('link this time', link.source)
      return limitedNodesIds.includes(link.source.id) && limitedNodesIds.includes(link.target.id) || limitedNodesIds.includes(link.source) && limitedNodesIds.includes(link.target)
    })
    // console.log('LTDLINKS', limitedLinks)
    var sim = d3.forceSimulation(limitedNodes)
    .force("charge", d3.forceManyBody().strength(-100))

    .force("link", d3.forceLink(this.state.links)
      .distance( (d) => {
        return d.value > 0 ? linkDistance/(d.value*1.5) : linkDistance*1.5;
      })
      )

    .force("center", d3.forceCenter(width/2, height/2))
    // .force("gravity", d3.forceManyBody().strength(-50))
    // .force('collision', d3.forceCollide().radius(function(d) {
    //   return 30
    // }))
    .force("size", d3.forceManyBody([width, height]));
    // setInterval(this.linkDistanceMotion, 330)
    // setInterval(function(){sim.force.alpha(0.1);},250);

    if (showMotion === 'true') {
      clearInterval(movement);
      var movement = setInterval(function(){
        var randNum = Math.floor(Math.random()*100)/100;
        console.log('random number', randNum);
        sim.alpha(randNum).restart();
      }, speed);
    }


    var link = svg.selectAll(".link").data(limitedLinks).enter()
        .append("line")
        .attr("class", (d) => `link ${d.source.name.split(' ').join('')} ${d.target.name.split(' ').join('')}`)
        .attr("stroke-width", (d) => d.value*3);

        // .attr("height", (d) => d.value/2)
          // .call(force.drag);
          $('.link').toggle();

    link.on("click", (d) => {
        console.log('selected link', d);

        this.setState({
          display: 'link',
          selectedLink: d
        })
      });

var node = svg.selectAll(".node").data(limitedNodes).enter()
    .append("g").attr("class", "node")
    .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
    );

function dragstarted() {
  if (!d3.event.active) sim.alphaTarget(0.3).restart();
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
}

function dragged() {
  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;
}

function dragended() {
  if (!d3.event.active) sim.alphaTarget(0.1);
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
}

  node.append("circle")
      .attr("r", d => d.role === 'primary' ? circleSize*1.5 : circleSize)
      .attr("fill", function(d) { return d.role === 'primary' ? primaryC : secC })
      .attr("class", (d) => `${d.role} ${d.name} node`)
      .style("box-shadow", "10px 10px 5px #888888")

  node.append("text")
      .attr("dx", -3).attr("dy", ".70em")
      .text(function(d) { return d.name })
      .style("font-size", "14px")
      .style("fill", "#e0e0e0")
      .attr("class", (d) => `${d.role} ${d.name}`);

//attempt at tooptip
  node.append('text')
      .attr("dx", -20).attr("dy", "1.70em")
      .text('sample tooltip')
      .style("z-index", "1000")
      .attr("class", (d) => `${d.name + 't'} tooltip`)
      .style("font-size", "14px")
      .style("fill", "black")
      .style('visibility', 'hidden')

    node.on('click', d => {
      let node = d.name;
      var relatedLinks = this.state.linksLibrary.filter(link => {
        // console.log('LINK', link)
        return link.source.name === node || link.target.name === node;
      })

      // $(`.${artist.split(' ').join('')}`).css('display', 'inline');
      $('.link').css('display', 'none')
      $(`.${node.split(' ').join('')}.link`).toggle();

      this.setState({
        selectedNode: d,
        display: 'node',
        links: relatedLinks
      }, () => {
        console.log('node in state', this.state.selectedNode)
        // this.generateCharts();
      })
    })
    .on('mouseover', (d) => $(`.tooltip.${d.name + 't'}`).css({visibility: 'visible'}) )
    .on('mouseout', (d) => $(`.tooltip.${d.name + 't'}`).css('visibility', 'hidden') )

      sim.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
      });

  };

  applySurchCb(surchArr) {
    // console.log('surch array', surchArr)
    var filteredArtistsArray = this.state.nodesLibrary.filter(artist => {
      return surchArr.includes(artist.name);
    });

    var filteredLinksArray = this.state.linksLibrary.filter(link => {
      if (surchArr.length === 1) {
        return false;
      } else {
        return surchArr.includes(link.source.name) && surchArr.includes(link.target.name);
      }
    })
    this.setState({
      nodes: filteredArtistsArray,
      links: filteredLinksArray
    }, () => {
      console.log('state in viz panel', this.state)
      this.generateCharts()
    })
  };

  resetSurchCb() {
    this.setState({
      nodes: this.state.nodesLibrary,
      links: this.state.linksLibrary
    }, () => {
      this.generateCharts();
    })
  }

  infoPanelCallback(name) {
    var newSelectedArtist = this.state.artists.filter(artist => artist.name === name)[0];
    var newSongs = this.state.songsLibrary.filter(song => {
      return newSelectedArtist.songs.includes(song.id)
    })
    this.setState({
      selectedArtist: newSelectedArtist,
      display: 'artist',
      songs: newSongs
    }, () => {
      $(`.link`).css('display', 'none');
      $(`.${name.split(' ').join('')}`).css('display', 'inline');
    })
  };

  addNodeCallback(name, role) {
    console.log('name', name);
    console.log('role', role)
    var currentNodes = this.state.nodesLibrary;
    let newNodeObj = { "name": name, "role": role};
    currentNodes.push(newNodeObj);
    let indOfNewNode = currentNodes.length-1;
    var linksToAdd = [];

    if (role === 'primary') {
      linksToAdd = this.state.nodesLibrary.reduce((acc, curr, i) => {
        if (curr.role === 'secondary') {
          let newLinkObj = {"source": indOfNewNode, "target": i, "value": 1}
          acc.push(newLinkObj);
        }
        return acc;
      }, []);
    } else {
      linksToAdd = this.state.nodesLibrary.reduce((acc, curr, i) => {
        if (curr.role === 'primary') {
          let newLinkObj = {"source": i, "target": indOfNewNode, "value": 1}
          acc.push(newLinkObj);
        }
        return acc;
      }, [])
    }

    var combinedLinks = this.state.linksLibrary.slice().concat(linksToAdd);
    console.log('NEW NODES', currentNodes);
    console.log('NEW LINKS', combinedLinks)
    this.setState({
      nodes: currentNodes,
      nodesLibrary: currentNodes,
      links: combinedLinks,
      linksLibrary: combinedLinks
    }, this.generateCharts)
  }

  render() {
    return (
        <Grid fluid={true}>

          <Row>

            <Col md={9} className="show-grid">
              <div id='canvas' style={border}></div>
            </Col>

            <Col md={3} style={border}>

              <Row className="show-grid">
                  <InfoPanel selectedNode={this.state.selectedNode} selectedLink={this.state.selectedLink}
                    display={this.state.display} nodes={this.state.nodes} links={this.state.linksLibrary}
                    infoPanelCallback={this.infoPanelCallback}
                    />
              </Row>

              <Row>
                <AddNode addNodeCallback={this.addNodeCallback}/>
              </Row>

              <Row className="show-grid">
                  <Surch allNodes={this.state.nodesLibrary} applySurchCb={this.applySurchCb} reset={this.resetSurchCb}/>
              </Row>

            </Col>

          </Row>

        </Grid>
    )
  }

};

const border = {
  // border: 'solid black 1px'
}

const jsonData = {
  "nodes": [
    { "name": "A1", "role": "primary" },
    { "name": "B2", "role": "secondary" },
    { "name": "C3", "role": "secondary" },
  ],
  "links": [
    {"source": 0, "target": 1, "value": 1 },
    {"source": 0, "target": 2, "value": 1 }
  ]
}


export default VizPanel;
