### [Kanban](https://github.com/users/fujitashuichi/projects/4)

### ・大まかな概要
#### [要件定義書](./docs/features.md)
#### [全体図](./docs/PortforioFlow.mermaid.md)
#### [セットアップ方法](./docs/howToSetup.md)
#### [ユーザー操作フロー](./docs/userFlow/userFlow.md)

#### [仕様上の制約](#-db運用方針)

---
### ・規約・実装資料
#### FE/BE
* メモ: [Projectドメイン: エラーレスポンスの形式](./docs/BE/BE_domainFlow/error/project.md)
* 仕様: [dtoスキーマの仕様について](./docs/howToUseSchema.md)
#### BE
* 要件: [BEセキュリティ](./docs/BE/BE_Security.md)
* 資料: [DB図](./docs/BE/db.mermaid.md)
* 注意: [例外的なキャスティング運用](./docs/BE/whiteListCasting.md)
#### FE
* 設計: [featuresのContext図](./docs/FE/contextFlow.md)

<details>
  <summary>その他レポートなど</summary>

  * <a href="./docs/BE/introducePrisma.md">Prismaへの移行: 生SQLとライブラリのトレードオフ</a>
  * <a href="./docs/test/analyzeTestPerformance.md">テスト時間遷移における実行時間スパイクに関して: 原因不明のまま解決した現象</a>
  * <a href="./docs/test/testResults.md">testResults(改修後などに更新)</a>
</details>


#### このポートフォリオから生まれたZenn記事（新しい順）
* [entity class がないなら DDD じゃない？ - class定義は手段の1つではないだろうか？](https://zenn.dev/fujishu/articles/90c3c9425b5017)
* [GitHub仕様の罠: Squash Merge 後にコミット履歴が重複してしまう理由](https://zenn.dev/fujishu/articles/dad6e6130d8952)
* [備忘録: npm workspace によるモノレポ設定 と sharedパッケージ](https://zenn.dev/fujishu/articles/e3ab97ef66624d)
* [BE初学者の学習成果：フルスタック実装で見えた依存関係と設計の壁](https://zenn.dev/fujishu/articles/3c06ce089cfff9)

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

# dbコマンド
npm run db:generate
npm run db:push
npm run setupDb   # npm run db:generate && npm run db:push

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

---

### 注意事項（環境制約について）

本プロジェクトは Supabase（無料枠）を利用しており、DB数に制限があります。
そのため、開発 / テスト / 本番 の3環境を完全に分離していません。

#### ■ DB運用方針
- テスト環境
  - テスト実行時にDBを初期化
  - 常にクリーンな状態で検証
- 本番環境
  - 分離済み（通常は使用しない）
- 開発環境
  - 専用DBは用意していない（制約のため）

#### ■ 検証範囲
- Backend
  - 実DB（Supabase）に接続した状態でテストにより検証
- Frontend
  - 一部未検証の動作が残る可能性あり

#### ■ 動作について
<s>Supabaseの仕様により、一定時間アクセスがない場合はDBがスリープ状態になります。
そのため、初回アクセス時に通信エラーが発生する可能性があります。</s>
↑ Github Actions により回避しました。

リトライは自動では行わず、ユーザー操作に委ねています。

本プロジェクトではこれらを仕様として扱っています。
