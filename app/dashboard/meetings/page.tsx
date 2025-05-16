import { requireAuth } from "@/lib/auth"
import { safeGenerateMeetingData } from "@/lib/mock-data"
import MeetingForm from "@/components/meeting-form"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MeetingsMobileView } from "@/components/meetings-mobile-view"

export default async function MeetingsPage() {
  try {
    await requireAuth()

    const meetingData = safeGenerateMeetingData()

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meeting Manager</h1>
          <p className="text-muted-foreground">Schedule and manage your meetings</p>
        </div>

        <MeetingForm />

        {/* Mobile View */}
        <div className="md:hidden animate-slide-in-up">
          <MeetingsMobileView data={meetingData} />
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block animate-fade-in">
          <Card className="border-none shadow-md overflow-hidden">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Scheduled Meetings</h2>
              <div className="space-y-4">
                {meetingData.slice(0, 5).map((meeting, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{meeting.title}</h3>
                        <div className="text-sm text-gray-500 mt-1">
                          {meeting.date} • {meeting.time} • {meeting.duration}
                        </div>
                      </div>
                      <Badge
                        className={
                          meeting.status === "Completed"
                            ? "bg-gray-100 text-gray-800"
                            : meeting.status === "Upcoming"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                        variant="outline"
                      >
                        {meeting.status}
                      </Badge>
                    </div>
                    <div className="mt-3 text-sm">
                      <div>
                        <span className="font-medium">Purpose:</span> {meeting.purpose}
                      </div>
                      <div>
                        <span className="font-medium">Participants:</span> {meeting.participants}
                      </div>
                      {meeting.notes && (
                        <div>
                          <span className="font-medium">Notes:</span> {meeting.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {meetingData.length > 5 && (
                  <div className="text-center p-4">
                    <p className="text-sm text-gray-500">
                      Showing 5 of {meetingData.length} meetings. Use the desktop version for full table functionality.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in Meetings Page:", error)
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Meetings</h1>
        <p className="text-gray-600 mb-4">
          There was an error loading the meetings data. Please try refreshing the page or contact support.
        </p>
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Error details have been logged for the administrator.</p>
          </CardContent>
        </Card>
      </div>
    )
  }
}
