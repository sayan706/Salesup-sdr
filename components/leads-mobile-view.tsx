"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, Building, Calendar, Tag, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { VerticalScrollCards } from "@/components/vertical-scroll-cards"

interface Lead {
  id: string
  status: string
  poc_name?: string
  name?: string
  company: string
  designation?: string
  position?: string
  [key: string]: any
}

interface LeadsMobileViewProps {
  leads: Lead[]
}

export function LeadsMobileView({ leads }: LeadsMobileViewProps) {
  const [leadStatus, setLeadStatus] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Helper functions to safely access lead properties
  const getLeadName = (lead: Lead | null) => {
    if (!lead) return ""
    return lead.poc_name || lead.name || ""
  }

  const getLeadInitial = (lead: Lead | null) => {
    const name = getLeadName(lead)
    return name ? name.charAt(0) : "?"
  }

  const getLeadPosition = (lead: Lead | null) => {
    if (!lead) return ""
    return lead.designation || lead.position || ""
  }

  const getLeadPhone = (lead: Lead | null) => {
    if (!lead) return ""
    return lead.poc_phonenumber || lead.phone || ""
  }

  const getLeadEmail = (lead: Lead | null) => {
    if (!lead) return ""
    return lead.poc_email || lead.email || ""
  }

  // Load saved lead statuses from localStorage on init
  useEffect(() => {
    try {
      const savedStatuses = localStorage.getItem("leadStatuses")
      if (savedStatuses) {
        setLeadStatus(JSON.parse(savedStatuses))
      }
    } catch (error) {
      console.error("Error loading saved statuses:", error)
    }
  }, [])

  const handleStatusChange = (leadId: string, newStatus: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Update the local state
      const updatedStatuses = { ...leadStatus, [leadId]: newStatus }
      setLeadStatus(updatedStatuses)

      // Save to localStorage
      localStorage.setItem("leadStatuses", JSON.stringify(updatedStatuses))

      // Show toast
      toast({
        title: "Status Updated",
        description: `Lead status changed to ${newStatus}`,
        variant: "default",
      })

      setIsLoading(false)
    }, 800)
  }

  const getStatusColor = (status: string) => {
    if (!status) return "bg-gray-100 text-gray-800 border-gray-200"

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

  const renderLeadCard = (lead: Lead, index: number) => {
    if (!lead) return null

    // Check if we have a saved status for this lead
    const currentStatus = leadStatus[lead.id] || lead.status || "Unknown"

    return (
      <Card className="h-full overflow-hidden border-none shadow-lg">
        <div className="h-3 bg-gradient-to-r from-violet-500 to-indigo-500"></div>
        <CardContent className="p-4 flex flex-col h-[calc(100%-12px)]">
          <div className="flex justify-between items-start mb-2">
            <Badge className={`${getStatusColor(currentStatus)} text-sm px-3 py-1`}>{currentStatus}</Badge>
            <span className="text-xs text-gray-500">{lead.id || ""}</span>
          </div>

          <div className="mb-4 flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-white flex items-center justify-center mr-3 font-bold text-lg">
              {getLeadInitial(lead)}
            </div>
            <div>
              <h2 className="text-lg font-bold">{getLeadName(lead) || "Unknown"}</h2>
              <div className="flex items-center text-sm text-gray-600">
                <Building className="w-3.5 h-3.5 mr-1" />
                {lead.company || "Unknown"}{" "}
                {getLeadPosition(lead) && <span className="ml-1">• {getLeadPosition(lead)}</span>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-auto">
            {getLeadPhone(lead) && (
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">{getLeadPhone(lead)}</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                        onClick={() => window.open(`tel:${getLeadPhone(lead)}`)}
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

            {getLeadEmail(lead) && (
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">{getLeadEmail(lead)}</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                        onClick={() => window.open(`mailto:${getLeadEmail(lead)}`)}
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
                <p className="text-sm font-medium">{lead.location || "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 flex items-center">
                  <Tag className="w-3 h-3 mr-1" /> Industry
                </p>
                <p className="text-sm font-medium">{lead.industry || "N/A"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" /> Reachout
                </p>
                <p className="text-sm font-medium">{lead.date_of_reachout || "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" /> Follow-up
                </p>
                <p className="text-sm font-medium">{lead.date_of_follow_up || "N/A"}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Notes</p>
              <p className="text-sm">{lead.notes || lead.comments || "No notes available"}</p>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium mb-1 block">Update Status</label>
            <Select
              disabled={isLoading}
              defaultValue={currentStatus}
              onValueChange={(value) => handleStatusChange(lead.id, value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  <span className={`${getStatusColor(currentStatus)} px-2 py-0.5 rounded-full text-xs`}>
                    {currentStatus}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Meeting Set">Meeting Set</SelectItem>
                <SelectItem value="Closed Won">Closed Won</SelectItem>
                <SelectItem value="Closed Lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!leads || leads.length === 0) {
    return <div className="p-4 text-center">No leads available</div>
  }

  return <VerticalScrollCards data={leads} renderCard={renderLeadCard} className="animate-fade-in" />
}
