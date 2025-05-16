// Utility functions for safely generating mock data
export function safeGeneratePocData() {
  try {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: `POC-${1000 + i}`,
      poc_name: `Contact ${i + 1}`,
      designation: ["CEO", "CTO", "CFO", "COO", "VP Sales", "Director", "Manager"][i % 7],
      location: ["New York", "San Francisco", "Chicago", "Austin", "Seattle", "Boston", "Denver"][i % 7],
      employee: Math.floor(Math.random() * 500) + 10,
      industry: ["Technology", "Healthcare", "Finance", "Retail", "Manufacturing", "Education", "Media"][i % 7],
      company: `Company ${String.fromCharCode(65 + (i % 26))}`,
      linkedin: `https://linkedin.com/company-${i}`,
      phone: `+1 (555) ${100 + i}-${1000 + i}`,
      phone_2: i % 3 === 0 ? `+1 (555) ${200 + i}-${2000 + i}` : "",
      phone_3: i % 5 === 0 ? `+1 (555) ${300 + i}-${3000 + i}` : "",
      phone_4: i % 7 === 0 ? `+1 (555) ${400 + i}-${4000 + i}` : "",
      phone_5: i % 9 === 0 ? `+1 (555) ${500 + i}-${5000 + i}` : "",
      phone_6: i % 11 === 0 ? `+1 (555) ${600 + i}-${6000 + i}` : "",
      email: `contact${i + 1}@company${String.fromCharCode(65 + (i % 26))}.com`,
      batch: `Batch-${Math.floor(i / 5) + 1}`,
      comments:
        i % 3 === 0
          ? "Interested in our services"
          : i % 3 === 1
            ? "Requested a follow-up call"
            : "Needs more information",
      source: ["Website", "LinkedIn", "Referral", "Conference", "Cold Call", "Email Campaign"][i % 6],
      outlets: i % 2 === 0 ? ["Web", "Mobile", "Social"] : ["Mobile", "Web"],
      created_at: new Date(Date.now() - i * 86400000 * 7).toISOString(),
      updated_at: new Date(Date.now() - i * 86400000 * 2).toISOString(),
      status: ["Active", "Inactive", "Pending", "Qualified", "Not Interested"][i % 5],
    }))
  } catch (error) {
    console.error("Error generating POC data:", error)
    return []
  }
}

export function safeGenerateCrmData() {
  try {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: `CRM-${2000 + i}`,
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
        i % 3 === 0
          ? "Interested in our services"
          : i % 3 === 1
            ? "Requested a follow-up call"
            : "Needs more information",
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
      created_at: new Date(Date.now() - i * 86400000 * 7).toISOString(),
      updated_at: new Date(Date.now() - i * 86400000 * 2).toISOString(),
    }))
  } catch (error) {
    console.error("Error generating CRM data:", error)
    return []
  }
}

export function safeGenerateMeetingData() {
  try {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: `MTG-${3000 + i}`,
      title: `Meeting with Company ${String.fromCharCode(65 + (i % 26))}`,
      date: new Date(Date.now() + (i - 5) * 86400000).toLocaleDateString(),
      time: `${10 + (i % 8)}:${i % 2 === 0 ? "00" : "30"} ${i % 2 === 0 ? "AM" : "PM"}`,
      duration: `${30 + (i % 4) * 15} min`,
      purpose: ["Initial Contact", "Product Demo", "Follow-up", "Contract Discussion", "Onboarding"][i % 5],
      participants: `Contact ${i + 1}, ${i % 3 === 0 ? "Sales Manager" : i % 3 === 1 ? "Product Specialist" : "Account Manager"}`,
      status: i < 5 ? "Completed" : i < 10 ? "Upcoming" : "Scheduled",
      notes:
        i % 3 === 0
          ? "Prepare product demo materials"
          : i % 3 === 1
            ? "Review previous conversation notes"
            : "Send agenda before meeting",
    }))
  } catch (error) {
    console.error("Error generating meeting data:", error)
    return []
  }
}
