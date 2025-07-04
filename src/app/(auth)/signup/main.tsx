"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import { useDebounceCallback } from "usehooks-ts"
import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signupSchema } from "@/schema/signupSchema"
import axios, { type AxiosError } from "axios"
import type { ApiResponse } from "@/types/apiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"


const Page = () => {
  const [userName, setUserName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debounced = useDebounceCallback(setUserName, 300)
  const router = useRouter()

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>("/api/signup", data)
      // toast(response.data.message)
      router.replace(`/login`)
    } catch (error) {
      console.error("Error during sign-up:", error)
      const axiosError = error as AxiosError<ApiResponse>

      const errorMessage = axiosError.response?.data.message || "SingUp Failed, Try Again later"
      toast(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce 2s infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .form-container {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .form-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .dark .form-container:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .input-field {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .input-field:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .dark .input-field:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .input-field:focus-within {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        .submit-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(-1px);
          transition: all 0.1s;
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .submit-button:hover::before {
          left: 100%;
        }

        .theme-toggle {
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          transform: rotate(180deg) scale(1.1);
        }

        .link-hover {
          position: relative;
          transition: all 0.3s ease;
        }

        .link-hover::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 50%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .link-hover:hover::after {
          width: 100%;
        }

        .link-hover:hover {
          transform: translateY(-1px);
        }

        .stagger-1 {
          animation-delay: 0.1s;
          opacity: 0;
        }

        .stagger-2 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .stagger-3 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .stagger-4 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .stagger-5 {
          animation-delay: 0.5s;
          opacity: 0;
        }

        .username-status {
          transition: all 0.3s ease;
        }

        .username-status.success {
          animation: bounce 0.6s ease-out;
        }

        .username-status.error {
          animation: bounce 0.6s ease-out;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-float"></div>
          <div
            className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Main Content */}
        <div className="flex justify-center items-center min-h-screen p-4 relative z-10">
          <div className="w-full max-w-md p-8 space-y-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl dark:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 form-container animate-fade-in-up">
            {/* Header */}
            <div className="text-center animate-slide-in stagger-5">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-pulse-subtle">
                Welcome to Vaid PR Blogs
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Sign up to continue with blogs
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Username Field */}
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="animate-slide-in stagger-2">
                      <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          className="input-field h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg backdrop-blur-sm"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            debounced(e.target.value)
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="animate-slide-in stagger-3">
                      <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          className="input-field h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg backdrop-blur-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="animate-slide-in stagger-4">
                      <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Create a secure password"
                          className="input-field h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg backdrop-blur-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed animate-slide-in stagger-5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </Form>

            {/* Sign In Link */}
            <div className="text-center animate-slide-in stagger-5">
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 dark:text-blue-400 font-medium link-hover">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
