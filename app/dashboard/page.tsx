import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import {
  MessageSquare,
  Calendar,
  UserCheck,
  TrendingUp,
  ArrowUp,
  Mail,
  DollarSign,
  CalendarIcon,
  Coffee,
} from "lucide-react"

export default async function Dashboard() {
  const session = await requireAuth()

  // Format the current time for display
  const currentTime = new Date()
  const formattedLoginTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const formattedDate = currentTime.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {session.name}</h1>
          <p className="text-muted-foreground">Here's an overview of your sales activities</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">Today's Date</p>
            <p className="font-medium">{formattedDate}</p>
          </div>
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 p-2 rounded-md shadow-sm border border-indigo-100">
            <p className="text-xs text-indigo-500">Login Time</p>
            <p className="font-medium text-indigo-700">{formattedLoginTime}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <div className="flex items-center mt-1">
              <div className="text-xs text-green-500 flex items-center font-medium">
                <ArrowUp className="h-3 w-3 mr-1" />
                5.2%
              </div>
              <p className="text-xs text-muted-foreground ml-1">from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings Scheduled</CardTitle>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center mt-1">
              <div className="text-xs text-green-500 flex items-center font-medium">
                <ArrowUp className="h-3 w-3 mr-1" />
                12%
              </div>
              <p className="text-xs text-muted-foreground ml-1">from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversations</CardTitle>
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="flex items-center mt-1">
              <div className="text-xs text-green-500 flex items-center font-medium">
                <ArrowUp className="h-3 w-3 mr-1" />
                2.5%
              </div>
              <p className="text-xs text-muted-foreground ml-1">from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.2%</div>
            <div className="flex items-center mt-1">
              <div className="text-xs text-green-500 flex items-center font-medium">
                <ArrowUp className="h-3 w-3 mr-1" />
                3.1%
              </div>
              <p className="text-xs text-muted-foreground ml-1">from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance and Salary Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CalendarIcon className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500 mb-1">Present Days</p>
                <p className="text-xl font-bold text-green-600">22</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500 mb-1">Absent Days</p>
                <p className="text-xl font-bold text-red-600">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AFK Time</CardTitle>
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Coffee className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500 mb-1">Today</p>
                <p className="text-xl font-bold text-amber-600">00:45:12</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500 mb-1">This Week</p>
                <p className="text-xl font-bold text-amber-600">03:22:45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projected Salary</CardTitle>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500 mb-1">Today</p>
                <p className="text-xl font-bold text-blue-600">$120.45</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500 mb-1">Monthly</p>
                <p className="text-xl font-bold text-blue-600">$2,640.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-3 md:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="w-full max-w-3xl">
                <div className="flex justify-between items-end mb-8">
                  <div className="text-center">
                    <div className="h-32 w-12 bg-violet-200 rounded-t-md relative">
                      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-violet-500 rounded-t-md"></div>
                    </div>
                    <p className="text-xs mt-2">Mon</p>
                  </div>
                  <div className="text-center">
                    <div className="h-32 w-12 bg-violet-200 rounded-t-md relative">
                      <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-violet-500 rounded-t-md"></div>
                    </div>
                    <p className="text-xs mt-2">Tue</p>
                  </div>
                  <div className="text-center">
                    <div className="h-32 w-12 bg-violet-200 rounded-t-md relative">
                      <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-violet-500 rounded-t-md"></div>
                    </div>
                    <p className="text-xs mt-2">Wed</p>
                  </div>
                  <div className="text-center">
                    <div className="h-32 w-12 bg-violet-200 rounded-t-md relative">
                      <div className="absolute bottom-0 left-0 right-0 h-[90%] bg-violet-500 rounded-t-md"></div>
                    </div>
                    <p className="text-xs mt-2">Thu</p>
                  </div>
                  <div className="text-center">
                    <div className="h-32 w-12 bg-violet-200 rounded-t-md relative">
                      <div className="absolute bottom-0 left-0 right-0 h-[75%] bg-violet-500 rounded-t-md"></div>
                    </div>
                    <p className="text-xs mt-2">Fri</p>
                  </div>
                  <div className="text-center">
                    <div className="h-32 w-12 bg-violet-200 rounded-t-md relative">
                      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-violet-500 rounded-t-md"></div>
                    </div>
                    <p className="text-xs mt-2">Sat</p>
                  </div>
                  <div className="text-center">
                    <div className="h-32 w-12 bg-violet-200 rounded-t-md relative">
                      <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-violet-500 rounded-t-md"></div>
                    </div>
                    <p className="text-xs mt-2">Sun</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 px-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-violet-500 rounded-sm mr-1"></div>
                    <span>Weekly Activity</span>
                  </div>
                  <div>Total: 127 activities</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-1 border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      i % 3 === 0
                        ? "bg-green-100 text-green-600"
                        : i % 3 === 1
                          ? "bg-blue-100 text-blue-600"
                          : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {i % 3 === 0 ? (
                      <MessageSquare className="h-5 w-5" />
                    ) : i % 3 === 1 ? (
                      <Mail className="h-5 w-5" />
                    ) : (
                      <Calendar className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {i % 3 === 0 ? "Call completed with" : i % 3 === 1 ? "Email sent to" : "Meeting scheduled with"}{" "}
                      Client {i}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(Date.now() - i * 3600000).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
