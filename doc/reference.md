# Reference

## Basic CSV Parsing
[Basic CSV Parsing](http://bl.ocks.org/enjalot/1525346)

##  Network Data Visualization graph using SigmaJS

### Rendering a basic network graph
 work with a static JSON file that represents a small abstract network. The JSON file will be constructed so that it works out of the box with the SigmaJS JSON Parser class.
- [sigmajs_example](http://www.tweetegy.com/2014/07/network-data-visualization-graph-using-sigmajs/)  
- [A Simple d3 Network Graph](http://bl.ocks.org/jose187/4733747)

```code
# index.html

<!DOCTYPE html>
<meta charset="utf-8">
<script src="http://d3js.org/d3.v2.min.js?2.9.3"></script>
<style>

.link {
  stroke: #aaa;
}

.node text {
stroke:#333;
cursos:pointer;
}

.node circle{
stroke:#fff;
stroke-width:3px;
fill:#555;
}

</style>
<body>
<script>

var width = 960,
    height = 500

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(.05)
    .distance(100)
    .charge(-100)
    .size([width, height]);

d3.json("graphFile.json", function(json) {
  force
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link")
    .style("stroke-width", function(d) { return Math.sqrt(d.weight); });

  var node = svg.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

  node.append("circle")
      .attr("r","5");

  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});

</script>

# graphFile.json#

{
  "nodes":[
		{"name":"node1","group":1},
		{"name":"node2","group":2},
		{"name":"node3","group":2},
		{"name":"node4","group":3}
	],
	"links":[
		{"source":2,"target":1,"weight":1},
		{"source":0,"target":2,"weight":3}
	]
}
```
