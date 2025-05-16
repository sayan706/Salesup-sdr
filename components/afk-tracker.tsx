"use client"

import { useState, useEffect } from "react"
import { Clock, Coffee, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AfkTracker() {
  const [isAfk, setIsAfk] = useState(false)
  const [afkTime, setAfkTime] = useState(0)
  const [totalAfkToday, setTotalAfkToday] = useState(0)
  const [showAfkDialog, setShowAfkDialog] = useState(false)
  const [loginTime] = useState(new Date())
  const [currentTime, setCurrentTime] = useState(new Date())

  // Mock data for demonstration
  const presentDays = 22
  const absentDays = 3
  const hourlyRate = 15
  const hoursPerDay = 8

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())

      // If in AFK mode, increment AFK time
      if (isAfk) {
        setAfkTime((prev) => prev + 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isAfk])

  const toggleAfk = () => {
    if (isAfk) {
      // Ending AFK
      setTotalAfkToday((prev) => prev + afkTime)
      setAfkTime(0)
      setIsAfk(false)
      setShowAfkDialog(false)
    } else {
      // Starting AFK
      setIsAfk(true)
      setShowAfkDialog(true)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const formatTimeHHMM = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const calculateWorkingHours = () => {
    const diffMs = currentTime.getTime() - loginTime.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    return formatTime(diffSec)
  }

  const calculateProjectedSalary = () => {
    // Calculate working hours excluding AFK time
    const diffMs = currentTime.getTime() - loginTime.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const workingSec = diffSec - totalAfkToday - (isAfk ? afkTime : 0)
    const workingHours = workingSec / 3600

    // Calculate projected salary for today
    const dailySalary = hourlyRate * workingHours

    // Calculate monthly projected salary
    const monthlyWorkingDays = 22 // Assuming 22 working days in a month
    const monthlyProjectedSalary =
      (dailySalary / (currentTime.getHours() - loginTime.getHours())) * hoursPerDay * monthlyWorkingDays

    return {
      daily: dailySalary.toFixed(2),
      monthly: monthlyProjectedSalary.toFixed(2),
    }
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleAfk}
              className={isAfk ? "bg-amber-100 text-amber-600" : ""}
            >
              {isAfk ? <Coffee className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isAfk ? "Currently AFK" : "Track AFK time"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={showAfkDialog} onOpenChange={setShowAfkDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">{isAfk ? "You are currently AFK" : "AFK Status"}</DialogTitle>
            <DialogDescription className="text-center">
              {isAfk ? "Your status is set to Away From Keyboard" : "Track your away time"}
            </DialogDescription>
          </DialogHeader>

          {isAfk && (
            <div className="py-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 text-amber-600 mb-4">
                  <Coffee className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold">{formatTime(afkTime)}</h3>
                <p className="text-sm text-gray-500 mt-1">Time away</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500 mb-1">Today's AFK</p>
                  <p className="font-medium">{formatTime(totalAfkToday)}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500 mb-1">Working Hours</p>
                  <p className="font-medium">{calculateWorkingHours()}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500 mb-1">Present Days</p>
                  <p className="font-medium">{presentDays}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500 mb-1">Absent Days</p>
                  <p className="font-medium">{absentDays}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-violet-50 to-indigo-50 p-4 rounded-lg border border-indigo-100">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-indigo-700">Projected Salary</p>
                  <p className="text-xs text-indigo-600">Rate: ${hourlyRate}/hr</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Today</p>
                    <p className="text-lg font-bold">${calculateProjectedSalary().daily}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Monthly</p>
                    <p className="text-lg font-bold">${calculateProjectedSalary().monthly}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={toggleAfk}
              className={
                isAfk
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 w-full"
                  : "bg-gradient-to-r from-amber-600 to-orange-600 w-full"
              }
            >
              {isAfk ? (
                <span className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  Return from AFK
                </span>
              ) : (
                <span className="flex items-center">
                  <Coffee className="mr-2 h-4 w-4" />
                  Go AFK
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
