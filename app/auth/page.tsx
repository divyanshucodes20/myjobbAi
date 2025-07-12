"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Mail, Shield } from "lucide-react"

export default function AuthPage() {
  const [step, setStep] = useState<"email" | "otp">("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const { toast } = useToast()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStep("otp")
        toast({
          title: "OTP Sent",
          description: "Please check your email for the verification code.",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send OTP",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Authentication successful! Redirecting...",
        })
        window.location.href = "/dashboard"
      } else {
        toast({
          title: "Error",
          description: data.error || "Invalid OTP",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setResendLoading(true)
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast({
          title: "OTP Resent",
          description: "A new verification code has been sent to your email.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP",
        variant: "destructive",
      })
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            {step === "email" ? (
              <Mail className="w-6 h-6 text-blue-600" />
            ) : (
              <Shield className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {step === "email" ? "Welcome Back" : "Verify Your Email"}
          </CardTitle>
          <CardDescription>
            {step === "email"
              ? "Enter your email to receive a verification code"
              : `We've sent a 6-digit code to ${email}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "email" ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>
              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResendOTP}
                  disabled={resendLoading}
                  className="text-sm"
                >
                  {resendLoading ? "Resending..." : "Didn't receive code? Resend"}
                </Button>
              </div>
              <div className="text-center">
                <Button type="button" variant="ghost" onClick={() => setStep("email")} className="text-sm">
                  Change email address
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
