import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"

type Variant = "primary" | "secondary" | "ghost-destructive"

type ButtonProps = {
  variant?: Variant
} & ComponentProps<typeof motion.button>

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
      className={twMerge(
        "transition-all rounded-xl px-4 py-2 font-medium disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2",
        getVariantStyles(variant),
        className,
      )}
    />
  )
}

function getVariantStyles(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20"
    case "secondary":
      return "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/50"
    case "ghost-destructive":
      return "hover:bg-red-500/10 text-red-500 hover:text-red-400"
    default:
      throw new Error(`Invalid variant: ${variant satisfies never}`)
  }
}
