// <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
// <script src="http://d3js.org/queue.v1.min.js" type="text/javascript"></script>
// <script src="https://unpkg.com/axios/dist/axios.min.js" type="text/javascript"></script>
import d3 from d3;
import queue from d3-queue;
import axios from axios;


function getNodes () {
  const host = 'http://localhost:8086/query?pretty=true&p=root&u=root&db=ican&rpovh=&';
  const q = 'q=SELECT * from nodelist order by time desc limit 12';
  const cmd = host.concat(q);
  return axios.get(cmd)
    .then(function (node) {
      return node.data;
    });
}

function getEdges () {
  const host = 'http://localhost:8086/query?pretty=true&p=root&u=root&db=ican&rpovh=&';
  const q = 'q=SELECT localnode, remotenode, value from nodelatency order by time desc limit 12';
  const cmd = host.concat(q);
  return axios.get(cmd)
    .then(function (edge) {
      return edge.data;
    });
}

function getValues(result) {
  const values = [];
  JSON.parse(JSON.stringify(result), (key, value) => {
    if (key === 'values') {
      values.push(value);
    }
    // console.log(key); // log the current property name, the last is "".
    return value;     // return the unchanged property value.
  });
  return values;
}

function getMatrixData () {
  return axios.all([
    getNodes(),
    getEdges()
  ]).then(function (data) {
    var nodeData = getNodeSeries(getValues(data[0]));
    var edgeData = getEdgeSeries(getValues(data[1]));
    return {
      nodes: nodeData,
      edges: edgeData
    }
  });
}

/*
*  input:  {"2017-05-23T17:13:36.795281541Z", "k8s-node3"", 1 }
*  output: { id: 'k8s-node3'}
*/
function getNodeSeries(values) {
  const rows = [];
  if (values !== null && values.length !== 0) {
    let row = {};
    let i = values[0].length - 1;
    for (; i >= 0; i -= 1) {
      row = {
        id: values[0][i][1]
      };
      rows.push(row);
    }
  }
  return rows;
}

function getEdgeSeries(values) {
  const rows = [];
  if (values !== null && values.length !== 0) {
    let row = {};
    let i = values[0].length - 1;
    for (; i > 0; i -= 1) {
      row = {
        source: values[0][i][1],
        target: values[0][i][2],
        weight: values[0][i][3]
      };
      rows.push(row);
    }
  }
  return rows;
}


function adjacency() {
  // queue()
  // .defer(d3.csv, "nodelist.csv")
  // .defer(d3.csv, "edgelist.csv")
  // .await(function(error, file1, file2) { createAdjacencyMatrix(file1, file2); });
  let nodes = [];
  let edges = [];
  axios.all([
   getNodes(),
   getEdges()
 ]).then(function (data) {
     var nodeData = getNodeSeries(getValues(data[0]));
     var edgeData = getEdgeSeries(getValues(data[1]));
     nodes.push(nodeData);
     edges.push(edgeData);
     createAdjacencyMatrix(nodes,edges);
   }
 );
  function createAdjacencyMatrix(nodeData,edgeData) {
    var nodes = nodeData[0];
    var edges = edgeData[0];
    console.log('createAdjacencyMatrix: nodes, edges');
    console.log(nodes);
    console.log(edges);
    var edgeHash = {};
    for (x in edges) {
      var id = edges[x].source + "-" + edges[x].target;
      edgeHash[id] = edges[x];
    }
    matrix = [];
    //create all possible edges
    for (a in nodes) {
      for (b in nodes) {
        var grid = {id: nodes[a].id + "-" + nodes[b].id, x: b, y: a, weight: 0};
        if (edgeHash[grid.id]) {
          grid.weight = edgeHash[grid.id].weight;
        }
        matrix.push(grid);
      }
    }
    console.log('matrix[0]');
    console.log(matrix[0]);

    d3.select("svg")
    .append("g")
    .attr("transform", "translate(150,150)")
    .attr("id", "adjacencyG")
    .selectAll("rect")
    .data(matrix)
    .enter()
    .append("rect")
    .attr("width", 50)
    .attr("height", 50)
    .attr("x", function (d) {return d.x * 50})
    .attr("y", function (d) {return d.y * 50})
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("fill", function (d) {if (d.weight > 10) return "red"
      else if (d.weight <= 10 && d.weight >= 0.5) {
        return "yellow"
      }
      else {
        return "green"
      }
    })
    .on("mouseover", gridOver)

    var scaleSize = nodes.length * 50;
    var nameScale = d3.scale.ordinal().domain(nodes.map(function (el) {return el.id})).rangePoints([0,scaleSize],1);

    xAxis = d3.svg.axis().scale(nameScale).orient("top").tickSize(4);
    yAxis = d3.svg.axis().scale(nameScale).orient("left").tickSize(4);
    d3.select("#adjacencyG").append("g").call(xAxis).selectAll("text").style("text-anchor", "end").attr("transform", "translate(-10,-10) rotate(90)");
    d3.select("#adjacencyG").append("g").call(yAxis);
  }
    function gridOver(d,i) {
      d3.selectAll("rect").style("stroke-width", function (p) {return p.x == d.x || p.y == d.y ? "1.5px" : "1px"})
    }
  }
}
