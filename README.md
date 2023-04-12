

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
```