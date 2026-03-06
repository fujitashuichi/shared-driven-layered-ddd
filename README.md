### [要件定義書](./docs/features.md)
### [BEセキュリティ](./docs/BE_Security.md)
### [全体図](./docs/PortforioFlow.mermaid)

---

## このポートフォリオの肝

### BE Test
```sh
current test result:
Test Files  6 passed (6)
     Tests  34 passed (34)
  Duration  2.80s (transform 1.08s, setup 0ms, import 3.13s, tests 721ms, environment 1ms)
```
```mermaid
flowchart LR

subgraph test entity
  GuardTest
  ControllerTest
  RepositoryTest
end

GuardTest --> Guard
ControllerTest --> Controller
RepositoryTest --> Repository

Guard --> Controller
Controller --> Service
Service --> Repository
Repository --> DB[(SQLite)]
```

### BE Request Flow
```mermaid
sequenceDiagram
  participant client
  participant Guard as Guard(Middleware)
  participant Error as ErrorHandler
  participant Controller
  participant Service as Service(using security)
  participant Repository
  participant DB

  client -> Guard: request
  alt invalid
    Guard -> client: response
  else valid
    Guard -> Controller: next()
  end
  Controller -> Service: execute
  alt invalid
    Service -> Error: throw
  else valid
    Service -> Repository: query
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
