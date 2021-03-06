import React from 'react';
import * as d3 from 'd3';
import InfoPanel from './InfoPanel';
import Surch from '../Surch/Surch';
import InitialSelect from './InitialSelect'
import SelectStructure from './Structures/SelectStructure';
import AddNodeTree from './Structures/AddNodeTree';
import AddNodeScatter from './Structures/AddNodeScatter';
import ReplyToComment from '../Sections/ReplyToComment';
import ReplyButton from '../Sections/ReplyButton';
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
      display: '',
      structure: '',
      setTree: false,
      showTooltip: false,
      tooltipPosition: {},
      likedComment: false,
      infoType: 'panel',
      initial: true
    }
    this.generateCharts = this.generateCharts.bind(this);
    this.applySurchCb = this.applySurchCb.bind(this);
    this.infoPanelCallback = this.infoPanelCallback.bind(this);
    this.resetSurchCb = this.resetSurchCb.bind(this);
    this.addTreeNodeCallback = this.addTreeNodeCallback.bind(this);
    this.addcollectionNodeCallback = this.addcollectionNodeCallback.bind(this);
    this.selectStructureCb = this.selectStructureCb.bind(this);
  }

  componentDidMount() {
    this.setState({
      nodes: initialNodes.nodes,
      nodesLibrary: initialNodes.nodes,
      structure: 'collection'
    }, this.dimensionalLinks)
  }

  componentWillReceiveProps() {
    // console.log('PROPS IN VIZPANEL', this.props.settings)
    window.clearInterval();
    var info = this.props.settings.info || 'panel'
    this.setState({
      infoType: info
    }, () => console.log('info type in viz', this.state.infoType))
    setTimeout(() => this.generateCharts(), 100)
  }

  generateCharts(alpha) {
    var that = this;
    d3.select('#canvas').selectAll('svg').remove();

    var width = 880,
        height = 700

    var svg = d3.select("#canvas").append("svg")
        .attr("width", width)
        .attr("height", height);

    var linkDistance = this.props.settings.linkDistance|| 230;
    var circleSize = this.props.settings.circleSize || 30;
    var nodesNum = this.props.settings.nodesNumber || 7;
    var roles = this.props.settings.roles || ['primary', 'secondary'];
    var label = this.props.settings.label || 'text';
    var alpha = this.props.settings.slippery || alpha || 0.5
    var showMotion = this.props.settings.motion || 'false'
    var speed = this.props.settings.motionSpeed || 1000;
    var primaryC = this.props.settings.primaryColor || '#241587';
    var secC = this.props.settings.secondaryColor || '#3f88a3';

    var sim = d3.forceSimulation(this.state.nodesLibrary)
    .force("charge", d3.forceManyBody().strength(-150))

    .force("link", d3.forceLink(this.state.linksLibrary)
      .distance( (d) => {
        if (this.state.structure === 'collection') {
          if (this.state.initial) return 350
          else {
            linkDistance*=1.05;
            return d.value > 0 ? linkDistance/(d.value+1): linkDistance;
          }
        }
        if (this.state.structure === 'tree') {
          // linkDistance = 250;
          return d.value > 0 ? linkDistance/(d.value) : linkDistance;
        }
      })
      )

    .force("center", d3.forceCenter(width/2 + 60, height/2 + 20))
    .force("gravity", d3.forceManyBody().strength(-50))
    .force('collision', d3.forceCollide().radius(function(d) {
      return circleSize
    }))
    .force("size", d3.forceManyBody([width, height]));
    // setInterval(this.linkDistanceMotion, 330)
    // setInterval(function(){sim.force.alpha(0.1);},250);
    // d3.forceCenter([width/2, height/2])
    if (showMotion === 'true') {
      clearInterval(movement);
      var movement = setInterval(function(){
        var randNum = Math.floor(Math.random()*100)/100;
        console.log('random number', randNum);
        sim.alpha(randNum).restart();
      }, speed);
    }


    var link = svg.selectAll(".link").data(this.state.linksLibrary).enter()
        .append("line")
        .attr("class", (d) => `link ${d.source.name.split(' ').join('')} ${d.target.name.split(' ').join('')}`)
        .attr("stroke-width", (d) => this.state.structure === 'tree' ? d.value*3 : d.value*10)

        // .attr("height", (d) => d.value/2)
          // .call(force.drag);
          $('.link').toggle();

    link.on("click", (d) => {
        console.log('selected link', d);

        this.setState({
          display: 'link',
          selectedLink: d
        })

      })
      .on('mouseover', d => {
        this.setState({
          display: 'link',
          selectedLink: d
        })
      })

var node = svg.selectAll(".node").data(this.state.nodesLibrary).enter()
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

var colors = {
  0: '#424874',
  1: '#6D435A',
  2: '#4E598C',
  3: '#0C6291',
  4: '#5C6672',
  5: '#3A435E'
}

  node.append("circle")
      .attr("r", d => d.parent === null ? circleSize*2 : this.state.initial ? circleSize*1.5 : circleSize)
      .attr("fill", d => d.level ? colors[d.level] : colors[Math.floor(Math.random()*6)] )
      .attr("class", (d) => `${d.name} node`)
      .style("box-shadow", "10px 10px 5px #888888")

  node.append("text")
      .attr("dx", -14)
      .attr("dy", ".70em")
      .text(function(d) { return d.name })
      .style("font-size", "14px")
      .style("fill", "#e0e0e0")
      .attr("class", (d) => `${d.name}`);


    node.on('click', d => {
      if (this.state.initial) {
          this.selectStructureCb(d.name.toLowerCase())
      } else {
        let node = d.name;
        var relatedLinks = this.state.linksLibrary.filter(link => {
          // console.log('LINK', link)
          return link.source.name === node || link.target.name === node;
        })

        // $(`.${artist.split(' ').join('')}`).css('display', 'inline');
        $('.link').css('display', 'none')
        $(`.${node.split(' ').join('')}.link`).toggle();
        var position = that.getTooltipPosition(d)
        this.setState({
          selectedNode: d,
          display: 'node',
          links: relatedLinks,
          showTooltip: true,
          tooltipPosition: position
        }, () => {
          console.log('node in state', this.state.selectedNode)
          // this.generateCharts();
        })
      }
    })
    .on('mouseover', (d) => {
      this.setState({
        selectedNode: d,
        display: 'node'
      })
    })

      sim.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) {
                  var xcoord = d.x > width / 2 ? Math.min(d.x, width-circleSize) : Math.max(circleSize+20, d.x+20);
                  var ycoord = d.y > height / 2 ? Math.min(d.y-30, height-(circleSize+30)) : Math.max(circleSize, d.y);
                  return "translate(" + xcoord + "," + ycoord + ")"; });
      });

      if (this.state.structure === 'tree' && !this.state.setTree) {
        setTimeout(() => {
          this.generateCharts(0.3)
          this.setState({
            setTree: true
          })
        }, 300)
      }
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

  addcollectionNodeCallback(node) {
    var newNode = {
      name: node.name,
      age: +node.age,
      weight: +node.weight,
      height: +node.height
    };
    var allNodes = this.state.nodesLibrary;
    allNodes.push(newNode);
    this.setState({
      nodes: allNodes,
      nodesLibrary: allNodes
    }, this.dimensionalLinks)
  }

  addTreeNodeCallback(name, role) {
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

  selectStructureCb(val) {
    console.log('VAL', val)
    var mapping = {
      'tree': JSONtree.nodes,
      'collection': JSONcollection.nodes,
      'custom': JSONcustom.nodes
    }
    var selectedNodes = mapping[val]
    console.log('selected nodes', selectedNodes)
    this.setState({
      structure: val,
      nodes: selectedNodes,
      nodesLibrary: selectedNodes,
      initial: false,
      selectedNode: selectedNodes[0]
    }, () => {
      console.log('structure selected', this.state)
      this.props.passNodesInViz(selectedNodes)
      this.state.structure === 'collection' ? this.dimensionalLinks() : this.state.structure === 'custom' ? null :this.treeLinks();
    })
  }

  dimensionalLinks = () => {
    var selectedNodes = this.state.nodes;
    var boundariesObj = {
      height: [1000, 0, 0],
      weight: [1000, 0, 0],
      age: [100, 0, 0]
    }
    var boundariesKeys = Object.keys(boundariesObj);
    selectedNodes.reduce((acc, curr, i) => {
      boundariesKeys.forEach(key => {
      if (curr[key] < acc[key][0]) {
        acc[key][0] = curr[key];
        acc[key][2] = acc[key][1]-acc[key][0]
      }
      if (curr[key] > acc[key][1]) {
        acc[key][1] = curr[key];
        acc[key][2] = acc[key][1]-acc[key][0]
      }
      })
      return acc;
    }, boundariesObj)

    var links = selectedNodes.reduce((acc, curr, ind) => {
      var node = curr;
      for (let i = ind+1; i < selectedNodes.length; i++) {
        let otherNode = selectedNodes[i];
        var varObj = {source: ind, sourceName: curr.name,
          target: i, targetName: selectedNodes[i].name,
          params: {}
        }
        boundariesKeys.forEach(key => {
          varObj.params[key] = Math.pow(((boundariesObj[key][2] - (Math.abs(node[key]-otherNode[key])))/boundariesObj[key][2]), 2)
        })
        acc.push(varObj)
      }
      return acc;
    }, [])

    var weights = {
      height: 1,
      weight: 1,
      age: 1
    }

    links.forEach(link => {
      link['value'] = boundariesKeys.reduce((acc, key) => {
        acc+=(link.params[key]*weights[key]); return acc;
      }, 0)/boundariesKeys.length
    })
    console.log('LINKS', links)
    this.setState({
      links: links,
      linksLibrary: links
    }, () => {
      this.generateCharts()
      this.props.passNodesInViz(this.state.nodes)
    })
  }

  treeLinks = () => {
    var originalNodes = this.state.nodes.slice();
    this.props.passNodesInViz(originalNodes)
    var nodesNames = originalNodes.reduce((acc, curr) => {acc.push(curr.id); return acc;}, [])
    var nodes = originalNodes.reduce((acc, curr) => {
      if (curr.children.length > 0) {
        var copyOfChildren = curr.children.slice()
        curr.children = copyOfChildren.map(child => {
          let childId = child;
          let indOfChild = nodesNames.indexOf(child);
          let childObj = originalNodes[indOfChild];
          return childObj
        })
      }
      if (curr.parent !== null) {
        let parentId = curr.parent;
        let indOfParent= nodesNames.indexOf(parentId);
        let parentObj = originalNodes[indOfParent];
        curr.parent = parentObj
      }
      acc.push(curr);
      return acc;
    }, [])
    console.log('NODES WITH CHILDREN OBJ', nodes);
    var links = nodes.reduce((acc, curr, ind) => {
      if (curr.children.length > 0) {
        curr.children.forEach((child, i) => {
          let tempLinkObj = { source: curr.id, target: child.id, value: (1+child.likes/3 || 1) }
          acc.push(tempLinkObj)
        })
      }
      return acc;
    }, [])
    console.log('TREE LINKS', links)
    this.setState({
      links: links,
      linksLibrary: links
    }, () => {
      this.generateCharts()
    })
  }

  replyToCommentCallback = (comment, reply, weight) => {
    comment = comment || this.state.selectedNode;
    let newId = this.state.nodesLibrary.length;
    let newReplyObj = { id: newId, name: reply, level: comment.level+1, children: [], parent: comment.id , author: "User", likes: weight || 1, index: newId };
    let updatedComments = this.state.nodesLibrary.slice()
    updatedComments.push(newReplyObj);

    let tempLinkObj = { source: comment, target: newReplyObj, value: 1 }
    var newLinks = this.state.linksLibrary.slice();
    newLinks.push(tempLinkObj);

    this.setState({
      nodes: updatedComments,
      nodesLibrary: updatedComments,
      links: newLinks,
      linksLibrary: newLinks,
      showCommentEntry: false,
      showTooltip: false
    }, this.generateCharts)
  }

  showReplyCallback = () => {
    this.setState({
      showTooltip: false,
      showCommentEntry: true
    })
  };

  handleCancel = () => {
    this.setState({
      showCommentEntry: false
    })
  };

  getTooltipPosition = (d) => {
    console.log('NODE TO GET POSITION OF', d)
    var newLeft = (parseInt(d.x)-5).toString()+'px';
    var newTop = (parseInt(d.y)).toString()+'px';
    var outputObj = {
      position: 'absolute',
      left: newLeft,
      top: newTop
    }
    console.log('OUTPUT OBJ', outputObj)
    return outputObj;
  };

  render() {
    return (
        <Grid fluid={true}>

          <Row>

            <Col md={9} className="show-grid">
              <div id='canvas' style={border}>
                {this.state.initial ? <InitialSelect /> : ''}
              </div>
            </Col>

            <Col md={3} style={border}>

              { this.state.infoType === 'panel' && !this.state.initial ? (
                <Row className="show-grid">
                  <InfoPanel selectedNode={this.state.selectedNode} selectedLink={this.state.selectedLink}
                    display={this.state.display} nodes={this.state.nodes} links={this.state.linksLibrary}
                    infoPanelCallback={this.infoPanelCallback} structure={this.state.structure} replyToCommentCallback={this.replyToCommentCallback}
                    />
                </Row>
              ) : ''}

              <Row>
                {this.state.infoType === 'panel' && this.state.structure === 'tree' && !this.state.initial ? (
                  <AddNodeTree replyToCommentCallback={this.replyToCommentCallback} selectedNode={this.state.selelctedNode} show={this.state.showTooltip}/>
                ) : ''}

                { (this.state.structure === 'collection' || this.state.structure === 'custom') && !this.state.initial ? (
                  <AddNodeScatter addcollectionNodeCallback={this.addcollectionNodeCallback}/>
                ) : ''}

                {/* this.state.structure === '' ? (
                  <SelectStructure selectStructureCb={this.selectStructureCb}/>
                ) : '' */}

              </Row>

              {this.state.infoType === 'panel' && !this.state.initial ? (
                <Row className="show-grid">
                  <Surch allNodes={this.state.nodesLibrary} applySurchCb={this.applySurchCb} reset={this.resetSurchCb}/>
                </Row>
              ) : ''}

            </Col>

          </Row>
          {this.state.infoType === 'tooltip' && this.state.showTooltip ? (
            <ReplyButton parent={this.state.selectedNode} style={this.state.tooltipPosition} showReplyCallback={this.showReplyCallback} likeCommentCallback={this.likeCommentCallback}/>
          ) : ''}
          {this.state.infoType === 'tooltip' && this.state.showCommentEntry ? (
            <ReplyToComment parent={this.state.selectedNode} replyToCommentCallback={this.replyToCommentCallback} style={this.state.tooltipPosition} handleCancel={this.handleCancel}/>
          ) : ''}
        </Grid>
    )
  }

};

