"use client"

import type React from "react"
import { Calendar, User, Tag } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { Blog } from "@/types/blog"

interface BlogCardProps {
  blog: Blog
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 ease-out bg-white dark:bg-gray-900 cursor-pointer transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 shadow-sm p-0"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 z-10" />
        <Image
          src={blog.imageURL || "/placeholder.svg"}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors duration-200"
          >
            <Tag className="w-3 h-3 mr-1" />
            {blog.category}
          </Badge>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200 mb-3">
          {blog.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">{blog.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span className="font-medium">{blog?.author?.username ?? "unknown"}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 dark:bg-gray-600 group-hover:w-full transition-all duration-400 ease-out" />
    </Card>
  )
}

export default BlogCard
