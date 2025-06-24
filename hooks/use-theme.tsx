"use client"

import { useState, useEffect } from "react"

export function useTheme() {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    } else {
      setDarkMode(systemPrefersDark)
      localStorage.setItem("theme", systemPrefersDark ? "dark" : "light")
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setDarkMode(e.matches)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (mounted) {
      // Apply theme to document
      if (darkMode) {
        document.documentElement.classList.add("dark")
        document.body.style.backgroundColor = "#111827"
        document.body.style.color = "#ffffff"
      } else {
        document.documentElement.classList.remove("dark")
        document.body.style.backgroundColor = "#ffffff"
        document.body.style.color = "#111827"
      }
    }
  }, [darkMode, mounted])

  return { darkMode, setDarkMode, mounted }
}
