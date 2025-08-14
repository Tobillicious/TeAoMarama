import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "muted";
  size?: "sm" | "md" | "lg";
};

export const Button: React.FC<Props> = ({
  variant = "primary", 
  size = "md", 
  children, 
  className = "", 
  ...rest
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2";
  
  const variantClasses = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    muted: "bg-brand-surface text-brand-muted border border-brand-muted/30 hover:border-brand-muted/50 hover:bg-brand-bg/50"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs rounded",
    md: "px-4 py-2 text-sm rounded-md",
    lg: "px-6 py-3 text-base rounded-md"
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
