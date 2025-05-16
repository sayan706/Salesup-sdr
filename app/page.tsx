import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import LoginForm from "@/components/login-form"

export default async function Home() {
  const session = await getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
        <div className="relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                SDR
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">SDR Portal</h1>
            <p className="mt-2 text-gray-600">Sign in to access your dashboard</p>
          </div>
          <LoginForm />
        </div>
      </div>
      <p className="mt-8 text-center text-white text-sm">Powered by SDR Portal • © {new Date().getFullYear()}</p>
    </div>
  )
}
