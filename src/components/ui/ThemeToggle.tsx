"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// THEME TOGGLE BUTTON
// สลับ light / dark / system mode
// useEffect + mounted ป้องกัน hydration mismatch
// (server render ไม่รู้ theme จนกว่า JS จะ load บน client)
// =============================================================================

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // รอให้ component mount บน client ก่อนถึง render icon
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn("w-9 h-9 rounded-lg", className)} />
    );
  }

  const options = [
    { value: "light",  Icon: Sun,     label: "Light mode" },
    { value: "dark",   Icon: Moon,    label: "Dark mode" },
    { value: "system", Icon: Monitor, label: "System default" },
  ] as const;

  const current = options.find((o) => o.value === theme) ?? options[2];
  const { Icon } = current;

  // คลิกทีละครั้ง: light → dark → system → light → ...
  function cycle() {
    const order = ["light", "dark", "system"] as const;
    const idx = order.indexOf(theme as typeof order[number]);
    setTheme(order[(idx + 1) % order.length]);
  }

  return (
    <button
      onClick={cycle}
      aria-label={`Current: ${current.label}. Click to change.`}
      title={current.label}
      className={cn(
        "w-9 h-9 flex items-center justify-center rounded-lg",
        "text-[var(--text-secondary)] border border-[var(--border)]",
        "hover:bg-[var(--bg-alt)] hover:text-[var(--text-primary)]",
        "transition-all duration-[200ms]",
        "focus-visible:outline-2 focus-visible:outline-accent-DEFAULT",
        className
      )}
    >
      <Icon size={16} strokeWidth={2} />
    </button>
  );
}
