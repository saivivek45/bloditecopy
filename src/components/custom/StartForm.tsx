"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, ImageIcon, Tag, Type, Sparkles, Send } from "lucide-react"
import MDEditor from "@uiw/react-md-editor"
import { formSchema } from "@/schema/formSchema"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { categories, type CategoryOption } from "@/types/categoryType"
import { useSession } from "next-auth/react"
import axios, { type AxiosError } from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { ApiResponse } from "@/types/apiResponse"

const page = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [blogPitch, setBlogPitch] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      content: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>): Promise<void> => {
    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/blog/new", {
        email: session?.user?.email,
        title: data.title,
        description: data.description,
        category: data.category,
        imageUrl: data.imageUrl,
        content: data.content,
      })
      toast(response.data.message)
      router.replace("/dashboard")
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFieldFocus = (fieldName: string): void => {
    setFocusedField(fieldName)
  }

  const handleFieldBlur = (): void => {
    setFocusedField(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 text-gray-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-700">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-indigo-100/10 dark:from-slate-800/30 dark:via-transparent dark:to-slate-700/20 transition-all duration-700"></div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Elegant Header */}
        <div className="text-center mb-16 animate-[fadeInUp_1s_ease-out]">
          <div className="inline-flex items-center gap-4 mb-6 p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-blue-200/30 dark:border-slate-600/40 shadow-lg shadow-blue-100/20 dark:shadow-slate-800/30">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 shadow-md animate-[gentlePulse_3s_ease-in-out_infinite]">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-light bg-gradient-to-r from-gray-800 to-blue-800 dark:from-gray-200 dark:to-slate-300 bg-clip-text text-transparent tracking-wide">
                Create Blog Post
              </h1>
            </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-light animate-[fadeInUp_1s_ease-out_0.3s_both]">
            Craft your story with elegance and precision
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
            {/* All form inputs centered */}
            <div className="space-y-8">
              {/* Title */}
              <Card className="group bg-white/70 border-blue-200/40 dark:bg-slate-800/70 dark:border-slate-600/30 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-700/90 transition-all duration-500 animate-[slideInUp_0.8s_ease-out] hover:shadow-xl hover:shadow-blue-200/30 dark:hover:shadow-indigo-900/30 hover:-translate-y-1 hover:border-blue-300/60 dark:hover:border-indigo-600/60">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Type
                      className={`h-5 w-5 transition-all duration-300 ${focusedField === "title" ? "text-blue-600 dark:text-blue-400 scale-110" : "text-blue-500 dark:text-blue-500"}`}
                    />
                    <CardTitle className="text-xl font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                      Article Title
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your article title..."
                            onFocus={() => handleFieldFocus("title")}
                            onBlur={handleFieldBlur}
                            className="bg-white/90 border-gray-300/70 text-gray-800 placeholder:text-gray-500 dark:bg-slate-700/60 dark:border-slate-500/50 dark:text-gray-200 dark:placeholder:text-slate-300 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200/50 dark:focus:ring-blue-800/30 transition-all duration-300 focus:shadow-md focus:shadow-blue-200/20 dark:focus:shadow-blue-900/20 text-lg py-3"
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red-500 mt-2 animate-[shake_0.5s_ease-in-out]" />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="group bg-white/70 border-emerald-200/40 dark:bg-slate-800/70 dark:border-slate-600/30 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-700/90 transition-all duration-500 animate-[slideInUp_0.8s_ease-out_0.1s_both] hover:shadow-xl hover:shadow-emerald-200/30 dark:hover:shadow-emerald-900/30 hover:-translate-y-1 hover:border-emerald-300/60 dark:hover:border-emerald-600/60">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Sparkles
                      className={`h-5 w-5 transition-all duration-300 ${focusedField === "description" ? "text-emerald-600 dark:text-emerald-400 scale-110" : "text-emerald-500 dark:text-emerald-500"}`}
                    />
                    <CardTitle className="text-xl font-medium text-gray-800 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                      Description
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-300 font-light">
                    A compelling summary that captures your reader's attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Write a thoughtful description that introduces your article..."
                            className="resize-none transition-all duration-300 bg-white/90 border-gray-300/70 text-gray-800 placeholder:text-gray-500 dark:bg-slate-700/60 dark:border-slate-500/50 dark:text-gray-200 dark:placeholder:text-slate-300 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-200/50 dark:focus:ring-emerald-800/30 focus:shadow-md focus:shadow-emerald-200/20 dark:focus:shadow-emerald-900/20"
                            onFocus={() => handleFieldFocus("description")}
                            onBlur={handleFieldBlur}
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red-500 mt-2 animate-[shake_0.5s_ease-in-out]" />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Category and Image URL in a row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Category */}
                <Card className="group bg-white/70 border-amber-200/40 dark:bg-slate-800/70 dark:border-slate-600/30 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-700/90 transition-all duration-500 animate-[slideInLeft_0.8s_ease-out_0.2s_both] hover:shadow-xl hover:shadow-amber-200/30 dark:hover:shadow-amber-900/30 hover:-translate-y-1 hover:border-amber-300/60 dark:hover:border-amber-600/60">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <Tag
                        className={`h-5 w-5 transition-all duration-300 ${focusedField === "category" ? "text-amber-600 dark:text-amber-400 scale-110" : "text-amber-500 dark:text-amber-500"}`}
                      />
                      <CardTitle className="text-xl font-medium text-gray-800 dark:text-gray-200 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors duration-300">
                        Category
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value)
                              }}
                              value={field.value}
                            >
                              <SelectTrigger
                                className="transition-all duration-300 bg-white/90 border-gray-300/70 text-gray-800 dark:bg-slate-700/60 dark:border-slate-500/50 dark:text-gray-200 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-amber-200/50 dark:focus:ring-amber-800/30 focus:shadow-md focus:shadow-amber-200/20 dark:focus:shadow-amber-900/20 py-3"
                                onFocus={() => handleFieldFocus("category")}
                                onBlur={handleFieldBlur}
                              >
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-gray-200 dark:bg-slate-800 dark:border-slate-600">
                                {categories.map((category: CategoryOption) => (
                                  <SelectItem
                                    key={category.value}
                                    value={category.value}
                                    className="transition-colors duration-200 text-gray-800 hover:bg-amber-50 focus:bg-amber-50 dark:text-gray-200 dark:hover:bg-slate-600 dark:focus:bg-slate-600"
                                  >
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-sm text-red-500 mt-2 animate-[shake_0.5s_ease-in-out]" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Image URL */}
                <Card className="group bg-white/70 border-violet-200/40 dark:bg-slate-800/70 dark:border-slate-600/30 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-700/90 transition-all duration-500 animate-[slideInRight_0.8s_ease-out_0.2s_both] hover:shadow-xl hover:shadow-violet-200/30 dark:hover:shadow-violet-900/30 hover:-translate-y-1 hover:border-violet-300/60 dark:hover:border-violet-600/60">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <ImageIcon
                        className={`h-5 w-5 transition-all duration-300 ${focusedField === "imageUrl" ? "text-violet-600 dark:text-violet-400 scale-110" : "text-violet-500 dark:text-violet-500"}`}
                      />
                      <CardTitle className="text-xl font-medium text-gray-800 dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors duration-300">
                        Featured Image
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://example.com/image.jpg"
                              onFocus={() => handleFieldFocus("imageUrl")}
                              onBlur={handleFieldBlur}
                              className="bg-white/90 border-gray-300/70 text-gray-800 placeholder:text-gray-500 dark:bg-slate-700/60 dark:border-slate-500/50 dark:text-gray-200 dark:placeholder:text-slate-300 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-violet-200/50 dark:focus:ring-violet-800/30 transition-all duration-300 focus:shadow-md focus:shadow-violet-200/20 dark:focus:shadow-violet-900/20 py-3"
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-500 mt-2 animate-[shake_0.5s_ease-in-out]" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Blog Content */}
            <Card className="group bg-white/70 border-indigo-200/40 dark:bg-slate-800/70 dark:border-slate-600/30 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-700/90 transition-all duration-500 animate-[slideInUp_0.8s_ease-out_0.3s_both] hover:shadow-xl hover:shadow-indigo-200/30 dark:hover:shadow-indigo-900/30 hover:-translate-y-1 hover:border-indigo-300/60 dark:hover:border-indigo-600/60">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <FileText
                    className={`h-5 w-5 transition-all duration-300 ${focusedField === "blogPitch" ? "text-indigo-600 dark:text-indigo-400 scale-110" : "text-indigo-500 dark:text-indigo-500"}`}
                  />
                  <CardTitle className="text-xl font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
                    Article Content
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-300 font-light">
                  Write your complete article using Markdown formatting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MDEditor
                          value={blogPitch}
                          onChange={(value?: string) => {
                            field.onChange(value || "")
                            setBlogPitch(value || "")
                          }}
                          preview="edit"
                          height={400}
                          data-color-mode="light"
                          className="dark:[&>*]:!bg-slate-800 dark:[&>*]:!text-white dark:[&>*]:!border-slate-600 dark:[&_.w-md-editor-toolbar]:!bg-slate-800 dark:[&_.w-md-editor-toolbar_button]:!text-white dark:[&_.w-md-editor-toolbar_button]:!bg-slate-700 dark:[&_.w-md-editor-toolbar_button:hover]:!bg-slate-600 dark:[&_.w-md-editor-text]:!bg-slate-700 dark:[&_.w-md-editor-text]:!text-white dark:[&_.w-md-editor-text]:!border-slate-600"
                          onFocus={() => handleFieldFocus("blogPitch")}
                          onBlur={handleFieldBlur}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500 mt-2 animate-[shake_0.5s_ease-in-out]" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-8 animate-[slideInUp_0.8s_ease-out_0.4s_both]">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-16 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 dark:from-blue-500 dark:to-indigo-600 dark:hover:from-blue-600 dark:hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-400/25 dark:hover:shadow-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 group relative overflow-hidden"
              >
                <div className="relative flex items-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="animate-pulse">Publishing Article...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      <span>Publish Article</span>
                    </>
                  )}
                </div>
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <style jsx global>{`
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gentlePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
      `}</style>
    </div>
  )
}

export default page
