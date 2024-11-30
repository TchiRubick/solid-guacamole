'use client'

import { Button } from "@/components/ui/button"
import { XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const NotAuthorized = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-6">
        <XCircle className="w-24 h-24 text-destructive mx-auto" />
        <h1 className="text-4xl font-bold tracking-tight">Not Authorized</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Sorry, you don't have permission to access this page.
        </p>
        <Button
          onClick={() => router.push('/')}
          size="lg"
        >
          Go to Home Page
        </Button>
      </div>
    </div>
  )
}
