"use client"

import { useState, useEffect } from "react"

interface ThemeToggleProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
  className?: string
}

export default function ThemeToggle({ darkMode, setDarkMode, className = "" }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem("theme", newMode ? "dark" : "light")

    // Add smooth transition effect
    document.documentElement.style.transition = "background-color 0.3s ease, color 0.3s ease"
    setTimeout(() => {
      document.documentElement.style.transition = ""
    }, 300)
  }

  if (!mounted) {
    return (
      <div className={`w-12 h-6 bg-gray-300 rounded-full ${className}`}>
        <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 translate-x-0.5 translate-y-0.5"></div>
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        darkMode ? "bg-blue-600" : "bg-gray-300"
      } ${className}`}
      aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
    >
      <span
        className={`inline-block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
          darkMode ? "translate-x-6" : "translate-x-0.5"
        }`}
      >
        <span className="flex items-center justify-center w-full h-full">
          {darkMode ? (
            <i className="fas fa-moon text-xs text-blue-600"></i>
          ) : (
            <i className="fas fa-sun text-xs text-yellow-500"></i>
          )}
        </span>
      </span>
    </button>
  )
}
