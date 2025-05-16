"use client"

import { useEffect } from "react"

export function SidebarController() {
  useEffect(() => {
    // Create a function to handle the toggle event
    const handleToggleSidebar = () => {
      const sidebarElement = document.querySelector('[data-sidebar="true"]')
      if (sidebarElement) {
        sidebarElement.classList.toggle("translate-x-0")
        sidebarElement.classList.toggle("-translate-x-full")
      }
    }

    // Create a function to close the sidebar
    const closeSidebar = () => {
      const sidebarElement = document.querySelector('[data-sidebar="true"]')
      if (sidebarElement) {
        sidebarElement.classList.remove("translate-x-0")
        sidebarElement.classList.add("-translate-x-full")
      }
    }

    // Add event listener for the custom event
    document.addEventListener("toggle-sidebar", handleToggleSidebar)

    // Add event listener for navigation (using popstate)
    window.addEventListener("popstate", closeSidebar)

    // Clean up
    return () => {
      document.removeEventListener("toggle-sidebar", handleToggleSidebar)
      window.removeEventListener("popstate", closeSidebar)
    }
  }, [])

  return null
}
