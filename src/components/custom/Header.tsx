"use client"

import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/custom/ThemeToggler"

export default function Header() {
  return (
    <>
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }

        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }

        .logo-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-hover:hover {
          transform: scale(1.05);
        }

        .header-blur {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .stagger-1 {
          animation-delay: 0.1s;
          opacity: 0;
        }

        .stagger-2 {
          animation-delay: 0.2s;
          opacity: 0;
        }
      `}</style>

      <header className="fixed top-0 z-50 w-full h-16 shadow-md border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 header-blur animate-fade-in-down">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Logo - Far Left */}
            <Link href="/" className="logo-hover animate-slide-in stagger-1 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <Image
                  src="/vaid.png"
                  alt="Vaid PR Logo"
                  width={40}
                  height={40}
                  priority
                />
                <span className="text-xl font-bold text-gray-900 dark:text-white">Vaid PR Blogs</span>
              </div>
            </Link>

            {/* Dark Mode Toggle - Far Right */}
            <div className="animate-slide-in stagger-2 flex-shrink-0">
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
