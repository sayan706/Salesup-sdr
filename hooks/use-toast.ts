"use client"

import { useState, useCallback } from "react"

interface ToastProps {
  title: string
  description?: string
  variant?: "default" | "success" | "error" | "warning"
}

export function useToast() {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([])

  const toast = useCallback(({ title, description, variant = "default" }: ToastProps) => {
    const id = Math.random().toString(36).slice(2, 9)

    const newToast = {
      id,
      title,
      description,
      variant,
    }

    // Create DOM element
    const toastElement = document.createElement("div")
    toastElement.id = `toast-${id}`
    toastElement.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-y-0 opacity-100 ${
      variant === "success"
        ? "bg-green-100 border border-green-200 text-green-800"
        : variant === "error"
          ? "bg-red-100 border border-red-200 text-red-800"
          : variant === "warning"
            ? "bg-yellow-100 border border-yellow-200 text-yellow-800"
            : "bg-blue-100 border border-blue-200 text-blue-800"
    }`

    toastElement.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 ${
          variant === "success"
            ? "text-green-600"
            : variant === "error"
              ? "text-red-600"
              : variant === "warning"
                ? "text-yellow-600"
                : "text-blue-600"
        }" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
            variant === "success"
              ? "M5 13l4 4L19 7"
              : variant === "error"
                ? "M6 18L18 6M6 6l12 12"
                : variant === "warning"
                  ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  : "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          }"></path>
        </svg>
        <div>
          <div class="font-medium">${title}</div>
          ${description ? `<div class="text-sm">${description}</div>` : ""}
        </div>
      </div>
    `

    document.body.appendChild(toastElement)

    // Remove after 3 seconds
    setTimeout(() => {
      toastElement.style.opacity = "0"
      toastElement.style.transform = "translateY(-20px)"

      setTimeout(() => {
        if (document.body.contains(toastElement)) {
          document.body.removeChild(toastElement)
        }
      }, 300)
    }, 3000)

    setToasts((prev) => [...prev, newToast])

    // Auto-remove from state
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3300)

    return id
  }, [])

  return { toast }
}
