"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FloatingElementProps {
  children: ReactNode
  className?: string
  duration?: number
  intensity?: number
}

export default function FloatingElement({
  children,
  className = "",
  duration = 3,
  intensity = 10,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-intensity, intensity, -intensity],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}
