'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useState } from "react"
import { registerSchema } from "@/schema/auth"
import { registerUser } from "@/services/api/auth/auth"
import { useRouter } from "next/navigation"


type FormSchema = z.infer<typeof registerSchema>

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [isLoading,setIsLoading ] = useState(false)
  const router = useRouter();
  const {toast} = useToast()

  const { register, handleSubmit, formState: { errors }  } = useForm<FormSchema>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: FormSchema) => {
    try{
      setIsLoading(true);

      await registerUser(data);

      toast({
        title:"Success",
        description:"You have successfully registered"
      })
      router.push('/dashboard')
    } catch(error){
      toast({
        title: "Error",
        description: error instanceof Error ? JSON.stringify(error.message) : "Login failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Username</Label>
                <Input
                  {...register("username")}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                />
                {errors.username && <span className="text-sm text-red-600">{errors.username.message}</span>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
                {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input {...register("password")} id="password" type="password" />
                {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input {...register("confirmPassword")} id="confirmPassword" type="password" />
                {errors.confirmPassword && <span className="text-sm text-red-600">{errors.confirmPassword.message}</span>}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