const border = {
  // border: 'solid black 1px'
}

const initialNodes = {
  "nodes": [
    { "name": "Collection", "height": 100, "weight": 50, "age": 22 },
    { "name": "Tree", "height": 100, "weight": 50, "age": 22 },
    { "name": "Custom", "height": 103, "weight": 57, "age": 22 }
  ],
  "type": "collection"
}

const JSONtree = {
  "nodes": [
  { id: 0, name: 'A', level: 0, children: [1, 2, 3], parent: null, likes: 2, author: 'BeagleBob7', url: "http://www.animalgenetics.us/images/canine/Beagle4.jpg"},
  { id: 1, name: 'B', level: 1, children: [ 4, 5 ], parent: 0, likes: 0, author: "catnip47" },
  { id: 2, name: 'C', level: 1, children: [ 6 ], parent: 0, likes: 3, author: "jackrabbit5" },
  { id: 3, name: 'D', level: 1, children: [ 7 ], parent: 0, likes: 2, author: "meanstack91" },
  { id: 4, name: 'E', level: 2, children: [ 8 ], parent: 1, likes: 1, author: "hooplahadup" },
  { id: 5, name: 'F', level: 2, children: [], parent: 1, likes: 0, author: "bballoo" },
  { id: 6, name: 'G', level: 2, children: [ 9 ], parent: 2, likes: 0, author: "timpumbo" },
  { id: 7, name: 'H', level: 2, children: [], parent: 3, likes: 2, author: "skrrrttt88" },
  { id: 8, name: 'I', level: 3, children: [], parent: 4, likes: 1, author: "lil uzi horizont" },
  { id: 9, name: 'J', level: 3, children: [], parent: 6 , likes: 0, author: "bathtub gin"} ],
  "type":"tree"
}

const JSONcollection = {
  "nodes": [
    { "name": "Alice", "height": 160, "weight": 50, "age": 23 },
    { "name": "Bob", "height": 180, "weight": 70, "age": 31 },
    { "name": "Carnot", "height": 163, "weight": 47, "age": 25 },
    { "name": "Dev", "height": 175, "weight": 80, "age": 40 },
    { "name": "Euler", "height": 170, "weight": 67, "age": 35 }
  ],
  "type": "collection"
}

const JSONcustom = {
  "nodes": [
    { "name": "A1", "height": 160, "weight": 50, "age": 23 },
  ],
  "type": "collection"
}


export default VizPanel;
