## 開発環境セットアップ

### 1. 環境変数のセットアップ
```.env.develop``` にはダミー値が入っています。手動でセットアップする必要があります。

**envの雛形を利用して下さい**
```/packages/frontend```, ```/packages/backend``` でそれぞれファイルを編集します。
```.env.example``` に自身の環境変数を指定して下さい。

<br/>

### 2. 依存関係のインストール

**ルートディレクトリで全パッケージの依存関係を解決できます**
```pwsh
npm install
```

<br />

### 3. データベースの同期 (Prisma 7)
Prisma 7 の スキーマ変更をデータベースに反映させるには以下のコマンドを使用します。

```
# `/` または　`/packages/backend` で実行
npm run syncDatabase
```

**個別操作の場合は以下のコマンドを使います**
```
# スキーマ生成
npm run db:generate

# DBへの適用
npm run db:push
```

**失敗時**
supabaseでは、高負荷処理時にport **6543** がブロックされることがあります。
その際はBEの環境変数でDATABASE_URLのポートを **5432** に変えてみて下さい

<br />

### 4. 開発環境起動
1. sharedをビルド
sharedはプロジェクト全体で利用されるため、**必ず最初にビルドします**
```
# ルートディレクトリで実行
npm run build:shared
```

**サーバーの起動**
a. 一括起動
```
npm run dev:all
```
b. 片方起動
```
npm run dev:backend
npm run dev:frontend
```
