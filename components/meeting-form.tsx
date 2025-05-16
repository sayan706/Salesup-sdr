"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, FileText, CheckCircle } from "lucide-react"

export default function MeetingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1000)
  }

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-bl-full"></div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-600" />
          Schedule a Meeting
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-md text-green-700 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Meeting scheduled successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center text-sm">
                <FileText className="h-4 w-4 mr-1 text-gray-500" />
                Meeting Title
              </Label>
              <Input
                id="title"
                placeholder="Enter meeting title"
                required
                className="bg-gray-50 border-gray-200 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose" className="flex items-center text-sm">
                <FileText className="h-4 w-4 mr-1 text-gray-500" />
                Purpose
              </Label>
              <Select>
                <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white transition-all">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initial">Initial Contact</SelectItem>
                  <SelectItem value="demo">Product Demo</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                  <SelectItem value="contract">Contract Discussion</SelectItem>
                  <SelectItem value="onboarding">Onboarding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                required
                className="bg-gray-50 border-gray-200 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                Time
              </Label>
              <Input
                id="time"
                type="time"
                required
                className="bg-gray-50 border-gray-200 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                Duration
              </Label>
              <Select>
                <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white transition-all">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants" className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-1 text-gray-500" />
                Participants
              </Label>
              <Input
                id="participants"
                placeholder="Enter participant names"
                required
                className="bg-gray-50 border-gray-200 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center text-sm">
              <FileText className="h-4 w-4 mr-1 text-gray-500" />
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Enter any notes or agenda items"
              className="min-h-[100px] bg-gray-50 border-gray-200 focus:bg-white transition-all"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Scheduling...
              </span>
            ) : (
              "Schedule Meeting"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
