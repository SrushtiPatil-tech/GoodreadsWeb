import KidHeader from "@/components/kids/kid-header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import KidBookCard from "@/components/kids/kid-book-card";
import ReadAloudPlayer from "@/components/kids/read-aloud-player";
import { fiveMinuteStories } from "@/data/kids-books";
import { Clock, Timer, Zap, BookOpen, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function FiveMinStories() {
  // Get the first 5-minute story for the featured section
  const featuredStory = fiveMinuteStories[0];
  
  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <KidHeader />
      
      <main className="flex-1 px-4 py-6 container mx-auto">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border-4 border-green-300 mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-700/80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2" 
            alt="Quick reading" 
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-10">
            <div className="flex items-center mb-4">
              <Clock className="h-8 w-8 text-white mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                5-Minute Stories
              </h1>
            </div>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Quick stories perfect for busy days! Just 5 minutes for a fun adventure. Great for car rides, waiting times, or anytime you need a quick story.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg">
                <Zap className="mr-2 h-5 w-5" />
                Find a Quick Story
              </Button>
              <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-xl text-lg">
                <Timer className="mr-2 h-5 w-5" />
                Start 5-Min Timer
              </Button>
            </div>
          </div>
        </div>
        
        {/* Quick Story Pick */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Sparkles className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-2xl font-bold text-green-700">Quick Story Pick</h2>
          </div>
          
          <div className="bg-white rounded-3xl border-4 border-green-300 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredStory.coverUrl} 
                  alt={`Cover of ${featuredStory.title}`}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-1/2">
                <div className="flex items-center mb-3">
                  <h3 className="text-2xl font-bold text-green-700 mr-3">{featuredStory.title}</h3>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    5 mins
                  </span>
                </div>
                <p className="text-lg text-green-600 mb-4">by {featuredStory.author}</p>
                
                <div className="bg-green-100 rounded-xl p-4 mb-6">
                  <p className="text-green-700 leading-relaxed">
                    {featuredStory.description}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/book/${featuredStory.id}`}>
                    <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg w-full">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Read Story
                    </Button>
                  </Link>
                  
                  <Button variant="outline" className="border-green-400 text-green-600 hover:bg-green-100 rounded-xl text-lg w-full">
                    <Clock className="mr-2 h-5 w-5" />
                    Listen Now
                  </Button>
                </div>
              </div>
            </div>
            
            {/* 5-Minute Timer */}
            <div className="border-t-4 border-green-200 p-6 bg-green-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xl font-bold text-green-700">5-Minute Timer</h4>
                <span className="text-xl font-mono text-green-700">05:00</span>
              </div>
              <Progress value={0} className="h-4 bg-green-200 rounded-lg" />
              <div className="flex justify-center mt-4">
                <Button className="bg-green-600 hover:bg-green-700 text-lg rounded-xl px-6">
                  <Timer className="mr-2 h-5 w-5" />
                  Start Timer
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Browse All 5-Minute Stories */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-green-700 mb-6">All 5-Minute Stories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fiveMinuteStories.map(story => (
              <KidBookCard key={story.id} book={story} />
            ))}
          </div>
        </div>
        
        {/* Categories */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-green-700 mb-6">Quick Story Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-4 border-green-300 rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9" 
                alt="Adventure"
                className="h-40 w-full object-cover"
              />
              <CardContent className="p-6 bg-green-100">
                <h3 className="text-xl font-bold text-green-700 mb-2">Adventure Stories</h3>
                <p className="text-green-600 mb-4">
                  Quick adventures that take you to exciting places!
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl w-full">
                  Explore Adventures
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-4 border-green-300 rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1471286174890-9c112ffca5b4" 
                alt="Animals"
                className="h-40 w-full object-cover"
              />
              <CardContent className="p-6 bg-green-100">
                <h3 className="text-xl font-bold text-green-700 mb-2">Animal Stories</h3>
                <p className="text-green-600 mb-4">
                  Meet friendly animals in these quick tales!
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl w-full">
                  Discover Animals
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-4 border-green-300 rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6" 
                alt="Magical"
                className="h-40 w-full object-cover"
              />
              <CardContent className="p-6 bg-green-100">
                <h3 className="text-xl font-bold text-green-700 mb-2">Magical Stories</h3>
                <p className="text-green-600 mb-4">
                  Magic and wonder in just five minutes!
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl w-full">
                  Find Magic
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* When to Use 5-Min Stories */}
        <div className="bg-white rounded-3xl border-4 border-green-300 p-6 mb-10">
          <h2 className="text-2xl font-bold text-green-700 mb-6">When to Enjoy 5-Minute Stories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-100 p-4 rounded-xl text-center">
              <div className="bg-green-200 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 3H1v18h15m8-9H8" />
                  <path d="M18.5 17.5L22 12l-3.5-5.5" />
                </svg>
              </div>
              <h3 className="font-bold text-green-700 mb-1">Car Rides</h3>
              <p className="text-green-600 text-sm">
                Perfect for short trips!
              </p>
            </div>
            
            <div className="bg-green-100 p-4 rounded-xl text-center">
              <div className="bg-green-200 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="font-bold text-green-700 mb-1">Waiting Times</h3>
              <p className="text-green-600 text-sm">
                When you need to wait!
              </p>
            </div>
            
            <div className="bg-green-100 p-4 rounded-xl text-center">
              <div className="bg-green-200 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="font-bold text-green-700 mb-1">Quick Break</h3>
              <p className="text-green-600 text-sm">
                A fun short activity!
              </p>
            </div>
            
            <div className="bg-green-100 p-4 rounded-xl text-center">
              <div className="bg-green-200 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 9V7c0-2.8-2.2-5-5-5S7 4.2 7 7v2" />
                  <rect x="3" y="9" width="18" height="13" rx="2" ry="2" />
                </svg>
              </div>
              <h3 className="font-bold text-green-700 mb-1">Before Dinner</h3>
              <p className="text-green-600 text-sm">
                Quick story before meals!
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
