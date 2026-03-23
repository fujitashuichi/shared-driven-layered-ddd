import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    fileParallelism: false, // ファイルごとの並列実行を無効化
    sequence: {
      concurrent: false, // テストケース内の並列実行を無効化
    }
  }
});
