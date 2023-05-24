const express = require('express');
const Graph = require('./graph');
const bodyParser = require("body-parser");

//app.use(express.static('DSA PROJECT'));
const app = express();
const port = 3000;
const graph = new Graph();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('scripts'))
// var origin = document.getElementById("origin").value;
//var destination = document.getElementById("destination").value;
// const query=req.body;


// Add nodes to the graph
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');

if (graph.nodes.has('A') && graph.nodes.has('B')) {
  graph.addEdge('A', 'B', 10);
  graph.addEdge('B', 'A', 10);
  graph.addEdge('A', 'C', 20);
  graph.addEdge('C', 'A', 20);
  graph.addEdge('C', 'B', 5);
  graph.addEdge('B', 'C', 5);
}
// Add edges to the graph
// graph.addEdge('A', 'B', 10);
// graph.addEdge('B', 'C', 5);
// Add more edges
// Define a route to calculate the shortest path
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// app.get('/calculate_path', (req, res) => {
//   const source = req.query.origin; // Get the source node from the query parameters
//   const destination = req.query.destination; // Get the destination node from the query parameters

//   // Calculate the shortest path using the graph's shortestPath method
//   // const shortestPath = graph.shortestPath(source, destination);

//   // if (shortestPath) {
//   //   res.send(shortestPath);
//   // } else {
//   //   res.status(404).send("No path exists from source to destination.");
//   // }
// });

app.get('/calculate_path', function (req, res) {
  const { origin, destination } = req.query;
  // Calculate the shortest path using the graph's shortestPath method
  const shortestPath = graph.shortestPath(origin, destination);
  if (shortestPath) {
    res.send(shortestPath);
  } else {
    res.status(404).send("No path exists from source to destination.");
  }
});

// Add more routes as needed
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




