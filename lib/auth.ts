"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Mock user data - in a real app, this would be in a database
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@gmail.com",
    password: "123456", // In a real app, this would be hashed
    role: "admin",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "sdr",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "sdr",
  },
]

export async function login(email: string, password: string) {
  // In a real app, you would validate against a database and use proper password hashing
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    throw new Error("Invalid credentials")
  }

  // Create a session
  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    loggedInAt: new Date().toISOString(),
  }

  // In a real app, you would encrypt this token
  const sessionToken = Buffer.from(JSON.stringify(session)).toString("base64")

  // Set the session cookie
  cookies().set("session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return session
}

// This function just clears the session cookie without redirecting
export async function logoutAction() {
  cookies().delete("session")
  return { success: true }
}

// This function is for server components that need to redirect after logout
export async function logoutAndRedirect() {
  cookies().delete("session")
  redirect("/")
}

export async function getSession() {
  const sessionToken = cookies().get("session")?.value

  if (!sessionToken) {
    return null
  }

  try {
    // In a real app, you would decrypt this token
    const session = JSON.parse(Buffer.from(sessionToken, "base64").toString())
    return session
  } catch (error) {
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return session
}
