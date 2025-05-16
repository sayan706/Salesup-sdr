"use client"

import { Phone, Mail, Building, MapPin, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { VerticalScrollCards } from "@/components/vertical-scroll-cards"

interface POC {
  id?: string
  poc_name?: string
  name?: string
  company?: string
  designation?: string
  position?: string
  status?: string
  phone?: string
  email?: string
  location?: string
  industry?: string
  comments?: string
  [key: string]: any
}

interface PocDataMobileViewProps {
  data: POC[]
}

export function PocDataMobileView({ data = [] }: PocDataMobileViewProps) {
  // Safety check for empty data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-4 text-center">
          <p className="text-gray-500">No POC data available</p>
        </CardContent>
      </Card>
    )
  }

  // Helper function to get status color
  const getStatusColor = (status = "") => {
    const colorMap: Record<string, string> = {
      Active: "bg-green-100 text-green-800 border-green-200",
      Inactive: "bg-gray-100 text-gray-800 border-gray-200",
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Qualified: "bg-blue-100 text-blue-800 border-blue-200",
      "Not Interested": "bg-red-100 text-red-800 border-red-200",
    }

    return colorMap[status] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <VerticalScrollCards
      data={data}
      renderCard={(poc) => (
        <Card className="h-full border-none shadow-lg">
          <div className="h-3 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          <CardContent className="p-4 flex flex-col h-[calc(100%-12px)]">
            <div className="flex justify-between items-start mb-2">
              <Badge className={getStatusColor(poc.status)} variant="outline">
                {poc.status || "Unknown"}
              </Badge>
              <span className="text-xs text-gray-500">{poc.id || ""}</span>
            </div>

            <div className="mb-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center mr-3 font-bold text-lg">
                {poc.poc_name && typeof poc.poc_name === "string" ? poc.poc_name.charAt(0) : "?"}
              </div>
              <div>
                <h2 className="text-lg font-bold">{poc.poc_name || "Unknown"}</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="w-3.5 h-3.5 mr-1" />
                  {poc.company || "Unknown"} {poc.designation && <span className="ml-1">• {poc.designation}</span>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-auto">
              {poc.phone && (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm">{poc.phone}</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                          onClick={() => window.open(`tel:${poc.phone}`)}
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

              {poc.email && (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm truncate max-w-[200px]">{poc.email}</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                          onClick={() => window.open(`mailto:${poc.email}`)}
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
                    <MapPin className="w-3 h-3 mr-1" /> Location
                  </p>
                  <p className="text-sm font-medium">{poc.location || "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center">
                    <Briefcase className="w-3 h-3 mr-1" /> Industry
                  </p>
                  <p className="text-sm font-medium">{poc.industry || "N/A"}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Comments</p>
                <p className="text-sm">{poc.comments || "No comments available"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      className="animate-fade-in"
    />
  )
}
