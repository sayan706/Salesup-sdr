"use client"

import { Calendar, Clock, Users, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { VerticalScrollCards } from "@/components/vertical-scroll-cards"

interface Meeting {
  id?: string
  title?: string
  date?: string
  time?: string
  duration?: string
  purpose?: string
  participants?: string
  status?: string
  notes?: string
  [key: string]: any
}

interface MeetingsMobileViewProps {
  data: Meeting[]
}

export function MeetingsMobileView({ data = [] }: MeetingsMobileViewProps) {
  // Safety check for empty data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-4 text-center">
          <p className="text-gray-500">No meetings available</p>
        </CardContent>
      </Card>
    )
  }

  // Helper function to get status color
  const getStatusColor = (status = "") => {
    const colorMap: Record<string, string> = {
      Completed: "bg-gray-100 text-gray-800 border-gray-200",
      Upcoming: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Scheduled: "bg-green-100 text-green-800 border-green-200",
    }

    return colorMap[status] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <VerticalScrollCards
      data={data}
      renderCard={(meeting) => (
        <Card className="h-full border-none shadow-lg">
          <div className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          <CardContent className="p-4 flex flex-col h-[calc(100%-12px)]">
            <div className="flex justify-between items-start mb-2">
              <Badge className={getStatusColor(meeting.status)} variant="outline">
                {meeting.status || "Unknown"}
              </Badge>
              <span className="text-xs text-gray-500">{meeting.id || ""}</span>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-bold">{meeting.title || "Untitled Meeting"}</h2>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {meeting.date || "No date"} • {meeting.time || "No time"}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-auto">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> Duration
                </p>
                <p className="text-sm font-medium">{meeting.duration || "N/A"}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 flex items-center">
                  <FileText className="w-3 h-3 mr-1" /> Purpose
                </p>
                <p className="text-sm font-medium">{meeting.purpose || "N/A"}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 flex items-center">
                  <Users className="w-3 h-3 mr-1" /> Participants
                </p>
                <p className="text-sm font-medium">{meeting.participants || "N/A"}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 flex items-center">
                  <FileText className="w-3 h-3 mr-1" /> Notes
                </p>
                <p className="text-sm">{meeting.notes || "No notes available"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      className="animate-fade-in"
    />
  )
}
