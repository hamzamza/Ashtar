class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 0; i < this.collection.length; i++) {
                if (element[1] < this.collection[i][1]) {
                    this.collection.splice(i, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    }

    dequeue() {
        return this.collection.shift();
    }

    isEmpty() {
        return this.collection.length === 0;
    }

    size() {
        return this.collection.length;
    }
}

class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addNode(node) {
        this.nodes.set(node, new Map());
    }

    addEdge(node1, node2, weight) {
        this.nodes.get(node1).set(node2, weight);
    }

    getNeighbors(node) {
        return this.nodes.get(node);
    }
}

function dijkstra(graph, startNode, endNode) {
    const distances = new Map();
    const previousNodes = new Map();
    const nodes = graph.nodes;
    const unvisitedNodes = new Set(nodes.keys());

    distances.set(startNode, 0);

    while (unvisitedNodes.size > 0) {
        let currentNode = null;
        let shortestDistance = Infinity;

        for (let node of unvisitedNodes) {
            let distance = distances.get(node);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                currentNode = node;
            }
        }

        if (shortestDistance === Infinity) {
            break;
        }

        unvisitedNodes.delete(currentNode);

        if (currentNode === endNode) {
            break;
        }

        for (let neighbor of graph.getNeighbors(currentNode).keys()) {
            let distanceToNeighbor = distances.get(currentNode) + graph.getNeighbors(currentNode).get(neighbor);

            if (!distances.has(neighbor) || distanceToNeighbor < distances.get(neighbor)) {
                distances.set(neighbor, distanceToNeighbor);
                previousNodes.set(neighbor, currentNode);
            }
        }
    }

    const path = [];
    let currentNode = endNode;

    while (currentNode !== undefined) {
        path.unshift(currentNode);
        currentNode = previousNodes.get(currentNode);
    }

    return path;
}




let graph = new Graph();
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');

graph.addEdge('A', 'B', 3);
graph.addEdge('A', 'C', 1);
graph.addEdge('B', 'C', 2);
graph.addEdge('B', 'D', 4);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'E', 5);
graph.addEdge('D', 'E', 1);

let shortestPath = dijkstra(graph, 'A', 'E');
console.log(shortestPath); // ['A', 'C', 'D', 'E']