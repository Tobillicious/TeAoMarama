import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "muted";
};

export const Button: React.FC<Props> = ({variant="primary", children, ...rest}) => {
  const base = "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium tracking-nav";
  const v = variant === "primary"
    ? "bg-brand text-white shadow-sm hover:opacity-95"
    : "bg-surface text-muted border border-gray-200";
  return <button className={`${base} ${v}`} {...rest}>{children}</button>;
};

export default Button;
