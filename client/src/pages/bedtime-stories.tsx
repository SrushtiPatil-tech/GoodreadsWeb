import KidHeader from "@/components/kids/kid-header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KidBookCard from "@/components/kids/kid-book-card";
import ReadAloudPlayer from "@/components/kids/read-aloud-player";
import { bedtimeStories } from "@/data/kids-books";
import { Moon, Stars, Clock, SunMoon, Sparkles, BookOpen } from "lucide-react";
import { Link } from "wouter";

export default function BedtimeStories() {
  // Get the first bedtime story for the featured section
  const featuredStory = bedtimeStories[0];
  
  return (
    <div className="min-h-screen flex flex-col bg-indigo-50">
      <KidHeader />
      
      <main className="flex-1 px-4 py-6 container mx-auto">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border-4 border-indigo-300 mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1516280287949-2747a3304a2f" 
            alt="Bedtime reading" 
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-10">
            <div className="flex items-center mb-4">
              <Moon className="h-8 w-8 text-white mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Bedtime Stories
              </h1>
            </div>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Cozy up with our special collection of bedtime stories that will help you drift off to dreamland with sweet dreams and happy thoughts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg">
                <Stars className="mr-2 h-5 w-5" />
                Find a Story
              </Button>
              <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-xl text-lg">
                <SunMoon className="mr-2 h-5 w-5" />
                Set Bedtime Mode
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tonight's Special Story */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Sparkles className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-2xl font-bold text-indigo-700">Tonight's Special Story</h2>
          </div>
          
          <div className="bg-white rounded-3xl border-4 border-indigo-300 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredStory.coverUrl} 
                  alt={`Cover of ${featuredStory.title}`}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-1/2">
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">{featuredStory.title}</h3>
                <p className="text-lg text-indigo-600 mb-4">by {featuredStory.author}</p>
                
                <div className="bg-indigo-100 rounded-xl p-4 mb-6">
                  <p className="text-indigo-700 leading-relaxed">
                    {featuredStory.description}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/book/${featuredStory.id}`}>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg w-full">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Read Story
                    </Button>
                  </Link>
                  
                  <Button variant="outline" className="border-indigo-400 text-indigo-600 hover:bg-indigo-100 rounded-xl text-lg w-full">
                    <Moon className="mr-2 h-5 w-5" />
                    Listen at Bedtime
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Read Aloud Player */}
            <div className="border-t-4 border-indigo-200 p-6 bg-indigo-50">
              <h4 className="text-xl font-bold text-indigo-700 mb-4">Preview Listen</h4>
              <ReadAloudPlayer book={featuredStory} />
            </div>
          </div>
        </div>
        
        {/* Browse Stories by Category */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Browse Bedtime Stories</h2>
          
          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="bg-indigo-200 p-1 rounded-xl">
              <TabsTrigger 
                value="all" 
                className="rounded-lg px-6 py-2 text-base data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                All Stories
              </TabsTrigger>
              <TabsTrigger 
                value="short" 
                className="rounded-lg px-6 py-2 text-base data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Short & Sweet (5-10 min)
              </TabsTrigger>
              <TabsTrigger 
                value="medium" 
                className="rounded-lg px-6 py-2 text-base data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Medium (10-15 min)
              </TabsTrigger>
              <TabsTrigger 
                value="long" 
                className="rounded-lg px-6 py-2 text-base data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Longer Stories
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bedtimeStories.map(story => (
                  <KidBookCard key={story.id} book={story} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="short" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bedtimeStories.slice(0, 2).map(story => (
                  <KidBookCard key={story.id} book={story} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="medium" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bedtimeStories.slice(1, 3).map(story => (
                  <KidBookCard key={story.id} book={story} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="long" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bedtimeStories.slice(0, 3).map(story => (
                  <KidBookCard key={story.id} book={story} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Bedtime Tips */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Bedtime Reading Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-4 border-indigo-300 rounded-2xl bg-indigo-100">
              <CardContent className="pt-6">
                <div className="bg-indigo-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2">Set a Regular Time</h3>
                <p className="text-indigo-600">
                  Try to read at the same time every night. This helps your body know it's time for sleep!
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-4 border-indigo-300 rounded-2xl bg-indigo-100">
              <CardContent className="pt-6">
                <div className="bg-indigo-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <SunMoon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2">Create a Cozy Space</h3>
                <p className="text-indigo-600">
                  Dim the lights, get comfy with pillows and blankets, and snuggle up for storytime.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-4 border-indigo-300 rounded-2xl bg-indigo-100">
              <CardContent className="pt-6">
                <div className="bg-indigo-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Stars className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2">Talk About the Story</h3>
                <p className="text-indigo-600">
                  After reading, talk about your favorite parts. This helps with memory and sweet dreams!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
