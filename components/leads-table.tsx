"use client"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Search, Filter, FileText, User, Clock, CheckCircle } from "lucide-react"

interface Lead {
  id: string
  poc_name?: string
  name?: string
  company: string
  position?: string
  designation?: string
  email?: string
  poc_email?: string
  phone?: string
  poc_phonenumber?: string
  status: string
  priority: string
  assignedDate: string
  lastActivity: string
  lastActivityDate: string
  notes: string
  [key: string]: any
}

interface LeadsTableProps {
  leads: Lead[]
}

export default function LeadsTable({ leads }: LeadsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leads)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false)
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false)
  const [callNotes, setCallNotes] = useState("")
  const [callOutcome, setCallOutcome] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    if (!value.trim()) {
      setFilteredLeads(leads)
      return
    }

    const filtered = leads.filter(
      (lead) =>
        (lead.poc_name && lead.poc_name.toLowerCase().includes(value.toLowerCase())) ||
        (lead.name && lead.name.toLowerCase().includes(value.toLowerCase())) ||
        lead.company.toLowerCase().includes(value.toLowerCase()) ||
        (lead.email && lead.email.toLowerCase().includes(value.toLowerCase())) ||
        (lead.poc_email && lead.poc_email.toLowerCase().includes(value.toLowerCase())) ||
        lead.status.toLowerCase().includes(value.toLowerCase()),
    )

    setFilteredLeads(filtered)
  }

  const handleStatusChange = (leadId: string, newStatus: string) => {
    // In a real app, this would update the status in the database
    const updatedLeads = filteredLeads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    setFilteredLeads(updatedLeads)
  }

  const handleCallClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsCallDialogOpen(true)
    setCallNotes("")
    setCallOutcome("")
  }

  const handleNotesClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsNotesDialogOpen(true)
    setCallNotes(lead.notes)
  }

  const handleCallComplete = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would save the call notes and outcome to the database
      if (selectedLead) {
        const updatedLeads = filteredLeads.map((lead) =>
          lead.id === selectedLead.id
            ? {
                ...lead,
                lastActivity: "Call",
                lastActivityDate: new Date().toLocaleDateString(),
                notes: callNotes,
              }
            : lead,
        )
        setFilteredLeads(updatedLeads)
      }

      setIsSubmitting(false)
      setIsSuccess(true)

      // Close dialog after showing success message
      setTimeout(() => {
        setIsCallDialogOpen(false)
        setIsSuccess(false)
      }, 1500)
    }, 1000)
  }

  const handleNotesSave = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would save the notes to the database
      if (selectedLead) {
        const updatedLeads = filteredLeads.map((lead) =>
          lead.id === selectedLead.id
            ? {
                ...lead,
                notes: callNotes,
              }
            : lead,
        )
        setFilteredLeads(updatedLeads)
      }

      setIsSubmitting(false)
      setIsSuccess(true)

      // Close dialog after showing success message
      setTimeout(() => {
        setIsNotesDialogOpen(false)
        setIsSuccess(false)
      }, 1500)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      New: "bg-blue-100 text-blue-800 border-blue-200",
      Contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Qualified: "bg-green-100 text-green-800 border-green-200",
      Proposal: "bg-purple-100 text-purple-800 border-purple-200",
      "Meeting Set": "bg-purple-100 text-purple-800 border-purple-200",
      "Closed Won": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "Closed Lost": "bg-red-100 text-red-800 border-red-200",
    }

    return colorMap[status] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getPriorityColor = (priority: string) => {
    const colorMap: Record<string, string> = {
      High: "bg-red-100 text-red-800 border-red-200",
      Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Low: "bg-blue-100 text-blue-800 border-blue-200",
    }

    return colorMap[priority] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  // Helper function to get the display name of a lead
  const getLeadName = (lead: Lead) => {
    return lead.poc_name || lead.name || "Unknown"
  }

  // Helper function to get the first character of a lead's name safely
  const getLeadInitial = (lead: Lead) => {
    const name = getLeadName(lead)
    return name !== "Unknown" ? name.charAt(0) : "?"
  }

  // Helper function to get the lead's position or designation
  const getLeadPosition = (lead: Lead) => {
    return lead.position || lead.designation || ""
  }

  // Helper function to get the lead's email
  const getLeadEmail = (lead: Lead) => {
    return lead.poc_email || lead.email || ""
  }

  // Helper function to get the lead's phone
  const getLeadPhone = (lead: Lead) => {
    return lead.poc_phonenumber || lead.phone || ""
  }

  return (
    <Card className="border-none shadow-md overflow-hidden animate-fade-in">
      <CardHeader className="pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2 text-violet-600" />
            My Leads
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative input-focus-effect">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search leads..."
                className="w-full sm:w-[300px] pl-8 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon" className="bg-gray-50 border-gray-200 hover:bg-white btn-animate">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 mt-4">
        <div className="rounded-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Company</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Priority</TableHead>
                  <TableHead className="font-semibold">Last Activity</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-gray-50 transition-colors table-row-animate">
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mr-3">
                            {getLeadInitial(lead)}
                          </div>
                          <div>
                            <div className="font-medium">{getLeadName(lead)}</div>
                            <div className="text-sm text-muted-foreground">{getLeadPosition(lead)}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>
                        <Select
                          defaultValue={lead.status}
                          onValueChange={(value) => handleStatusChange(lead.id, value)}
                        >
                          <SelectTrigger className="w-[140px] h-8">
                            <SelectValue>
                              <Badge className={getStatusColor(lead.status)} variant="outline">
                                {lead.status}
                              </Badge>
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
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(lead.priority)} variant="outline">
                          {lead.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{lead.lastActivity}</div>
                          <div className="text-sm text-muted-foreground">{lead.lastActivityDate}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleCallClick(lead)}
                            className="h-8 w-8 bg-green-50 border-green-200 text-green-600 hover:bg-green-100 hover:text-green-700 btn-animate"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => window.open(`mailto:${getLeadEmail(lead)}`)}
                            className="h-8 w-8 bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:text-blue-700 btn-animate"
                            disabled={!getLeadEmail(lead)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleNotesClick(lead)}
                            className="h-8 bg-gray-50 border-gray-200 hover:bg-gray-100 btn-animate"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Notes
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No leads found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      {/* Call Dialog */}
      <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-green-600" />
              Call {selectedLead ? getLeadName(selectedLead) : ""}
            </DialogTitle>
            <DialogDescription>
              Record details about your call with {selectedLead ? getLeadName(selectedLead) : ""} from{" "}
              {selectedLead ? selectedLead.company : ""}.
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Call logged successfully!</h3>
              <p className="text-sm text-gray-500 mt-1">Your call details have been saved.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="text-sm font-medium">{selectedLead ? getLeadPhone(selectedLead) : ""}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm font-medium">{selectedLead ? getLeadEmail(selectedLead) : ""}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="call-outcome" className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    Call Outcome
                  </Label>
                  <Select value={callOutcome} onValueChange={setCallOutcome}>
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white transition-all">
                      <SelectValue placeholder="Select outcome" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Answered">Answered</SelectItem>
                      <SelectItem value="Voicemail">Left Voicemail</SelectItem>
                      <SelectItem value="No Answer">No Answer</SelectItem>
                      <SelectItem value="Wrong Number">Wrong Number</SelectItem>
                      <SelectItem value="Busy">Busy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="call-notes" className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-1 text-gray-500" />
                    Call Notes
                  </Label>
                  <Textarea
                    id="call-notes"
                    placeholder="Enter notes about the call"
                    value={callNotes}
                    onChange={(e) => setCallNotes(e.target.value)}
                    className="min-h-[100px] bg-gray-50 border-gray-200 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCallDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCallComplete}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 btn-animate"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Complete Call"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Notes Dialog */}
      <Dialog open={isNotesDialogOpen} onOpenChange={setIsNotesDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Notes for {selectedLead ? getLeadName(selectedLead) : ""}
            </DialogTitle>
            <DialogDescription>
              Update notes for {selectedLead ? getLeadName(selectedLead) : ""} from{" "}
              {selectedLead ? selectedLead.company : ""}.
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Notes saved successfully!</h3>
              <p className="text-sm text-gray-500 mt-1">Your notes have been updated.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="lead-notes" className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-1 text-gray-500" />
                    Notes
                  </Label>
                  <Textarea
                    id="lead-notes"
                    placeholder="Enter notes about this lead"
                    value={callNotes}
                    onChange={(e) => setCallNotes(e.target.value)}
                    className="min-h-[200px] bg-gray-50 border-gray-200 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNotesDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleNotesSave}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 btn-animate"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save Notes"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
