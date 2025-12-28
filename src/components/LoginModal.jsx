"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { toast } from "react-toastify"

export default function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", ""])
  const [timer, setTimer] = useState(30)

  const { login } = useAuth()

  // 🇮🇳 Indian number validation
  const isValidIndianNumber = (num) => /^[6-9]\d{9}$/.test(num)

  // ---------------- PHONE SUBMIT ----------------
  const handleLogin = () => {
    if (!isValidIndianNumber(phone)) {
      toast.error("Enter a valid Indian mobile number")
      return
    }

    toast.success("OTP sent: 1234 (demo)")
    setStep("otp")
    setTimer(30)
    setOtp(["", "", "", ""])
  }

  // ---------------- OTP INPUT ----------------
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return

    const next = [...otp]
    next[index] = value
    setOtp(next)

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  // ---------------- SUBMIT OTP ----------------
  const handleSubmitOtp = () => {
    const enteredOtp = otp.join("")

    if (enteredOtp !== "1234") {
      toast.error("Invalid OTP")
      return
    }

    login(phone) // ✅ AUTH STATE SETS HERE
    toast.success("Login successful 🎉")

    // reset state
    setPhone("")
    setOtp(["", "", "", ""])
    setStep("phone")

    onClose() // ✅ close ONLY after login
  }

  // ---------------- TIMER ----------------
  useEffect(() => {
    if (step !== "otp" || timer === 0) return

    const id = setInterval(() => setTimer(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [step, timer])

  const resendOtp = () => {
    toast.success("OTP resent: 1234 (demo)")
    setOtp(["", "", "", ""])
    setTimer(30)
    document.getElementById("otp-0")?.focus()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}   // 🔴 IMPORTANT FIX
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {step === "phone" ? "Login" : "Verify OTP"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* PHONE STEP */}
        {step === "phone" && (
          <>
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-2 border rounded bg-gray-50">+91</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                placeholder="Enter mobile number"
                className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-orange-500 text-white py-2 rounded"
            >
              Login
            </button>
          </>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <>
            <p className="text-sm mb-4">
              Enter OTP sent to +91 {phone}
            </p>

            <div className="flex justify-center gap-4 mb-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                  maxLength={1}
                  className="w-12 h-12 text-center border rounded text-lg
                             focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ))}
            </div>

            <div className="text-center text-sm mb-4">
              {timer > 0 ? (
                `Resend in ${timer}s`
              ) : (
                <button
                  onClick={resendOtp}
                  className="text-orange-500"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              onClick={handleSubmitOtp}
              disabled={otp.join("").length !== 4}
              className="w-full bg-orange-500 text-white py-2 rounded disabled:opacity-50"
            >
              Submit OTP
            </button>
          </>
        )}
      </div>
    </div>
  )
}
