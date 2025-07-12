import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import OTPEmail from "@/emails/otp-email"
import ConfirmationEmail from "@/emails/confirmation-email"

const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

export async function sendOTPEmail(email: string, otp: string) {
  const emailHtml = await render(OTPEmail({ otp }))

  await transporter.sendMail({
    from: process.env.GMAIL_USER || "noreply@dashboard.com",
    to: email,
    subject: "Your Verification Code",
    html: emailHtml,
  })
}

export async function sendConfirmationEmail(email: string) {
  const emailHtml = await render(ConfirmationEmail({ email }))

  await transporter.sendMail({
    from: process.env.GMAIL_USER || "noreply@dashboard.com",
    to: email,
    subject: "Welcome to Dashboard App",
    html: emailHtml,
  })
}
