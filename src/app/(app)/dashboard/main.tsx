"use client"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import BlogCard from "@/components/custom/BlogCard"
import { searchSchmema } from "@/schema/searchSchema"
import type { Blog } from "@/types/blog"
import axios, { type AxiosError } from "axios"
import type { ApiResponse } from "@/types/apiResponse"
import { toast } from "sonner"
import Link from "next/link"

const BlogApp = () => {
  
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showClearButton, setShowClearButton] = useState<boolean>(false)
  const blogCache = useRef<Blog[] | null>(null)

  const form = useForm<z.infer<typeof searchSchmema>>({
    resolver: zodResolver(searchSchmema),
    defaultValues: {
      query: "",
    },
  })

  const { handleSubmit, register, watch, setValue } = form
  const query = watch("query")

  const loadAllBlogs = async () => {
    if (blogCache.current) {
      setBlogs(blogCache.current)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.get<ApiResponse>("/api/blog/getAllBlogs")
      toast(response.data.message)
      setBlogs(response.data.data)
      blogCache.current = response.data.data 
    } catch (error) {
      console.error("Error during fetching:", error)
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message || "Api request failed for fetch"
      toast(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAllBlogs()
  }, [])

  useEffect(() => {
    setShowClearButton(query.trim().length > 0)

    const delayDebounce = setTimeout(() => {
      if (query.trim() === "") {
        loadAllBlogs()
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [query])

  const onSearch = async (data: z.infer<typeof searchSchmema>) => {
    setIsSearching(true)
    try {
      const response = await axios.get<ApiResponse>(`/api/blog/getBlogByParam?id=${data.query}`)
      toast(response.data.message)
      setBlogs(response.data.data)
    } catch (error) {
      console.error("Error during fetching:", error)
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message || "Api request failed for fetch"
      toast(errorMessage)
    } finally {
      setIsSearching(false)
    }
  }

  const handleClearSearch = () => {
    setValue("query", "")
    loadAllBlogs() 
  }

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-48 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header Section */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              Professional Blog Hub
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Discover insights, tutorials, and expert opinions on the latest in technology and development
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto animate-slide-up">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-2">
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative group">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4 transition-colors duration-200 group-focus-within:text-blue-500" />
                          <Input
                            placeholder="Search blogs by title, category, or author..."
                            className="pl-10 pr-10 h-12 text-base bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500"
                            {...field}
                          />
                          {showClearButton && (
                            <button
                              type="button"
                              onClick={handleClearSearch}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSearching}
                  className="h-12 px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </header>

      {/* Blog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <LoadingSkeleton />
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-300">
                <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2 transition-colors duration-300">
                No blogs found matching your search criteria.
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm transition-colors duration-300">
                Try adjusting your search terms or browse all available blogs.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="animate-fade-in-up opacity-0"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <Link href={`/blog/${blog.id}`}>
                    <BlogCard blog={blog}/>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for dark mode */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }

        .dark ::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.5);
        }

        .dark ::-webkit-scrollbar-thumb:hover {
          background: rgba(75, 85, 99, 0.7);
        }
      `}</style>
    </div>
  )
}

export default BlogApp
