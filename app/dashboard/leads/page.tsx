import { requireAuth } from "@/lib/auth"
import LeadsTable from "@/components/leads-table"
import { LeadsMobileView } from "@/components/leads-mobile-view"

// Mock leads data with all requested fields
const leadsData = Array.from({ length: 20 }).map((_, i) => ({
  id: `LEAD-${4000 + i}`,
  sdr: `SDR ${(i % 5) + 1}`,
  status: ["New", "Contacted", "Qualified", "Meeting Set", "Closed Won", "Closed Lost"][i % 6],
  date_of_reachout: new Date(Date.now() - i * 86400000 * 2).toLocaleDateString(),
  batch: `Batch-${Math.floor(i / 5) + 1}`,
  employee: Math.floor(Math.random() * 500) + 10,
  company: `Company ${String.fromCharCode(65 + (i % 26))}`,
  poc_name: `Contact ${i + 1}`,
  company_linkedin: `https://linkedin.com/company-${i}`,
  poc_linkedin: `https://linkedin.com/in/contact-${i}`,
  comments:
    i % 3 === 0 ? "Interested in our services" : i % 3 === 1 ? "Requested a follow-up call" : "Needs more information",
  date_of_follow_up: new Date(Date.now() + i * 86400000 * 3).toLocaleDateString(),
  poc_phonenumber: `+1 (555) ${100 + i}-${1000 + i}`,
  poc_phonenumber2: i % 3 === 0 ? `+1 (555) ${200 + i}-${2000 + i}` : "",
  poc_email: `contact${i + 1}@company${String.fromCharCode(65 + (i % 26))}.com`,
  poc_email2: i % 4 === 0 ? `contact${i + 1}.alt@company${String.fromCharCode(65 + (i % 26))}.com` : "",
  domain: `company${String.fromCharCode(65 + (i % 26))}.com`,
  location: ["New York", "San Francisco", "Chicago", "Austin", "Seattle", "Boston", "Denver"][i % 7],
  industry: ["Technology", "Healthcare", "Finance", "Retail", "Manufacturing", "Education", "Media"][i % 7],
  source: ["Website", "LinkedIn", "Referral", "Conference", "Cold Call", "Email Campaign"][i % 6],
  city: ["New York", "San Francisco", "Chicago", "Austin", "Seattle", "Boston", "Denver"][i % 7],
  state: ["NY", "CA", "IL", "TX", "WA", "MA", "CO"][i % 7],
  taxable: i % 2 === 0,
  first_name: `First${i + 1}`,
  last_name: `Last${i + 1}`,
  designation: ["CEO", "CTO", "CFO", "COO", "VP Sales", "Director", "Manager"][i % 7],
  outlets: i % 2 === 0 ? ["Web", "Mobile", "Social"] : ["Mobile", "Web"],
  if_poc: i % 3 === 0,
  client_feedback:
    i % 4 === 0
      ? "Very positive"
      : i % 4 === 1
        ? "Somewhat interested"
        : i % 4 === 2
          ? "Needs more information"
          : "No feedback yet",
  client_status: ["Active", "Inactive", "Potential", "Former"][i % 4],
  hlr_status: ["Verified", "Pending", "Failed", "N/A"][i % 4],
  priority: ["High", "Medium", "Low"][i % 3],
  assignedDate: new Date(Date.now() - i * 86400000 * 5).toLocaleDateString(),
  lastActivity: i % 3 === 0 ? "Call" : i % 3 === 1 ? "Email" : "Meeting",
  lastActivityDate: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  notes:
    i % 4 === 0
      ? "Interested in our product"
      : i % 4 === 1
        ? "Requested pricing information"
        : i % 4 === 2
          ? "Scheduled follow-up call"
          : "Sent product brochure",
}))

export default async function LeadsPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight">My Leads</h1>
        <p className="text-muted-foreground">Manage and track your assigned leads</p>
      </div>

      {/* Mobile View (Tinder Card UI) */}
      <div className="md:hidden animate-slide-in-up">
        <LeadsMobileView leads={leadsData} />
      </div>

      {/* Desktop View (Table) */}
      <div className="hidden md:block animate-fade-in">
        <LeadsTable leads={leadsData} />
      </div>
    </div>
  )
}
