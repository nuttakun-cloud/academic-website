"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { ButtonVariant, ButtonSize } from "@/types";

// =============================================================================
// BUTTON COMPONENT
// รองรับทุก variant ที่กำหนดใน design system
// forwardRef → ให้ parent component เข้าถึง DOM element ได้โดยตรง
// =============================================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

// Variant styles — ทุก variant มาจาก design system tokens
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-DEFAULT text-white border-primary-DEFAULT " +
    "hover:bg-primary-light hover:border-primary-light hover:shadow-primary " +
    "active:bg-primary-dark",

  accent:
    "bg-accent-DEFAULT text-white border-accent-DEFAULT " +
    "hover:bg-accent-light hover:border-accent-light hover:shadow-accent " +
    "active:bg-accent-dark",

  outline:
    "bg-transparent text-primary-DEFAULT border-primary-DEFAULT " +
    "hover:bg-primary-subtle hover:border-primary-light " +
    "active:bg-primary-subtle",

  ghost:
    "bg-transparent text-[var(--text-secondary)] border-transparent " +
    "hover:bg-[var(--bg-alt)] hover:text-[var(--text-primary)] " +
    "active:bg-[var(--border)]",

  download:
    "bg-[var(--bg-alt)] text-[var(--text-primary)] border-[var(--border)] " +
    "hover:bg-primary-subtle hover:border-primary-DEFAULT hover:text-primary-DEFAULT " +
    "active:bg-primary-subtle",

  link:
    "bg-transparent border-transparent text-primary-DEFAULT underline-offset-3 " +
    "hover:text-primary-light hover:underline " +
    "p-0 h-auto shadow-none",
};

// Size styles
const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 rounded-base gap-1.5 min-h-[32px]",
  md: "text-sm px-5 py-2.5 rounded-md gap-2 min-h-[40px]",
  lg: "text-base px-7 py-3 rounded-lg gap-2.5 min-h-[48px]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles ที่ทุก variant ใช้ร่วมกัน
          "inline-flex items-center justify-center font-sans font-medium",
          "border-2 cursor-pointer select-none whitespace-nowrap",
          "transition-all duration-[200ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          "focus-visible:outline-2 focus-visible:outline-accent-DEFAULT focus-visible:outline-offset-2",
          "active:translate-y-px",
          "disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none",
          // Variant + Size
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}

        {/* Left icon */}
        {!isLoading && leftIcon && (
          <span className="shrink-0 w-[1em] h-[1em]">{leftIcon}</span>
        )}

        {/* Label */}
        {children}

        {/* Right icon */}
        {rightIcon && (
          <span className="shrink-0 w-[1em] h-[1em]">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
