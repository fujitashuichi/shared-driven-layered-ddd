```mermaid
flowchart LR
  subgraph packages
    direction LR

    subgraph BE["Backend (Node.js + Express)"]
      subgraph Test["Tests"]
        ErrorHandlerTest{{ErrorHandler}}
        ControllerTest{{Controller}}
        GuardTest{{Guard}}
        RepositoryTest{{Repository}}
      end

      subgraph ClientSide
        Router
        ErrorHandler
        Middleware["Middleware"]
      end
      Controller[Controller]
      subgraph ServiceLayer
        note_ServiceLayer[/ServiceはRepositoryを隠蔽\nSQL Injectionへの耐性/]
        Service
        Repository[Repository]
      end
      DB[(SQLite)]

      %% Backend Flow
      Router --> ErrorHandler
      Router --> Middleware
      Middleware --> Controller
      Middleware -.->|authorize時のみ| Service
      Controller --> Service
      Service --> Repository
      Repository --> DB

      %% Tests
      GuardTest -.-> Middleware
      ControllerTest -.-> Controller
      RepositoryTest -.-> Repository
      ErrorHandlerTest -.-> Router
    end

    subgraph Shared["Shared"]
      SharedTypes[/Types / Schemas/]
    end

    subgraph FE["Frontend (React SPA)"]
      subgraph Logic["Logic Layer"]
        ApiClient([apiClient])
        Features([features/projects])
      end
      Components[[Components]]
      UI

      %% FE Flow
      UI --> Components
      Components --> Features --> ApiClient
    end

    %% Frontend <-> Backend
    ApiClient ==> API
    Router ==> API

    %% -> Shared
    FE --> Shared
    BE --> Shared
    API --> Shared
  end
```
