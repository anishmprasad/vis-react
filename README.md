# vis-react

A React component to display beautiful network graphs using vis.js

Make sure to visit [visjs.org](http://visjs.org) for more info.

Rendered graphs are scrollable, zoomable, retina ready, dynamic, and switch layout on double click.

Due to the imperative nature of vis.js, updating graph properties causes complete redraw of graph and completely porting it to React is a big project itself!

This component takes three vis.js configuration objects as properties:

-   graph: contains two arrays { edges, nodes }
-   options: normal vis.js options as described [here](http://visjs.org/docs/network/#options)
-   events: an object that has [event name](http://visjs.org/docs/network/#Events) as keys and their callback as values

### Installation

```
// with npm
$ npm install vis-react --save

// with yarn
$ yarn add vis-react
```

## Load

To use a component, include the javascript and css files of vis in your root html:

```html
<!DOCTYPE html>
<html>
	<head>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script>
		<link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
		<script type="text/javascript">
			// ... load a visualization
		</script>
	</body>
</html>
```

or load vis.js using require.js. Note that vis.css must be loaded too.

# Usage

```javascript
import Graph from 'vis-react';

var graph = {
	nodes: [
		{ id: 1, label: 'Node 1' },
		{ id: 2, label: 'Node 2' },
		{ id: 3, label: 'Node 3' },
		{ id: 4, label: 'Node 4' },
		{ id: 5, label: 'Node 5' }
	],
	edges: [
		{ from: 1, to: 2 },
		{ from: 1, to: 3 },
		{ from: 2, to: 4 },
		{ from: 2, to: 5 }
	]
};

var options = {
	layout: {
		hierarchical: true
	},
	edges: {
		color: '#000000'
	},
	interaction: { hoverEdges: true }
};

var events = {
	select: function(event) {
		var { nodes, edges } = event;
	}
};

React.render(
	<Graph
		graph={graph}
		options={options}
		events={events}
		style={style}
		getNetwork={this.getNetwork}
		getEdges={this.getEdges}
		getNodes={this.getNodes}
		vis={vis => (this.vis = vis)}
	/>,
	document.body
);
```

Yes, it's really all you need to get started as you can see in this live and interactive demo:

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/3vvy7xqo9m)

### Props

| Name       | Type     | Required | Description     |
| ---------- | -------- | -------- | --------------- |
| graph      | `object` | `true`   | Nodes and Edges |
| options    | `object` | `true`   | Options         |
| events     | `object` | `true`   | Events callback |
| style      | `object` | `false`  | Custom styles   |
| getNetwork | `func`   | `false`  | Network nodes   |
| getNodes   | `func`   | `false`  | All nodes       |
| vis        | `object` | `false`  | vis instance    |

<!-- ### Screenshot

![Preview][screenshot]

[screenshot]: https://raw.githubusercontent.com/anishmprasad/netslider/master/screenshot/Screenshot.png 'Preview screenshot' -->

### Demo

-   [anish.m.prasad.com](https://anishmprasad.com/opensource/vis-react)
-   [anishmprasad.github.io](https://anishmprasad.github.io/opensource/vis-react)
-   [codesandbox.io](https://codesandbox.io/embed/3vvy7xqo9m)

### License

MIT
