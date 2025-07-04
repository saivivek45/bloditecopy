"use client"

import { useEffect, useState } from "react"
import { categories } from "@/types/categoryType"
import CategoryCard from "@/components/custom/CategoryCard"
import axios, { type AxiosError } from "axios"
import type { ApiResponse } from "@/types/apiResponse"
import { toast } from "sonner"
import BlogCard from "./BlogCard"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { CheckCircle2Icon, Terminal } from "lucide-react"
import Link from "next/link"
import { Blog } from "@/types/blog"

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("technology")
  const [categoryData, setCategoryData] = useState<Blog[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleCategoryClick = async (categoryValue: string) => {
    setSelectedCategory(categoryValue)
  }

  const loadBlog = async () => {
    try {
      setLoading(true)
      const response = await axios.post<ApiResponse>(`/api/blog/fetchBlogByCategory`, { category: selectedCategory })
      const mianData = response.data.data
      setCategoryData(mianData)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError?.response?.data.message || "Failed to get blogs"
      toast(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlog()
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-slate-800 transition-all duration-500">
      <div className="container mx-auto px-6 py-10 space-y-10">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 text-transparent dark:text-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text">
            Categories
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Explore content across different topics</p>

          {/* Updated grid layout for smaller cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((item, index) => (
              <div
                key={index}
                className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CategoryCard
                  label={item.label}
                  value={item.value}
                  isSelected={selectedCategory === item.value}
                  onClick={handleCategoryClick}
                />
              </div>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col justify-center items-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-14 w-14 border-3 border-gray-200 dark:border-gray-700"></div>
              <div className="animate-spin rounded-full h-14 w-14 border-t-3 border-blue-600 dark:border-blue-400 absolute top-0 left-0"></div>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400 mt-4 animate-pulse">Loading content...</p>
          </div>
        )}

        {categoryData.length !== 0 ? (
          <>
            <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 animate-slide-in-right">
              <CheckCircle2Icon className="text-green-600 dark:text-green-400" />
              <AlertTitle className="text-lg font-semibold text-green-800 dark:text-green-200">Success!</AlertTitle>
              <AlertDescription className="text-base text-green-700 dark:text-green-300">
                Showing result for {selectedCategory} category
              </AlertDescription>
            </Alert>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-stagger-in"
              style={{ animationDelay: "200ms" }}
            >
              {categoryData.map((blog, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-3 hover:shadow-xl dark:hover:shadow-2xl animate-float-in group"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-400/20 dark:to-indigo-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <Link href={`/blog/${blog.id}`}>
                    <BlogCard blog={blog} />
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <Alert
            variant="destructive"
            className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 animate-shake"
          >
            <Terminal className="text-red-600 dark:text-red-400" />
            <AlertTitle className="text-lg font-semibold text-red-800 dark:text-red-200">Oops!</AlertTitle>
            <AlertDescription>No blog found</AlertDescription>
          </Alert>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float-in {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes stagger-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-3px);
          }
          75% {
            transform: translateX(3px);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-float-in {
          animation: float-in 0.7s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-stagger-in {
          animation: stagger-in 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        /* Enhanced hover effects */
        .hover\\:shadow-xl:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .dark .hover\\:shadow-2xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1);
        }
        /* Smooth transitions */
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
        }
        /* Custom border width */
        .border-3 {
          border-width: 3px;
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .dark ::-webkit-scrollbar-track {
          background: #1e293b;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .dark ::-webkit-scrollbar-thumb {
          background: #475569;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .dark ::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  )
}

export default CategoryPage
