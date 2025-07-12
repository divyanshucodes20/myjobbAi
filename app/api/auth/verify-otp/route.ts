import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { sendConfirmationEmail } from "@/lib/email"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const otpRecord = await db.collection("otps").findOne({
      email,
      otp,
      verified: false,
      expiresAt: { $gt: new Date() },
    })

    if (!otpRecord) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
    }

    await db.collection("otps").updateOne({ email, otp }, { $set: { verified: true } })

    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          email,
          lastLogin: new Date(),
          verified: true,
        },
      },
      { upsert: true },
    )

    const cookieStore = await cookies()
    cookieStore.set("session", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    await sendConfirmationEmail(email)

    return NextResponse.json({ message: "OTP verified successfully" })
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}
