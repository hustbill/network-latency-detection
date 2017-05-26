# Network Latency Detection

## Latency Matrix  

```code
docker pull billyzhang2010/network-latency-detection:latest

docker run  -dit -p 8081:80 billyzhang2010/network-latency-detection:latest

http://localhost:8081
```
## Latency Chart  
```code
container -> veth0 -> docker 0 -> flannel0 -> eth
```
## Network Latency Adjacency Matrix
```code
Matrix:
{id: "k8s-node1-k8s-node1", x: "0", y: "0", weight: "0.1"}
```
## Run
start a http server  
```code
python -m SimpleHTTPServer  
```

visit the url:  
http://localhost:8000
