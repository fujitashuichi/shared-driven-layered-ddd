## テストパフォーマンス指標
以下のチャートは、テストパフォーマンスの推移を示しています。

![Test Performance Summary](./graph_testSuitePerfomance.mermaid)

### パフォーマンス分析
レイテンシのスパイク: 第3回目の実行において、実行時間の顕著な急増（6.04秒）が確認されました。詳細な分析により、これはテスト自体によるものではなく、主にモジュールのトランスフォームとインポートのオーバーヘッドによって引き起こされたことが示されています。

![Run 3 Bottleneck Analysis](./graph_timeBreakDownForRun.mermaid)

```sh
Test Files  6 passed (6)
     Tests  34 passed (34)
  Duration  2.80s (transform 1.08s, setup 0ms, import 3.13s, tests 721ms, environment 1ms)

Test Files  7 passed (7)
     Tests  43 passed (43)
  Duration  2.58s (transform 894ms, setup 0ms, import 2.84s, tests 644ms, environment 1ms)

Test Files  8 passed (8)
     Tests  46 passed (46)
  Duration  6.04s (transform 7.23s, setup 0ms, import 9.35s, tests 912ms, environment 1ms)

Test Files  9 passed (9)
     Tests  48 passed (48)
  Duration  3.16s (transform 756ms, setup 0ms, import 3.11s, tests 954ms, environment 1ms)

Test Files  9 passed (9)
     Tests  48 passed (48)
  Duration  3.85s (transform 1.28s, setup 0ms, import 4.27s, tests 987ms, environment 1ms)

Test Files  9 passed (9)
     Tests  48 passed (48)
  Start at  17:27:29
  Duration  3.31s (transform 719ms, setup 0ms, import 3.13s, tests 1.04s, environment 1ms)

Test Files  10 passed (10)
     Tests  51 passed (51)
  Start at  14:16:04
  Duration  3.35s (transform 813ms, setup 0ms, import 3.35s, tests 1.11s, environment 2ms)

Test Files  10 passed (10)
     Tests  53 passed (53)
  Start at  19:40:50
  Duration  3.44s (transform 747ms, setup 0ms, import 3.44s, tests 1.19s, environment 1ms)
```
