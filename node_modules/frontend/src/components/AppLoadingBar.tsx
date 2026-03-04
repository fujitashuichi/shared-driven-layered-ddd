import type React from "react"

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"],
  outerColorHex?: string,
  innerColorHex?: string
}

export function AppLoadingBar({ className, innerColorHex, outerColorHex }: Props) {
  const baseStyle = "w-full h-5";
  const mergedStyle = `${baseStyle} ${className}`;


  const loadingBarStyles = {
    outer: {
      backgroundColor: outerColorHex ?? "#ccc",
      borderRadius: "4px",
      overflow: "hidden"
    } as React.CSSProperties,
    inner: {
      backgroundColor: innerColorHex ?? "#ff0000",
      animation: "loadingBar 1s linear infinite"
    } as React.CSSProperties,
  };


  return (
    <div className={mergedStyle} style={loadingBarStyles.outer}>
      <div className="h-full" style={loadingBarStyles.inner} />
      <style>
        {`
          @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  )
}
