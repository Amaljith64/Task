import { LoginForm } from '@/components/auth/login-form'
import React from 'react'
import { cookies } from 'next/headers'

type Props = {}

const page = async (props: Props)  => {
  const cookieStore = await cookies()
  console.log(cookieStore.get('access_token'),'cookieStorecookieStore');
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