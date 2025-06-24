"use client"

import type React from "react"
import { useState } from "react"

interface CVDownloadProps {
  className?: string
}

const CVDownload: React.FC<CVDownloadProps> = ({ className }) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      // Simulate a download process
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Trigger the actual download
      const link = document.createElement("a")
      link.href = "/cv/Muluken Zewdu Resume.pdf"
      link.download = "Muluken Zewdu Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Optional: Track download event for analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "download", {
          event_category: "CV",
          event_label: "John_Doe_CV.pdf",
          value: 1,
        })
      }
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className={className}>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer whitespace-nowrap"
      >
        {isDownloading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Downloading...
          </>
        ) : (
          <>
            <i className="fas fa-download mr-2"></i>
            Download CV
          </>
        )}
      </button>
    </div>
  )
}

export default CVDownload
