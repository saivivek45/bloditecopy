"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfileSchema } from "@/schema/updateProfileSchema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import axios from "axios"
import { useSession } from "next-auth/react"

type UpdateProfileFormData = {
  email: string
  name: string
}

interface UpdateProfileFormProps {
  onSuccess?: () => void
  onCancel?: () => void
  currentEmail?: string
  currentName?: string
}

export default function UpdateProfileForm({ 
  onSuccess, 
  onCancel, 
  currentEmail = "", 
  currentName = "" 
}: UpdateProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, update } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      email: currentEmail,
      name: currentName
    }
  })

  const onSubmit = async (data: UpdateProfileFormData) => {
    setIsLoading(true)
    try {
      const response = await axios.put("/api/update-profile", data)
      toast.success(response.data.message)
      
      // Update session with new data
      await update({
        ...session,
        user: {
          ...session?.user,
          email: data.email,
          username: data.name
        }
      })
      
      onSuccess?.()
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update profile"
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>
          Update your email and username information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your username"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}