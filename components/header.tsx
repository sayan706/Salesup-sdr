"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, User, LogOut, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { logoutAction } from "@/lib/auth"
import { useMobile } from "@/hooks/use-mobile"
import { AfkTracker } from "@/components/afk-tracker"

interface HeaderProps {
  user: {
    name: string
    email: string
  }
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const isMobile = useMobile()

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logoutAction()
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoggingOut(false)
    }
  }

  const toggleSidebar = () => {
    // Dispatch a custom event to toggle the sidebar
    window.dispatchEvent(new Event("toggle-sidebar"))
  }

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center">
<Button
  variant="ghost"
  size="icon"
  className="mr-2"
  onClick={toggleSidebar}
  data-sidebar-trigger="true"
>
  <Menu className="h-5 w-5" />
</Button>
        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">SDR Portal</h1>
      </div>

      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={16} />
          </div>
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all w-full"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <AfkTracker />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
            >
              <span className="sr-only">Open user menu</span>
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2">
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-red-500 focus:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
