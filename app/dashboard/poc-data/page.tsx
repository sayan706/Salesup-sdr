import { requireAuth } from "@/lib/auth"
import { safeGeneratePocData } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { PocDataMobileView } from "@/components/poc-data-mobile-view"
import DataTable from "@/components/data-table"

export default async function POCDataPage() {
  try {
    await requireAuth()

    const pocData = safeGeneratePocData()

    // Define columns for POC data table
    const columns = [
      { key: "id", title: "ID" },
      { key: "poc_name", title: "Name" },
      { key: "designation", title: "Designation" },
      { key: "company", title: "Company" },
      { key: "phone", title: "Phone" },
      { key: "email", title: "Email" },
      { key: "location", title: "Location" },
      { key: "industry", title: "Industry" },
      { key: "status", title: "Status", renderType: "pocStatus" },
      { key: "batch", title: "Batch" },
    ]

    return (
      <div className="space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight">POC Data Management</h1>
          <p className="text-muted-foreground">View and manage your point of contact data</p>
        </div>

        {/* Mobile View with Vertical Scroll Cards */}
        <div className="md:hidden animate-slide-in-up">
          <PocDataMobileView data={pocData} />
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block animate-fade-in">
          <DataTable
            data={pocData}
            columns={columns}
            searchKeys={["poc_name", "company", "email", "phone", "location", "industry"]}
            title="Points of Contact"
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in POC Data Page:", error)
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading POC Data</h1>
        <p className="text-gray-600 mb-4">
          There was an error loading the POC data. Please try refreshing the page or contact support.
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
