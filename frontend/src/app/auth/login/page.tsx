import { LoginForm } from '@/components/auth/login-form'
import React from 'react'

const page = async ()  => {

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 z-0" />
      <div className="relative w-full max-w-sm">
        <LoginForm />
      </div>

    </div>
  )
}

export default page