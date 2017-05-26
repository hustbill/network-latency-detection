var cy = window.cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: false,
  autounselectify: true,

  layout: {
    name: 'dagre'
  },

  style: [
    {
      selector: 'node',
      style: {
        'shape': 'roundrect',
        'width': 'mapData(weight, 40, 80, 20, 60)',
        'content': 'data(id)',
        'text-valign': 'center',
        'text-outline-width': 2,
        'text-outline-color': 'data(faveColor)',
        'background-color': 'data(faveColor)',
        'color': '#fff'
      }
    },

    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'width': 4,
        'line-color': 'red',
        'source-arrow-shape': 'triangle',
        'source-arrow-color': 'red',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': 'red'
      }
    }
  ],

  elements: {
    nodes: [
      { data: { id: 'eth', name: 'George', weight: 85, faveColor: 'steelblue' } },
      { data: { id: 'flannel0', name: 'George', weight: 85, faveColor: '#F5A85D'} },
      { data: { id: 'docker0', label: 'docker0' , name: 'Kramer', weight: 75, faveColor: '#86B342'  } },
      { data: { id: 'veth0', name: 'Elaine', weight: 85, faveColor: '#EDA1ED'  } },
      { data: { id: 'veth1', name: 'Elaine', weight: 85, faveColor: '#EDA1ED'  } },
      { data: { id: 'container2', name: 'container2', weight: 250, faveColor: '#6FB1FC' } },
      { data: { id: 'container3', name: 'container3', weight: 250, faveColor: '#6FB1FC' } },
      { data: { id: 'eth1', label: 'eth', name: 'George', weight: 85, faveColor: 'steelblue' } },
      { data: { id: 'flannel1' , name: 'George', weight: 85, faveColor: '#F5A85D' } },
      { data: { id: 'docker1', name: 'Kramer', weight: 75, faveColor: '#86B342' } },
      { data: { id: 'veth2', name: 'Elaine', weight: 85, faveColor: '#EDA1ED' } },
      { data: { id: 'veth3', name: 'Elaine', weight: 85, faveColor: '#EDA1ED'} },
      { data: { id: 'container12', name: 'container12', weight: 250, faveColor: '#6FB1FC' } },
      { data: { id: 'container13', name: 'container13', weight: 250, faveColor: '#6FB1FC' } },
    ],
    edges: [
      { data: { source: 'flannel0', target: 'eth' } },
      { data: { source: 'docker0', target: 'flannel0', directed: true } },
      { data: { source: 'veth0', target: 'docker0' } },
      { data: { source: 'veth1', target: 'docker0' } },
      { data: { source: 'container3', target: 'veth1' } },
      { data: { source: 'container2', target: 'veth0' } },
      { data: { source: 'flannel1', target: 'eth1' } },
      { data: { source: 'docker1', target: 'flannel1' } },
      { data: { source: 'veth2', target: 'docker1' } },
      { data: { source: 'veth3', target: 'docker1' } },
      { data: { source: 'container13', target: 'veth3' } },
      { data: { source: 'container12', target: 'veth2' } },
    ]
  },
});
