import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Award, Heart, Leaf, Shield } from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="mb-6">About DreamMattress</h1>
          <p className="text-gray-600 text-lg">
            For over a decade, we've been dedicated to one mission: helping people sleep better. 
            Every mattress we create combines traditional craftsmanship with innovative technology 
            to deliver unparalleled comfort and support.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2010, DreamMattress began with a simple observation: most people weren't 
                getting the quality sleep they deserved. We set out to change that by creating 
                mattresses that combine premium materials, innovative design, and expert craftsmanship.
              </p>
              <p className="text-gray-600 mb-4">
                Today, we're proud to serve thousands of satisfied customers who wake up refreshed 
                and energized every morning. Our commitment to quality, sustainability, and customer 
                satisfaction remains as strong as ever.
              </p>
              <p className="text-gray-600">
                Every mattress is thoughtfully designed and rigorously tested to ensure it meets our 
                high standards. We believe everyone deserves a great night's sleep, and we're here 
                to make that happen.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1668089677938-b52086753f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="About us"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3">Quality First</h3>
              <p className="text-gray-600 text-sm">
                We never compromise on quality. Every mattress is crafted with the finest materials 
                and attention to detail.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3">Sustainability</h3>
              <p className="text-gray-600 text-sm">
                We're committed to eco-friendly practices and sustainable materials that are better 
                for you and the planet.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3">Customer Care</h3>
              <p className="text-gray-600 text-sm">
                Your satisfaction is our priority. We're here to help you find the perfect mattress 
                for your needs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3">Trust</h3>
              <p className="text-gray-600 text-sm">
                We stand behind our products with industry-leading warranties and a 100-night trial 
                period.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-12 text-white text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="mb-2">10,000+</div>
              <p className="text-blue-100">Happy Customers</p>
            </div>
            <div>
              <div className="mb-2">15 Years</div>
              <p className="text-blue-100">In Business</p>
            </div>
            <div>
              <div className="mb-2">4.9/5</div>
              <p className="text-blue-100">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
