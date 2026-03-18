### ・大まかな概要
#### [要件定義書](./docs/features.md)
#### [全体図](./docs/PortforioFlow.mermaid.md)

---

### ・規約・実装資料
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

---

### 意思決定の記録
意思決定をする際に **[Issue](/../../issues/)** を利用しています

---

### README
#### [Backend](./packages/backend/README.md)
#### [Frontend](./packages/frontend/README.md)

---

### Commands

```sh
# 依存関係のインストール
npm install

# パッケージのビルド (shared)
npm run build:shared

# 開発環境の起動
npm run dev:frontend
npm run dev:backend

# 静的解析 (TypeScript / ESLint)
npm run tsc:frontend
npm run tsc:backend
npm run lint:frontend
```
