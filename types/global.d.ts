declare global {
  interface Window {
    gtag?: (
      command: "config" | "event",
      targetId: string,
      config?: {
        event_category?: string
        event_label?: string
        value?: number
      },
    ) => void
  }
}

export {}
