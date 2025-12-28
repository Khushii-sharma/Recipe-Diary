"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 border p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <Input type="email" placeholder="Email" className="mb-3" />
        <Input type="password" placeholder="Password" className="mb-4" />

        <Button className="w-full">Login</Button>
      </div>
    </div>
  )
}
