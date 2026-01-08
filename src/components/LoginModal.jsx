"use client"

import { useEffect, useState, useRef } from "react"
import { X } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { toast } from "react-toastify"

export default function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", ""])
  const [generatedOtp, setGeneratedOtp] = useState("") // Store the random OTP
  const { login } = useAuth()
  
  const otpRefs = [useRef(), useRef(), useRef(), useRef()]

  useEffect(() => {
    if (!isOpen) {
      setStep("phone")
      setOtp(["", "", "", ""])
      setPhone("")
      setGeneratedOtp("")
    }
  }, [isOpen])

  // --- LOGIC: GENERATE RANDOM OTP ---
  const handlePhoneSubmit = () => {
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit number")
      return
    }
    
    // Generate a random 4-digit number
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString()
    setGeneratedOtp(randomOtp)
    
    toast.info(`Your verification code is: ${randomOtp}`, { 
      autoClose: 10000, // Keep it visible a bit longer
      position: "top-center" 
    })
    
    setStep("otp")
  }

  const handleOtpChange = (value, idx) => {
    const cleanValue = value.replace(/\D/g, "") // Only numbers
    if (!cleanValue && value !== "") return 

    const newOtp = [...otp]
    newOtp[idx] = cleanValue.substring(cleanValue.length - 1)
    setOtp(newOtp)

    // Auto-focus next
    if (cleanValue && idx < 3) {
      otpRefs[idx + 1].current.focus()
    }
  }

  const handleKeyDown = (e, idx) => {
    // Backspace: move to previous
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs[idx - 1].current.focus()
    }
    // Enter: Process Verification
    if (e.key === "Enter") {
      if (step === "phone") {
        handlePhoneSubmit()
      } else {
        handleVerify()
      }
    }
  }

  const handleVerify = () => {
    const enteredOtp = otp.join("")
    if (enteredOtp.length !== 4) {
      toast.warn("Please enter the 4-digit code")
      return
    }

    if (enteredOtp === generatedOtp) {
      login(phone)
      toast.success("Login successful!")
    } else {
      toast.error("Invalid code. Please try again.")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
      
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] animate-in fade-in duration-300" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl p-8 pt-4 sm:pt-10 animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" onClick={(e) => e.stopPropagation()}>
        
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />

        <button onClick={onClose} className="hidden sm:flex absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X size={20} className="text-gray-400" />
        </button>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {step === "phone" ? "Login" : "Confirm Code"}
          </h2>
          <p className="text-gray-500 mt-2 text-base">
            {step === "phone" ? "Join RecipeDiary to save your favorite dishes." : `We sent a code to +91 ${phone}`}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {step === "phone" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-14 px-4 rounded-2xl bg-gray-50 border border-gray-100 font-semibold text-gray-700">+91</div>
                <input
                  type="tel"
                  autoFocus
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => handleKeyDown(e, 0)}
                  maxLength={10}
                  placeholder="Mobile number"
                  className="flex-1 h-14 bg-gray-50 border border-gray-100 rounded-2xl px-5 text-lg font-medium focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                />
              </div>
              <button onClick={handlePhoneSubmit} className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98]">
                Send Verification Code
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between gap-3 max-w-70 mx-auto sm:mx-0">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpRefs[idx]}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    autoFocus={idx === 0}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="w-14 h-16 text-center text-2xl font-bold border-2 border-gray-100 rounded-2xl bg-gray-50 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                    maxLength={1}
                  />
                ))}
              </div>
              <button
                onClick={handleVerify}
                className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98]"
              >
                Verify & Login
              </button>
              <button 
                onClick={() => setStep("phone")} 
                className="w-full text-sm text-gray-400 font-medium hover:text-orange-500 transition-colors"
              >
                Change Phone Number
              </button>
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400 leading-relaxed px-4">
          By continuing, you agree to our <span className="underline cursor-pointer">Terms</span> and <span className="underline cursor-pointer">Privacy</span>.
        </p>
      </div>
    </div>
  )
}