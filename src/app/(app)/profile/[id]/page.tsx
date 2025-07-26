"use client"

import type { ApiResponse } from "@/types/apiResponse"
import type { Blog } from "@/types/blog"
import axios, { type AxiosError } from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import BlogCard from "@/components/custom/BlogCard"
import { Calendar, Mail, BookOpen, Settings, Lock } from "lucide-react"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import UpdateProfileForm from "@/components/custom/UpdateProfileForm"
import ChangePasswordForm from "@/components/custom/ChangePasswordForm"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"

type UserData = {
  username: string
  email?: string
  createdAt?: string
  blogs?: Blog[]
} | null

const Page = () => {
  const param = useParams<{ id: string }>()
  const id: string = param.id
  const { data: session } = useSession()

  const [data, setData] = useState<UserData>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.post<ApiResponse>(`/api/profile`, {
        id,
      })
      const userData = response?.data?.data
      setData(userData)
      // toast.success(response?.data?.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError?.response?.data?.message || "Failed to fetch user profile"
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("")
  }

  if (loading) {
    return (
      <>
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          .animate-pulse-custom {
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="animate-pulse-custom">
            {/* Profile Header Skeleton */}
            <Card className="mb-8 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex-1 space-y-4">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blogs Section Skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        
        .glass-effect {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        .mirror-effect {
          position: relative;
        }
        .mirror-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
          border-radius: inherit;
          pointer-events: none;
        }
        
        .blog-hover {
          transition: all 0.3s ease;
        }
        .blog-hover:hover {
          transform: translateY(-4px);
        }
        
        * {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-12 animate-fade-in glass-effect mirror-effect bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/30 shadow-xl">
          <CardContent className="pt-6 p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar with Initials */}
              <Avatar className="w-28 h-28 border-2 border-primary/20 animate-scale-in shadow-lg">
                <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                  {getInitials(data?.username)}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left space-y-5">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold animate-slide-in">
                    {data?.username || "Unknown User"}
                  </h1>
                  <p className="text-lg text-muted-foreground mt-2">
                    {data?.blogs?.length || 0} Article{(data?.blogs?.length || 0) !== 1 ? "s" : ""} Published
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-5 md:items-center">
                  {data?.email && (
                    <div
                      className="flex items-center gap-2 text-base text-muted-foreground animate-slide-in"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <Mail className="w-5 h-5 text-primary" />
                      <span>{data.email}</span>
                    </div>
                  )}

                  <div className="hidden md:block">
                    <Separator orientation="vertical" className="h-5" />
                  </div>

                  <div
                    className="flex items-center gap-2 text-base text-muted-foreground animate-slide-in"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Joined {formatDate(data?.createdAt)}</span>
                  </div>
                </div>

                {/* Action Buttons - Only show for own profile */}
                {session?.user?.id === id && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 animate-slide-in" style={{ animationDelay: "0.3s" }}>
                    <Dialog open={isUpdateProfileOpen} onOpenChange={setIsUpdateProfileOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Update Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <UpdateProfileForm
                          currentEmail={data?.email || ""}
                          currentName={data?.username || ""}
                          onSuccess={() => {
                            setIsUpdateProfileOpen(false)
                            loadData() // Reload profile data
                          }}
                          onCancel={() => setIsUpdateProfileOpen(false)}
                        />
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Change Password
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <ChangePasswordForm
                          onSuccess={() => setIsChangePasswordOpen(false)}
                          onCancel={() => setIsChangePasswordOpen(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blogs Section */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-semibold">Published Articles</h2>
          </div>

          {data?.blogs && data.blogs.length !== 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.blogs.map((blog, idx) => (
                <Link href={`/profile/blog/${blog.id}`} key={idx}>
                  <BlogCard blog={blog} />
                </Link>
              ))}
            </div>
          ) : (
            <Card
              className="py-16 text-center glass-effect mirror-effect bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/30 shadow-lg animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              <CardContent>
                <div className="flex flex-col items-center gap-5">
                  <div className="p-4 rounded-full bg-primary/10">
                    <BookOpen className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-3">No articles yet</CardTitle>
                    <CardDescription className="text-lg">
                      {data?.username} hasn't published any articles yet.
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}

export default Page
