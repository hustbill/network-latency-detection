
# round 1 data
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelatency,localnode="k8s-node3",remotenode="k8s-node3"  value=0.09'
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelatency,localnode="k8s-node2",remotenode="k8s-node3"  value=0.88'
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelatency,localnode="k8s-node2",remotenode="k8s-node2"  value=0.08'
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelatency,localnode="k8s-node1",remotenode="k8s-node1"  value=0.12'
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelatency,localnode="k8s-node1",remotenode="k8s-node2"  value=0.81'
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelatency,localnode="k8s-node1",remotenode="k8s-node3"  value=0.97'


# round 2 data

curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelatency,localnode="k8s-node3",remotenode="k8s-node3"  value=0.12'
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelatency,localnode="k8s-node2",remotenode="k8s-node3"  value=0.94'
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelatency,localnode="k8s-node2",remotenode="k8s-node2"  value=0.08'
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelatency,localnode="k8s-node1",remotenode="k8s-node1"  value=0.10'
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelatency,localnode="k8s-node1",remotenode="k8s-node2"  value=90.75'
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelatency,localnode="k8s-node1",remotenode="k8s-node3"  value=0.76'



