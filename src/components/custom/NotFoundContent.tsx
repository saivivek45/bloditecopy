"use client"

import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { Home } from "lucide-react"
import { ModeToggle } from "./ThemeToggler"

const NotFoundContent = () => {
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(-5px);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .hover-scale {
          transition: all 0.3s ease;
        }

        .hover-scale:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .dark .hover-scale:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* Dark Mode Toggle - Top Right Corner */}
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-300">
        <div className="text-center max-w-2xl mx-auto">
          {/* Animated Image */}
          <div className="mb-8 animate-fade-in-up ">
            <div className="relative w-80 h-80 mx-auto animate-float ">
              <Image
                src="/notfound.svg"
                alt="Page not found illustration"
                width={320}
                height={320}
                className="object-contai"
                priority
              />
            </div>
          </div>

          {/* Animated 404 Text */}
          <div className="mb-6 animate-fade-in-up animation-delay-200">
            <h1 className="text-8xl font-bold text-gray-800 dark:text-gray-100 mb-4 animate-bounce-slow transition-colors duration-300">
              404
            </h1>
            <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto leading-relaxed transition-colors duration-300">
              The page you're looking for doesn't exist or has been moved to another location.
            </p>
          </div>

          {/* Animated Button */}
          <div className="animate-fade-in-up animation-delay-400">
            <Button
              asChild
              size="lg"
              className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-8 py-3 rounded-lg hover-scale transition-all duration-300"
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Additional decorative elements for dark mode */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl animate-pulse animation-delay-200"></div>
        </div>
      </div>
    </>
  )
}

export default NotFoundContent
