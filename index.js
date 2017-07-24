var React = require('react');
var defaultsDeep = require('lodash/fp/defaultsDeep')
var isEqual = require('lodash/isEqual');
var differenceWith = require('lodash/differenceWith');
var vis = require('../vis/vis');
var uuid = require('uuid');

class Graph extends React.Component {
    constructor(props) {
        super(props);
            var identifier = props.identifier;
            this.updateGraph = this.updateGraph.bind(this);
            this.state = {
              identifier: identifier !== undefined ? identifier : uuid.v4()
            };
    }
    componentDidMount() {
      this.edges = new vis.DataSet();
      this.edges.add(this.props.graph.edges);
      this.nodes = new vis.DataSet();
      this.nodes.add(this.props.graph.nodes);
      this.updateGraph();
    }
    shouldComponentUpdate(nextProps, nextState) {
      var nodesChange = !(isEqual)(this.props.graph.nodes, nextProps.graph.nodes);
      var edgesChange = !(isEqual)(this.props.graph.edges, nextProps.graph.edges);
      var optionsChange = !(isEqual)(this.props.options, nextProps.options);
      var eventsChange = !(isEqual)(this.props.events, nextProps.events);

      if (nodesChange) {
        var idIsEqual = function idIsEqual(n1, n2) {
          return n1.id === n2.id;
        };
        var nodesRemoved = (differenceWith)(this.props.graph.nodes, nextProps.graph.nodes, idIsEqual);
        var nodesAdded = (differenceWith)(nextProps.graph.nodes, this.props.graph.nodes, idIsEqual);
        var nodesChanged = (differenceWith)((differenceWith)(nextProps.graph.nodes, this.props.graph.nodes, isEqual), nodesAdded);
        this.patchNodes({ nodesRemoved: nodesRemoved, nodesAdded: nodesAdded, nodesChanged: nodesChanged });
      }
      if (edgesChange) {
        var edgesRemoved = (    differenceWith)(this.props.graph.edges, nextProps.graph.edges, isEqual);
        var edgesAdded = (  differenceWith)(nextProps.graph.edges, this.props.graph.edges, isEqual);
        this.patchEdges({ edgesRemoved: edgesRemoved, edgesAdded: edgesAdded });
      }
      if (optionsChange) {
        this.Network.setOptions(nextProps.options);
      }
      if (eventsChange) {
        var events = this.props.events || {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(events)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var eventName = _step.value;

            this.Network.off(eventName, events[eventName]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        events = nextProps.events || {};
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Object.keys(events)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _eventName = _step2.value;

            this.Network.on(_eventName, events[_eventName]);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
      return false;
    }
 componentDidUpdate() {
      this.updateGraph();
    }
    patchEdges(_ref) {
      var edgesRemoved = _ref.edgesRemoved,
          edgesAdded = _ref.edgesAdded;

      this.edges.remove(edgesRemoved);
      this.edges.add(edgesAdded);
    }
 patchNodes(ref) {
      var nodesRemoved = ref.nodesRemoved,
          nodesAdded = ref.nodesAdded,
          nodesChanged = ref.nodesChanged;

      this.nodes.remove(nodesRemoved);
      this.nodes.add(nodesAdded);
      this.nodes.update(nodesChanged);
    }
  updateGraph() {
      var container = document.getElementById(this.state.identifier);
      var defaultOptions = {
        physics: {
          stabilization: false
        },
        autoResize: false,
        edges: {
          smooth: false,
          color: '#000000',
          width: 0.5,
          arrows: {
            to: {
              enabled: true,
              scaleFactor: 0.5
            }
          }
        }
      };
      // merge user provied options with our default ones
      var options = (defaultsDeep)(defaultOptions, this.props.options);
      this.Network = new vis.Network(container, Object.assign({}, this.props.graph, {
        edges: this.edges,
        nodes: this.nodes
      }), options);

      if (this.props.getNetwork) {
        this.props.getNetwork(this.Network);
      }
      // Add user provied events to network
      var events = this.props.events || {};
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;
      try {
        for (var _iterator3 = Object.keys(events)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var eventName = _step3.value;

          this.Network.on(eventName, events[eventName]);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
    render() {
      var identifier = this.state.identifier;
      var style = this.props.style;

      return React.createElement('div', {
        id: identifier,
        style: style
      }, identifier);
    }
}
// export default Graph;
module.exports = Graph;
