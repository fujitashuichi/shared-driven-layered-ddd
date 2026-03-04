import React, { type ButtonHTMLAttributes } from 'react'

type Props = {
  children?: React.ReactNode,
  variant: "primary" | "secondary" | "danger",
  className?: ButtonHTMLAttributes<HTMLButtonElement>["className"],
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function AppButton({
  children,
  variant,
  className,
  ...rest
}: Props): React.ReactElement {
  const baseStyle = "w-20 h-10 inline-flex items-center justify-center hover:opacity-50"

  const styleMap = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-400 text-white",
    danger: "bg-red-500 text-white"
  } as const;

  const mergedStyle = `${baseStyle} ${styleMap[variant]} ${className ?? ""}`;

  return (
    <button className={mergedStyle} {...rest}>
      {children}
    </button>
  )
}
