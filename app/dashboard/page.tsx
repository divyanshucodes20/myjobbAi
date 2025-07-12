import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import DashboardLayout from "@/components/dashboard-layout"
import ProductsOverview from "@/components/products-overview"

async function getSession() {
  const cookieStore = await cookies()
  return cookieStore.get("session")?.value
}

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth")
  }

  return (
    <DashboardLayout>
      <ProductsOverview />
    </DashboardLayout>
  )
}
