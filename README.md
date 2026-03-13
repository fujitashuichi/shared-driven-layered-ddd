### [要件定義書](./docs/features.md)
### [BEセキュリティ](./docs/BE_Security.md)
### [全体図](./docs/PortforioFlow.mermaid)

<details>
  <summary>その他レポートなど</summary>

  * <a href="./docs/errors/createProject_unauthorizedError.md">fetchにおけるcredential設定ミスによるエラーと解決までの道のり</a>
  * <a href="./docs/test/analyzeTestPerformance.md">テスト時間遷移における実行時間スパイクに関して</a>
  * <a href="./docs/test/testResults.md">testResults</a>
</details>

## 設計上の意思決定 (Architecture Decision Log)

このポートフォリオでは、保守性と開発効率のバランスを考慮した設計判断を目指しています。
具体的な判断基準については、以下の Issue 記録を参照してください。

- **[非同期ロジックの管理方針について](/../../issues/2)**
  - なぜ Custom Hook 化をあえて見送ったのか、デバッグ効率と認知負荷の観点から論理的な境界線を定義しています。

## メモ
* features = 広義のドメインロジック

---

## ポートフォリオの肝

### BE Test
```sh
Test Files  9 passed (9)
     Tests  48 passed (48)
  Start at  12:29:50
  Duration  3.85s (transform 1.28s, setup 0ms, import 4.27s, tests 987ms, environment 1ms)
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
  Router --> Guard
end

subgraph DB execution
  Service --> Repository
  Repository --> DB[(SQLite)]
end

Guard -.->|authorize時だけ情報を貰う| Service
Guard --> Controller
Controller --> Service

GuardTest -..-> Guard
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
    participant Guard as RequestGuard
  end
  participant Controller
  participant Service
  participant Repository
  participant DB

  client ->> Guard: request
  Guard ->> Controller: next()
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
    Guard --x Error: Error
    Controller --x Error: Error
    Service --x Error: Error
    Repository --x Error: Error
    DB --x Error: Error
    alt Error thrown
      Error -->> client: response
    end
  end
```
