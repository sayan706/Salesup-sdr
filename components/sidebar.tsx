"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, MessageSquare, Calendar, UserCheck, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "POC Data",
    href: "/dashboard/poc-data",
    icon: Users,
  },
  {
    name: "CRM Data",
    href: "/dashboard/crm-data",
    icon: MessageSquare,
  },
  {
    name: "Meeting Manager",
    href: "/dashboard/meetings",
    icon: Calendar,
  },
  {
    name: "My Leads",
    href: "/dashboard/leads",
    icon: UserCheck,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true) // Default to open on PC
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // If switching to mobile, close the sidebar
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true) // Default to open on PC
      }
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Listen for toggle events from the header
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev)
    }

    window.addEventListener("toggle-sidebar", handleToggle)
    return () => window.removeEventListener("toggle-sidebar", handleToggle)
  }, [])

  // Close sidebar when route changes (mobile only)
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])

  // Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobile &&
        isOpen &&
        !(e.target as Element).closest('[data-sidebar="true"]') &&
        !(e.target as Element).closest('[data-sidebar-trigger="true"]')
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, isMobile])

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        data-sidebar="true"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-violet-900 to-indigo-800 text-white transition-transform duration-300 ease-in-out shadow-xl",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-indigo-700/50">
            <h2 className="text-xl font-bold flex items-center">
              <div className="w-8 h-8 rounded-md bg-white text-indigo-800 flex items-center justify-center mr-2 font-bold">
                SDR
              </div>
              SDR Portal
            </h2>
            <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4">
            <div className="bg-indigo-800/50 rounded-lg p-3 mb-4">
              <p className="text-xs text-indigo-200">Logged in as</p>
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-indigo-200">admin@gmail.com</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200",
                  pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-indigo-100 hover:bg-white/5 hover:text-white",
                )}
                onClick={() => {
                  if (isMobile) {
                    setIsOpen(false)
                  }
                }}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 transition-all",
                    pathname === item.href ? "text-white" : "text-indigo-300",
                  )}
                />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 mt-auto">
            <div className="bg-indigo-800/30 rounded-lg p-3 text-center">
              <p className="text-xs text-indigo-200">SDR Portal v1.0</p>
              <p className="text-xs text-indigo-200">© {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
