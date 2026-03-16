### [要件定義書](./docs/features.md)
### [全体図](./docs/PortforioFlow.mermaid)

---

### [規約・実装資料]
#### FE/BE
* メモ: [Projectドメイン: エラーレスポンスの形式](./docs/BE/BE_domainFlow/error/project.md)
#### BE
* 要件: [BEセキュリティ](./docs/BE/BE_Security.md)
* 資料: [DB図](./docs/BE/db.mermaid.md)
#### FE
* 要設計: [featuresのContext図](./docs/FE/contextFlow.md)

<details>
  <summary>その他レポートなど</summary>

  * <a href="./docs/errors/createProject_unauthorizedError.md">fetchにおけるcredential設定ミスによるエラーと解決までの道のり: credential設定の欠如</a>
  * <a href="./docs/test/analyzeTestPerformance.md">テスト時間遷移における実行時間スパイクに関して: 原因不明のまま解決した現象</a>
  * <a href="./docs/test/testResults.md">testResults(改修後などに更新)</a>
</details>

### 意思決定の記録
意思決定をする際に **[Issue](/../../issues/)** を利用することがあります


---

## ポートフォリオの根幹

### 直近のBEテスト実行結果
```sh
current result>
 Test Files  10 passed (10)
      Tests  53 passed (53)
   Duration  4.33s (transform 1.79s, setup 0ms, import 4.81s, tests 1.30s, environment 2ms)
```

### テスト箇所と依存フロー
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

Guard -.->|"認可に必要な情報の取得(User/Project)"| Service
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
    Note over Guard, DB: 例外はthrow
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
