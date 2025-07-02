"use client"

import { ModeToggle } from "@/components/custom/ThemeToggler"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Grid3X3, Plus } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { useState } from "react"

export default function Navbar() {
  const { data: session } = useSession()
  const email: string = session?.user?.email || ""
  const username: string = session?.user?.username || ""
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="logo-hover animate-slide-in stagger-1 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <Image src="/vaid.png" alt="Vaid PR Logo" width={40} height={40} priority />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Vaid PR Blogs</span>
          </div>
        </Link>

        {/* Right side buttons */}
        <div className="flex items-center space-x-3">
          {/* Categories Button */}
          <Link href="/categories">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="hidden sm:inline">Categories</span>
            </Button>
          </Link>

          {/* Add New Blog Button */}
          <Link href="/blog/new">
            <Button
              size="sm"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Blog</span>
            </Button>
          </Link>

          {/* Profile Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Profile" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{username}</p>
                  <p className="text-xs leading-none text-muted-foreground">{email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/profile/${session?.user?.id}`}>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <p>Profile</p>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => setLogoutDialogOpen(true)}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark Mode Toggle */}
          <ModeToggle />
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log Out</DialogTitle>
            <DialogDescription>Do you really want to logout?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="bg-red-500 text-white hover:text-black dark:hover:text-white"
                onClick={() => signOut()}
                type="button"
                variant="secondary"
              >
                Yes
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}
