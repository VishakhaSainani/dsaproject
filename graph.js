class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(element, priority) {
    const item = { element, priority };
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const root = this.heap[0];
    const lastNode = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastNode;
      this.bubbleDown(0);
    }

    return root.element;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  bubbleUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (index > 0 && this.heap[index].priority < this.heap[parentIndex].priority) {
      this.swap(index, parentIndex);
      this.bubbleUp(parentIndex);
    }
  }

  bubbleDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestChildIndex = index;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex].priority < this.heap[smallestChildIndex].priority
    ) {
      smallestChildIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex].priority < this.heap[smallestChildIndex].priority
    ) {
      smallestChildIndex = rightChildIndex;
    }

    if (smallestChildIndex !== index) {
      this.swap(index, smallestChildIndex);
      this.bubbleDown(smallestChildIndex);
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}










class Graph {
    constructor() {
        //nodes property is an instance of the Map class, 
        //map is an in built data structure in js that stores key value pairs
      //initializing nodes property as a new map object to store graphs nodes and their corresponding edges

        this.nodes = new Map();
    }
  
    addNode(name) {
      // Add a new node to the graph
      //in map
      //key=name
      //value=empty array for nodes edges
      this.nodes.set(name, []);
    }
  
    addEdge(source, destination, weight) {
      // Add an edge between the source and destination nodes with the given weight
      //getting the array of edges of source and pushing a new object in that array which is having properties node and weight (here of destination)

      this.nodes.get(source).push({ node: destination, weight });
      //since undirected graph
      //doing the same for destination node
      this.nodes.get(destination).push({ node: source, weight });
    }
  
    //calculating shortest path using Dijikstra's algorithm
    //here the two parametere source and destination are the two nodes between whom shortest distance has to be found
    shortestPath(source, destination) {
        //distance map to store shortest node from source node to each node in graph
        const distances = new Map();
        //to keep track of previous node on the shortest path for each node
        const previousNodes = new Map();
        //to store nodes with their distances
        const queue = new PriorityQueue();
        //to process nodes in the irder of their distances from the source node
        // Initialize distances to infinity for all nodes except the source node
        for (const node of this.nodes.keys()) {
          distances.set(node, node === source ? 0 : Infinity);
        }
    
        // Enqueue the source node with a distance of 0
        queue.enqueue(source, 0);
    
        while (!queue.isEmpty()) {
          const currentNode = queue.dequeue();
    
          if (currentNode === destination) {
            // Found the shortest path, reconstruct and return it
            return this.reconstructPath(previousNodes, destination);
          }
    
          const currentNeighbors = this.nodes.get(currentNode);
    
          for (const neighbor of currentNeighbors) {
            const { node, weight } = neighbor;
    
            const currentDistance = distances.get(currentNode);
            const distanceToNeighbor = currentDistance + weight;
    
            if (distanceToNeighbor < distances.get(node)) {
              // Found a shorter path to the neighbor, update distances and previous nodes
              distances.set(node, distanceToNeighbor);
              previousNodes.set(node, currentNode);
              queue.enqueue(node, distanceToNeighbor);
            }
          }
        }
    
        // No path exists from source to destination
        return null;
      }
    
      reconstructPath(previousNodes, destination) {
        const path = [];
        let currentNode = destination;
    
        while (currentNode) {
          path.unshift(currentNode);
          currentNode = previousNodes.get(currentNode);
        }
    
        return path;
      }
  
  }
  
  module.exports = Graph;
  
  

  