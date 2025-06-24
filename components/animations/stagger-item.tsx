"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export default function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.25, 0, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
