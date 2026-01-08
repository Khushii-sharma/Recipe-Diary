"use client"

import { useEffect, useState, useRef } from "react"
import { X } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { toast } from "react-toastify"

export default function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", ""])
  const [generatedOtp, setGeneratedOtp] = useState("")
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

  const handlePhoneSubmit = () => {
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit number")
      return
    }
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString()
    setGeneratedOtp(randomOtp)
    
    toast.info(`Your code is: ${randomOtp}`, { 
      autoClose: 10000,
      position: "top-center" 
    })
    setStep("otp")
  }

  const handleOtpChange = (value, idx) => {
    const cleanValue = value.replace(/\D/g, "")
    if (!cleanValue && value !== "") return 

    const newOtp = [...otp]
    newOtp[idx] = cleanValue.substring(cleanValue.length - 1)
    setOtp(newOtp)

    if (cleanValue && idx < 3) {
      otpRefs[idx + 1].current.focus()
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs[idx - 1].current.focus()
    }
    if (e.key === "Enter") {
      step === "phone" ? handlePhoneSubmit() : handleVerify()
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
      toast.error("Invalid code.")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-100 flex flex-col justify-end sm:justify-center items-center">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in slide-in-from-bottom-full duration-300">
        
        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-6 pt-4 pb-10 sm:p-10">
          {/* Mobile Handle */}
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />

          <button onClick={onClose} className="hidden sm:flex absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full">
            <X size={20} className="text-gray-400" />
          </button>

          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {step === "phone" ? "Login" : "Confirm Code"}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              {step === "phone" ? "Join RecipeDiary to save your favorite dishes." : `We sent a code to +91 ${phone}`}
            </p>
          </div>

          <div className="mt-8">
            {step === "phone" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-14 w-16 rounded-2xl bg-gray-50 border border-gray-200 font-bold text-gray-700">+91</div>
                  <input
                    type="tel"
                    autoFocus
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => handleKeyDown(e, 0)}
                    maxLength={10}
                    placeholder="Mobile number"
                    className="flex-1 h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-lg focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                  />
                </div>
                <button onClick={handlePhoneSubmit} className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95">
                  Send Verification Code
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center gap-2 sm:gap-4">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={otpRefs[idx]}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                      maxLength={1}
                    />
                  ))}
                </div>
                <button onClick={handleVerify} className="w-full h-14 bg-orange-600 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
                  Verify & Login
                </button>
                <button onClick={() => setStep("phone")} className="w-full text-sm text-gray-400 font-medium hover:text-orange-500">
                  Change Phone Number
                </button>
              </div>
            )}
          </div>

          <p className="mt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest">
            By continuing, you agree to our Terms & Privacy
          </p>
        </div>
      </div>
    </div>
  )
}