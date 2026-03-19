import { AppButton } from "../components";

export function GlobalErrorBoundary() {
  return (
    <>
      <h1>エラーが発生しました</h1>
      <AppButton
        variant="primary"
        onClick={() => window.location.reload()}
      >再試行</AppButton>
    </>
  )
}
