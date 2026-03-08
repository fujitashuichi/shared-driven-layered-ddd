### [要件定義書](./docs/features.md)
### [BEセキュリティ](./docs/BE_Security.md)
### [全体図](./docs/PortforioFlow.mermaid)

---

## ポートフォリオの肝

### BE Test
```sh
Current Result:
Test Files  7 passed (7)
     Tests  43 passed (43)
  Duration  2.58s (transform 894ms, setup 0ms, import 2.84s, tests 644ms, environment 1ms)
```
```mermaid
flowchart LR

subgraph test entity
  GuardTest
  ControllerTest
  RepositoryTest
  ErrorHandlerTest
end

GuardTest -.-> Guard
ControllerTest -.-> Controller
RepositoryTest -.-> Repository
ErrorHandlerTest -.-> ErrorHandler

subgraph Client Side
  Router
  Router --> Guard
  ErrorHandler --> Router
end

Guard ==> Controller
Controller ==> ErrorHandler
Controller ==> Service

subgraph DB execution
  Service --> Repository
  Repository --> DB[(SQLite)]
end
```

### BE Request Flow
```mermaid
sequenceDiagram
  participant client
  participant Guard as Guard(Middleware)
  participant Error as ErrorHandler
  participant Controller
  participant Service
  participant Security
  participant Repository
  participant DB

  client -> Guard: request
  alt invalid
    Guard -> client: response
  else valid
    Guard -> Controller: next()
  end
  Controller -> Service: execute
  Service -> Security: data
  alt invalid
    Security -> Error: throw
  else valid
    Security -> Repository: query
  end
  Repository -> DB: SQL
  Note over DB: SQLite
  DB -> Repository: result
  Repository -> Service: result
  Service -> Controller: entity
  Controller -> client: response
  alt Error thrown
    Error -> client: response
  end
```
