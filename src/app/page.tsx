"use client"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, Users, TrendingUp} from "lucide-react"
import Image from "next/image"
import { ModeToggle } from "@/components/custom/ThemeToggler"

export default function LandingPage() {
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }

        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .logo-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-hover:hover {
          transform: scale(1.05);
        }

        .login-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }

        .login-btn:active {
          transform: translateY(-1px);
        }

        .login-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .login-btn:hover::before {
          left: 100%;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dark .gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-gradient {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .dark .hero-gradient {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .dark .card-hover:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .shimmer-btn {
          background: linear-gradient(90deg, #667eea, #764ba2, #667eea);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .stagger-1 { animation-delay: 0.1s; opacity: 0; }
        .stagger-2 { animation-delay: 0.2s; opacity: 0; }
        .stagger-3 { animation-delay: 0.3s; opacity: 0; }
        .stagger-4 { animation-delay: 0.4s; opacity: 0; }
        .stagger-5 { animation-delay: 0.5s; opacity: 0; }
        .stagger-6 { animation-delay: 0.6s; opacity: 0; }
      `}</style>

      <div className="min-h-screen">
        {/* Header - Fixed with solid background */}
        <header className="fixed top-0 z-50 w-full h-16 shadow-md border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 animate-fade-in-down">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 w-full">
              {/* Logo - Far Left */}
              <Link href="/" className="logo-hover animate-slide-in stagger-1 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <Image src="/vaid.png" alt="Vaid PR Logo" width={40} height={40} priority />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Vaid PR Blogs</span>
                </div>
              </Link>

              {/* Right Side - Login Button and Mode Toggle */}
              <div className="flex items-center space-x-4">
                {/* Login Button */}
                <Link
                  href="/login"
                  className="login-btn animate-slide-in stagger-2 flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-200 bg-gray-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 no-underline"
                >
                  <svg
                    className="w-4 h-4 transition-transform duration-300 hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Login</span>
                </Link>

                {/* Dark Mode Toggle - Far Right */}
                <ModeToggle/>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-16 hero-gradien">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 dark:bg-gray-950">
            <div className="text-center max-w-4xl mx-auto">
              <div className="animate-fade-in-up stagger-1 ">
                <Badge
                  variant="secondary"
                  className="mb-6 px-4 py-2 text-sm font-medium bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800/50"
                >
                  ✨ Welcome to Professional Blogging
                </Badge>
              </div>

              <h1 className="animate-fade-in-up stagger-2 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Discover Stories That <span className="gradient-text">Inspire & Inform</span>
              </h1>

              <p className="animate-fade-in-up stagger-3 text-xl text-gray-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Dive into a world of professional insights, industry trends, and thought-provoking content crafted by
                experts in their fields.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="animate-fade-in-up stagger-1">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
                <div className="text-gray-600 dark:text-slate-300">Published Articles</div>
              </div>
              <div className="animate-fade-in-up stagger-2">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">50K+</div>
                <div className="text-gray-600 dark:text-slate-300">Monthly Readers</div>
              </div>
              <div className="animate-fade-in-up stagger-3">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">25+</div>
                <div className="text-gray-600 dark:text-slate-300">Expert Writers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="animate-fade-in-up stagger-1 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Vaid PR Blogs?
              </h2>
              <p className="animate-fade-in-up stagger-2 text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                We're committed to delivering high-quality content that drives professional growth and industry
                insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Expert Content",
                  description:
                    "Articles written by industry professionals with years of experience and proven expertise.",
                },
                {
                  icon: TrendingUp,
                  title: "Latest Trends",
                  description: "Stay ahead with insights on emerging trends and technologies shaping your industry.",
                },
                {
                  icon: Users,
                  title: "Community Driven",
                  description: "Join a community of professionals sharing knowledge and growing together.",
                },
              ].map((feature, i) => (
                <div key={i} className={`animate-fade-in-up stagger-${i + 3} text-center p-6`}>
                  <div className="animate-float inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-950/30 rounded-full mb-6">
                    <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mini Footer - Added logo image */}
        <footer className="bg-gray-100 dark:bg-slate-950 text-gray-600 dark:text-gray-400 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="animate-fade-in stagger-1">
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src="/vaid.png"
                    alt="Vaid PR Logo"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Vaid PR Blogs</span>
                </div>
                <p className="text-sm leading-relaxed">
                  Professional insights and industry expertise delivered to your inbox.
                </p>
              </div>

              <div className="animate-fade-in stagger-2">
                <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="animate-fade-in stagger-3">
                <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Categories</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Technology
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Business
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Marketing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Leadership
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="animate-fade-in stagger-4">
                <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Connect</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Newsletter
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      RSS Feed
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-300 dark:border-slate-700 mt-8 pt-8 text-center">
              <p className="text-sm">
                © 2025 Vaid PR Blogs. All rights reserved. Built with passion for professional growth.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
