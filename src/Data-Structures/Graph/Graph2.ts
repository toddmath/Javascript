export class Graph {
	adjList: Map<string, Array<string>>

	constructor(public noOfVertices: number) {
		this.noOfVertices = noOfVertices
		this.adjList = new Map()
	}

	// functions to be implemented
	// addVertex(v)
	// addEdge(v, w)
	// printGraph()
	// bfs(v)
	// dfs(v)

	addVertex(v: string) {
		this.adjList.set(v, [])
	}

	addEdge(v: string, w: string) {
		if (this.adjList.get(v)) {
			this.adjList.get(v)!.push(w)
		}

		if (this.adjList.get(w)) {
			this.adjList.get(w)!.push(v)
		}
	}

	printGraph() {
		const keys = this.adjList.keys()

		for (const key of keys) {
			const values = this.adjList.get(key)!
			const str = values.reduce((acc, str) => (acc += `${str} `), '')
			console.log(key + ' -> ' + str)
		}
	}

	toString() {
		const keys = this.adjList.keys()
		let str = ''
		for (const key of keys) {
			const values = this.adjList.get(key)!
			const strv = values.reduce((acc, str) => (acc += `${str} `), '')
			str += key + ' -> ' + strv + '\n'
		}
		return str
	}
}
