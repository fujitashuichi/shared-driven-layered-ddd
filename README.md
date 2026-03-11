### [要件定義書](./docs/features.md)
### [BEセキュリティ](./docs/BE_Security.md)
### [全体図](./docs/PortforioFlow.mermaid)

<details>
  <summary>その他レポートなど</summary>

  * <a href="./docs/test/analyzeTestPerformance.md">テスト時間遷移における実行時間スパイクに関して</a>
  * <a href="./docs/test/testResults.md">testResults</a>
</details>

---

## ポートフォリオの肝

### BE Test
```sh
Current Result:
Test Files  9 passed (9)
     Tests  48 passed (48)
  Duration  3.16s (transform 756ms, setup 0ms, import 3.11s, tests 954ms, environment 1ms)
```
```mermaid
flowchart LR

subgraph test entity
  GuardTest{{GuardTest}}
  ControllerTest{{ControllerTest}}
  RepositoryTest{{RepositoryTest}}
  ErrorHandlerTest{{ErrorHandlerTest}}
end

subgraph Client Side
  Router([Router]) --> ErrorHandler
  Router --> Middleware
end

subgraph DB execution
  Service --> Repository
  Repository --> DB[(SQLite)]
end

Middleware -.->|authorize時だけ情報を貰う| Service
Middleware --> Controller
Controller --> Service

GuardTest -..-> Middleware
ControllerTest -..-> Controller
RepositoryTest -..-> Repository
ErrorHandlerTest -..-> ErrorHandler
```

### BE Request Sequence
```mermaid
sequenceDiagram
  participant client
  box rgb(240, 255, 240) Middleware
    participant Error as ErrorHandler
    participant Guard as Guard / authorize
  end
  participant Controller
  participant Service
  participant Repository
  participant DB

  client ->> Guard: request
  alt invalid
    Guard -->> client: response
  else valid
    Guard ->> Controller: next()
  end
  Controller ->> Service: execute
  Service ->> Repository: query
  Repository ->> DB: SQL

  Note over DB: SQLite

  DB -->> Repository: result
  Repository -->> Service: result
  Service -->> Controller: entity
  Controller -->> client: response


  rect rgb(200, 255, 200)
    Note over Controller, DB: 例外はthrow
    Controller --x Error: Error
    Service --x Error: Error
    Repository --x Error: Error
    DB --x Error: Error
    alt Error thrown
      Error -->> client: response
    end
  end
```
