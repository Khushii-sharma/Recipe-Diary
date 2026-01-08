"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white border border-gray-200 p-6 sm:p-8 rounded-xl shadow-sm">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Login</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Enter your credentials to access your recipes
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Email Address
            </label>
            <Input 
              type="email" 
              placeholder="name@example.com" 
              className="h-11 focus-visible:ring-orange-500" 
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Password
            </label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              className="h-11 focus-visible:ring-orange-500" 
            />
          </div>

          <Button className="w-full h-11 bg-orange-600 hover:bg-orange-700 transition-all mt-2">
            Login
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-orange-600 font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}