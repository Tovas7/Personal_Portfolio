"use client"

import { motion } from "framer-motion"

interface LoadingSkeletonProps {
  className?: string
  lines?: number
}

export default function LoadingSkeleton({ className = "", lines = 3 }: LoadingSkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
          style={{ width: `${Math.random() * 40 + 60}%` }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}
