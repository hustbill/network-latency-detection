
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelist,name="k8s-node1"  value=1'
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelist,name="k8s-node2"  value=1'
curl -i -XPOST 'http://localhost:8086/write?db=ican' --data-binary 'nodelist,name="k8s-node3"  value=1'

