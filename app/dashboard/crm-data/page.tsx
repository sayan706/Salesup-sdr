import { requireAuth } from "@/lib/auth"
import { safeGenerateCrmData } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { CrmDataMobileView } from "@/components/crm-data-mobile-view"
import DataTable from "@/components/data-table"

export default async function CRMDataPage() {
  try {
    await requireAuth()

    const crmData = safeGenerateCrmData()

    // Define columns for CRM data table
    const columns = [
      { key: "id", title: "ID" },
      { key: "poc_name", title: "Contact Name" },
      { key: "company", title: "Company" },
      { key: "designation", title: "Designation" },
      { key: "status", title: "Status", renderType: "crmStatus" },
      { key: "poc_phonenumber", title: "Phone" },
      { key: "poc_email", title: "Email" },
      { key: "date_of_reachout", title: "Reachout Date" },
      { key: "date_of_follow_up", title: "Follow-up Date" },
      { key: "location", title: "Location" },
      { key: "industry", title: "Industry" },
      { key: "sdr", title: "SDR" },
    ]

    return (
      <div className="space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight">CRM Data</h1>
          <p className="text-muted-foreground">View and manage your customer relationship data</p>
        </div>

        {/* Mobile View */}
        <div className="md:hidden animate-slide-in-up">
          <CrmDataMobileView data={crmData} />
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block animate-fade-in">
          <DataTable
            data={crmData}
            columns={columns}
            searchKeys={["poc_name", "company", "poc_email", "poc_phonenumber", "location", "industry"]}
            title="CRM Data"
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in CRM Data Page:", error)
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading CRM Data</h1>
        <p className="text-gray-600 mb-4">
          There was an error loading the CRM data. Please try refreshing the page or contact support.
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
