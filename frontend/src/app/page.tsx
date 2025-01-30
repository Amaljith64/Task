'use client'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {

  return (

      <div className="h-screen bg-background flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 z-0" />
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Track Your Learning Journey
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Organize your learning resources, track your progress, and achieve your goals with our comprehensive learning management platform.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/auth/login">
                <Button size="lg">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>


    </div>
  )
}