

````mermaid


graph TD
A[User] -->|Open Api| B(User-api)

B -->|set/get Token | D(Redis) 
D-->B
B -->|SELECT/INSERT Token | E(MYSQL) 
E-->B

B -->|Get Extrato| C(Unipot Bank)

B -->|Get token| C(Unipot Bank)
C -->B

  
````


## Prepare minikube

``` shell
brew install minikube


minikube image   build -t "db/Dockerfile" -t database-sql "db"         
minikube image   build -t  "api/Dockerfile" -t user-api-docker "api"    
minikube image   build -t "uniPot/Dockerfile" -t unipot-docker "uniPot"

kubectl apply -f database-sql-service.yaml,unipot-docker-service.yaml,user-api-docker-service.yaml,database-sql-deployment.yaml,comparativo-mynet-networkpolicy.yaml,redis-service-deployment.yaml,unipot-docker-deployment.yaml,user-api-docker-deployment.yaml
```