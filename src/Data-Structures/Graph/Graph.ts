export class Graph {
	adjacencyMap: {
		[key: string]: Array<string | number>
	}

	constructor() {
		this.adjacencyMap = {}
	}

	addVertex(v: string | number): void {
		this.adjacencyMap[v] = []
	}

	containsVertex(vertex: string | number): boolean {
		return typeof this.adjacencyMap[vertex] !== 'undefined'
	}

	addEdge(v: string | number, w: string | number): boolean {
		let result = false
		if (this.containsVertex(v) && this.containsVertex(w)) {
			this.adjacencyMap[v].push(w)
			this.adjacencyMap[w].push(v)
			result = true
		}

		return result
	}

	printGraph(): void {
		for (const i of Object.keys(this.adjacencyMap)) {
			const values = this.adjacencyMap[i]
			const vertex = values.reduce((acc, str) => (acc += `${str} `), '')
			// let vertex = ''
			// for (const j of values) {
			// 	vertex += j + ' '
			// }
			console.log(i + ' -> ' + vertex)
		}
	}

	/**
	 * Prints the Breadth first traversal of the graph from source.
	 *
	 * @param {number} source The source vertex to start BFS.
	 */
	bfs(source: number) {
		const queue: Array<[number, number]> = []
		const visited = new Set<number | string>()
		queue.unshift([source, 0]) // level of source is 0
		visited.add(source)

		while (queue.length) {
			const [node, level] = queue[0]
			queue.shift() // remove the front of the queue
			console.log(`Visited node ${node} at level ${level}.`)

			for (const next of this.adjacencyMap[node]) {
				if (!visited.has(next)) {
					queue.unshift([+next, level + 1]) // level 1 more than current
					visited.add(next)
				}
			}
		}
	}
}

// const example = () => {
// 	const g = new Graph()
// 	g.addVertex(1)
// 	g.addVertex(2)
// 	g.addVertex(3)
// 	g.addVertex(4)
// 	g.addVertex(5)
// 	g.addEdge(1, 2)
// 	g.addEdge(1, 3)
// 	g.addEdge(2, 4)
// 	g.addEdge(2, 5)
// 	console.log('Printing the adjacency list:\n')
// 	g.printGraph()

// 	// perform a breadth first search
// 	console.log('\nBreadth first search at node 1:\n')
// 	g.bfs(1)
// }
// example()
