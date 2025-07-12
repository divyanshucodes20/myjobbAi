import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { sendOTPEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    const { db } = await connectToDatabase()
    await db.collection("otps").updateOne(
      { email },
      {
        $set: {
          email,
          otp,
          expiresAt,
          verified: false,
          createdAt: new Date(),
        },
      },
      { upsert: true },
    )
    await sendOTPEmail(email, otp)

    return NextResponse.json({ message: "OTP sent successfully" })
  } catch (error) {
    console.error("Error sending OTP:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
