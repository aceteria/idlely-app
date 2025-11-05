import { Link } from 'react-router-dom';
import { Sparkles, Target, Calendar, Palette, Zap, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">Idlely</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Achieve Your Goals with
            <span className="text-indigo-600"> AI-Powered</span> Intelligence
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Free AI scheduling and goal insights to keep you on track. Beautiful customizations to make it yours.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
          >
            Start Free Now
            <Sparkles className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything You Need, Completely Free
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
            <div className="bg-indigo-100 rounded-lg p-3 w-fit mb-4">
              <Zap className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Scheduling</h3>
            <p className="text-gray-600">
              Let AI optimize your schedule automatically. Smart recommendations based on your goals and priorities.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
            <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Insights</h3>
            <p className="text-gray-600">
              Get AI-powered goal suggestions and prioritization. Stay focused on what matters most.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
            <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Goal Management</h3>
            <p className="text-gray-600">
              Track progress, set milestones, and celebrate achievements with an intuitive interface.
            </p>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl my-20">
        <div className="text-center text-white">
          <Palette className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Make It Beautifully Yours</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Unlock premium themes and customizations to create your perfect workspace. From calming ocean blues to energizing sunset glows.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
              Ocean Breeze - $4.99
            </div>