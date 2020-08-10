import { Graph } from './Graph2'

describe('Graph2', () => {
	test('should add edges and vertices correctly', () => {
		const graph = new Graph(6)

		const vertices = ['A', 'B', 'C', 'D', 'E', 'F']
		vertices.forEach((vert) => graph.addVertex(vert))

		graph.addEdge('A', 'B')
		graph.addEdge('A', 'D')
		graph.addEdge('A', 'E')
		graph.addEdge('B', 'C')
		graph.addEdge('D', 'E')
		graph.addEdge('E', 'F')
		graph.addEdge('E', 'C')
		graph.addEdge('C', 'F')

		// prints all vertex and
		// its adjacency list
		// A -> B D E
		// B -> A C
		// C -> B E F
		// D -> A E
		// E -> A D F C
		// F -> E C

		expect(graph.toString()).toMatch(/A -> B D E/)
		expect(graph.toString()).toMatch(/B -> A C/)
		expect(graph.toString()).toMatch(/C -> B E F/)
		expect(graph.toString()).toMatch(/D -> A E/)
		expect(graph.toString()).toMatch(/E -> A D F C/)
		expect(graph.toString()).toMatch(/F -> E C/)
	})
})
