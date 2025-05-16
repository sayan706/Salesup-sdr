"use client"

import { Phone, Mail, Building, Calendar, MapPin, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { VerticalScrollCards } from "@/components/vertical-scroll-cards"
import { useEffect } from "react"

interface CrmData {
  id?: string
  poc_name?: string
  name?: string
  company?: string
  designation?: string
  position?: string
  status?: string
  poc_phonenumber?: string
  poc_email?: string
  date_of_reachout?: string
  date_of_follow_up?: string
  location?: string
  industry?: string
  comments?: string
  [key: string]: any
}

interface CrmDataMobileViewProps {
  data: CrmData[]
}

export function CrmDataMobileView({ data = [] }: CrmDataMobileViewProps) {
  // Handle any side effects when the component mounts
  useEffect(() => {
    // Force a re-render when the component mounts to ensure proper display
    const handleResize = () => {
      // This is just to trigger a re-render
      window.dispatchEvent(new Event("resize"))
    }

    // Call once on mount
    handleResize()

    // Clean up
    return () => {}
  }, [])

  // Safety check for empty data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-4 text-center">
          <p className="text-gray-500">No CRM data available</p>
        </CardContent>
      </Card>
    )
  }

  // Helper function to get status color
  const getStatusColor = (status = "") => {
    const colorMap: Record<string, string> = {
      New: "bg-blue-100 text-blue-800 border-blue-200",
      Contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Qualified: "bg-green-100 text-green-800 border-green-200",
      "Meeting Set": "bg-purple-100 text-purple-800 border-purple-200",
      "Closed Won": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "Closed Lost": "bg-red-100 text-red-800 border-red-200",
    }

    return colorMap[status] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <VerticalScrollCards
      data={data}
      renderCard={(crm) => (
        <Card className="h-full border-none shadow-lg">
          <div className="h-3 bg-gradient-to-r from-emerald-500 to-green-500"></div>
          <CardContent className="p-4 flex flex-col h-[calc(100%-12px)]">
            <div className="flex justify-between items-start mb-2">
              <Badge className={getStatusColor(crm.status)} variant="outline">
                {crm.status || "Unknown"}
              </Badge>
              <span className="text-xs text-gray-500">{crm.id || ""}</span>
            </div>

            <div className="mb-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 text-white flex items-center justify-center mr-3 font-bold text-lg">
                {crm.poc_name && typeof crm.poc_name === "string" ? crm.poc_name.charAt(0) : "?"}
              </div>
              <div>
                <h2 className="text-lg font-bold">{crm.poc_name || "Unknown"}</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="w-3.5 h-3.5 mr-1" />
                  {crm.company || "Unknown"} {crm.designation && <span className="ml-1">• {crm.designation}</span>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-auto">
              {crm.poc_phonenumber && (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm">{crm.poc_phonenumber}</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                          onClick={() => window.open(`tel:${crm.poc_phonenumber}`)}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Call now</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              {crm.poc_email && (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm truncate max-w-[200px]">{crm.poc_email}</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                          onClick={() => window.open(`mailto:${crm.poc_email}`)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Send email</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" /> Reachout
                  </p>
                  <p className="text-sm font-medium">{crm.date_of_reachout || "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" /> Follow-up
                  </p>
                  <p className="text-sm font-medium">{crm.date_of_follow_up || "N/A"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" /> Location
                  </p>
                  <p className="text-sm font-medium">{crm.location || "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center">
                    <Briefcase className="w-3 h-3 mr-1" /> Industry
                  </p>
                  <p className="text-sm font-medium">{crm.industry || "N/A"}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Comments</p>
                <p className="text-sm">{crm.comments || "No comments available"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      className="animate-fade-in"
    />
  )
}
