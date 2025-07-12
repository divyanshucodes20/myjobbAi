import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function Home() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")

  if (session) {
    redirect("/dashboard")
  } else {
    redirect("/auth")
  }
}
