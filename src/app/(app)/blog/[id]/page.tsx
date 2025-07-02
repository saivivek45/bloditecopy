"use client"

import { use } from "react"
import type { Blog } from "@/types/blog"
import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Calendar, Tag, Clock, Eye, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import "highlight.js/styles/github-dark.css"
import { ApiResponse } from "@/types/apiResponse"
import { useParams } from "next/navigation"

export default function BlogPage() {
  const params = useParams<{ id: string }>();
  const id: string = params.id;

  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"preview" | "raw">("preview")


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true)
        const response = await axios.post<ApiResponse>(`/api/blog/getBlogById`, {
          id,
        })

        toast.success(response.data.message)
        setBlog(response.data.data)
      } catch (error) {
        console.error("Error during fetching:", error)
        const axiosError = error as AxiosError<ApiResponse>
        const errorMessage = axiosError.response?.data.message || "API request failed for fetch"
        toast.error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(" ").length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }

  // Enhanced markdown components with better styling
  const markdownComponents = {
    h1: ({ children }: any) => (
      <h1
        className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 scroll-mt-20"
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2
        className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-gray-900 dark:text-white scroll-mt-20"
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white scroll-mt-20"
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
      >
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg md:text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white scroll-mt-20">
        {children}
      </h4>
    ),
    p: ({ children }: any) => (
      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{children}</p>
    ),
    ul: ({ children }: any) => <ul className="mb-6 space-y-2 text-gray-700 dark:text-gray-300 pl-6">{children}</ul>,
    ol: ({ children }: any) => (
      <ol className="mb-6 space-y-2 text-gray-700 dark:text-gray-300 pl-6 list-decimal">{children}</ol>
    ),
    li: ({ children }: any) => (
      <li className="flex items-start gap-3 mb-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0" />
        <span className="flex-1">{children}</span>
      </li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 p-6 my-8 rounded-r-lg relative">
        <div className="text-gray-700 dark:text-gray-300 italic text-lg">{children}</div>
        <div className="absolute top-4 right-4 text-blue-500/30 text-6xl font-serif">"</div>
      </blockquote>
    ),
    code: ({ children, className }: any) => {
      const isInline = !className
      if (isInline) {
        return (
          <code className="bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 px-2 py-1 rounded text-sm font-mono border">
            {children}
          </code>
        )
      }
      return <code className={className}>{children}</code>
    },
    pre: ({ children }: any) => (
      <div className="relative group my-6">
        <pre className="bg-gray-900 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 overflow-x-auto">
          {children}
        </pre>
        <Button
          size="sm"
          variant="outline"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 text-black dark:text-white"
          onClick={() => {
            const code = children?.props?.children
            if (code) {
              navigator.clipboard.writeText(code)
              toast.success("Code copied to clipboard!")
            }
          }}
        >
          Copy
        </Button>
      </div>
    ),
    a: ({ children, href }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 hover:decoration-blue-600 dark:hover:decoration-blue-400 transition-colors"
      >
        {children}
      </a>
    ),
    img: ({ src, alt }: any) => (
      <div className="my-8 text-center">
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="max-w-full h-auto rounded-lg shadow-lg mx-auto border border-gray-200 dark:border-gray-700"
        />
        {alt && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">{alt}</p>}
      </div>
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>,
    th: ({ children }: any) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
        {children}
      </td>
    ),
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto p-4">
          <Card className="overflow-hidden border-0 shadow-2xl bg-white dark:bg-gray-900">
            <div className="relative">
              <Skeleton className="w-full h-72 md:h-96 lg:h-[28rem]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute top-8 left-8">
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>

            <CardContent className="p-8 md:p-12 lg:p-16">
              <div className="space-y-8">
                <div className="flex flex-wrap items-center gap-8">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>

                <div className="space-y-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-4/5" />
                </div>

                <div className="space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                </div>

                <div className="space-y-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className={`h-4 ${i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-5/6" : "w-4/5"}`} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="p-12 text-center max-w-md mx-auto">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Tag className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  const content = (blog as any).content || ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto p-4">
        <Card className="overflow-hidden border-0 shadow-2xl bg-white dark:bg-gray-900">
          {/* Hero Image Section */}
          <div className="relative group overflow-hidden">
            <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <img
                src={blog.imageURL || "/placeholder.svg?height=500&width=1200"}
                alt={blog.title}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute top-8 left-8">
              <Badge
                variant="secondary"
                className="bg-white/95 dark:bg-gray-800/95 text-gray-900 dark:text-white backdrop-blur-md border-0 shadow-xl px-4 py-2 text-sm font-medium"
              >
                <Tag className="w-4 h-4 mr-2" />
                {blog.category || "Uncategorized"}
              </Badge>
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                {blog.title}
              </h1>
            </div>
          </div>

          <CardContent className="p-8 md:p-12 lg:p-16">
            <div className="space-y-8">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.author?.username || "Anonymous"}`}
                    />
                    <AvatarFallback className="text-sm font-semibold">
                      {(blog.author?.username || "A").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {blog.author?.username || "Anonymous"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">{formatDate(blog.createdAt)}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{getReadingTime(content)} min read</span>
                </div>
              </div>

              {/* Description */}
              {blog.description && (
                <div>
                  <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                    {blog.description}
                  </p>
                </div>
              )}

              {/* Content Tabs */}
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "preview" | "raw")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="preview" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="raw" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Raw Markdown
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-0">
                  <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      rehypePlugins={[rehypeHighlight, rehypeSlug]}
                      components={markdownComponents}
                    >
                      {content || "No content available."}
                    </ReactMarkdown>
                  </div>
                </TabsContent>

                <TabsContent value="raw" className="mt-0">
                  <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed overflow-x-auto">
                        {content || "No content available."}
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Footer */}
              <div className="pt-12 mt-16 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.author?.username || "Anonymous"}`}
                      />
                      <AvatarFallback className="text-lg font-bold">
                        {(blog.author?.username || "A").charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="font-bold text-lg text-gray-900 dark:text-white">
                        {blog.author?.username || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Content Author</p>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 px-4 py-2 text-sm font-semibold"
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    {blog.category || "Uncategorized"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
