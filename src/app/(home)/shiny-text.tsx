"use client"

import { motion, type AnimationProps } from "framer-motion"

const animationProps = {
  initial: { "--x": "100%" },
  animate: { "--x": "-100%" },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps

export function ShinyText({ children }: React.PropsWithChildren) {
  return (
    <motion.span
      {...animationProps}
      style={{
        maskImage:
          "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
      }}
    >
      {children}
    </motion.span>
  )
}
