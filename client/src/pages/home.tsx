import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BookGrid from "@/components/books/book-grid";
import KidHeader from "@/components/kids/kid-header";
import KidBookCard from "@/components/kids/kid-book-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { featuredBooks, books, booksWithAudio } from "@/data/books";
import { kidsBooks } from "@/data/kids-books";
import { useMode } from "@/hooks/use-mode";
import { Link } from "wouter";
import { 
  BookOpen, 
  BookMarked,
  Headphones, 
  Star, 
  BarChart3,
  MoveRight,
  Baby,
  Trophy,
  Moon,
  Clock,
  ShoppingCart,
  Apple,
  Mail
} from "lucide-react";

export default function Home() {
  const { isKidsMode } = useMode();
  const [activeTab, setActiveTab] = useState("featured");
  
  // Redirect to kids home page if in kids mode
  if (isKidsMode) {
    return <KidsHome />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero section - Goodreads style */}
      <div className="flex flex-col bg-[#f9f7f1]">
        {/* Main hero area */}
        <div className="w-full mx-auto px-4 flex flex-col lg:flex-row">
          {/* Left side (Meet your next favorite book) */}
          <div className="w-full lg:w-2/3 py-12 px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-serif text-[#704838] mb-10">
                Meet your next<br />favorite book.
              </h1>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                <div>
                  <h3 className="text-lg font-medium text-[#704838] mb-3">Deciding what to read next?</h3>
                  <p className="text-sm text-[#704838]">
                    You're in the right place. Tell us what titles or genres you've enjoyed in the past, and we'll give you surprisingly insightful recommendations.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-[#704838] mb-3">What are your friends reading?</h3>
                  <p className="text-sm text-[#704838]">
                    Chances are your friends are discussing their favorite (and least favorite) books on Goodreads.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side (Login/signup options) */}
          <div className="w-full lg:w-1/3 bg-white p-6 lg:p-8">
            <div className="max-w-xs mx-auto space-y-4">
              <h3 className="text-lg text-center font-medium mb-6">Discover & read more</h3>
              
              <Button className="w-full h-12 bg-[#f7d44c] hover:bg-[#f0c333] text-[#333333] border border-[#ccac3a]">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Continue with Amazon
              </Button>
              
              <Button variant="outline" className="w-full h-12 border-[#d6d6d6] text-[#333333]">
                <Apple className="mr-2 h-4 w-4" />
                Continue with Apple
              </Button>
              
              <Button className="w-full h-12 bg-[#412509] hover:bg-[#59340d] text-white">
                <Mail className="mr-2 h-4 w-4" />
                Sign up with email
              </Button>
              
              <div className="text-xs text-center text-gray-500 pt-2">
                By creating an account, you agree to the Goodreads 
                <Link href="#">
                  <span className="text-blue-600 hover:underline cursor-pointer"> Terms of Service </span>
                </Link>
                and 
                <Link href="#">
                  <span className="text-blue-600 hover:underline cursor-pointer"> Privacy Policy</span>
                </Link>
              </div>
              
              <div className="text-sm text-center pt-4">
                Already a member? 
                <Link href="#">
                  <span className="text-green-700 hover:underline font-medium ml-1 cursor-pointer">Sign In</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Book Match Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Take our personalized quiz to find your perfect next read based on your preferences.
              </p>
              <Link href="/book-match">
                <Button variant="outline" size="sm" className="w-full">
                  Take Quiz
                  <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Reading Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Track your reading progress, set goals, and get estimates on when you'll finish.
              </p>
              <Link href="/reading-tracker">
                <Button variant="outline" size="sm" className="w-full">
                  View Tracker
                  <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Baby className="h-5 w-5 mr-2 text-primary" />
                Kid Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                A safe, fun reading environment with bedtime stories and read-aloud options.
              </p>
              <Link href="/kids-mode">
                <Button variant="outline" size="sm" className="w-full">
                  Explore Kid Mode
                  <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* Books Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="featured" onValueChange={setActiveTab} value={activeTab}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Discover Books</h2>
              <TabsList>
                <TabsTrigger value="featured" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Featured
                </TabsTrigger>
                <TabsTrigger value="trending" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Trending
                </TabsTrigger>
                <TabsTrigger value="audiobooks" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Audiobooks
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="featured" className="mt-0">
              <BookGrid books={featuredBooks} featured={true} />
            </TabsContent>
            
            <TabsContent value="trending" className="mt-0">
              <BookGrid books={books.slice(4, 8)} />
            </TabsContent>
            
            <TabsContent value="audiobooks" className="mt-0">
              <BookGrid books={booksWithAudio.slice(0, 4)} />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Subscription Promo */}
        <div className="mb-12">
          <Card className="bg-secondary/50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <Trophy className="text-primary mr-2 h-5 w-5" />
                    Premium Subscription
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Get unlimited access to ebooks, audiobooks, and enhanced tracking features.
                  </p>
                  <Link href="/subscription">
                    <Button>
                      View Plans
                      <MoveRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">1M+</div>
                    <div className="text-sm text-muted-foreground">Ebooks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">50K+</div>
                    <div className="text-sm text-muted-foreground">Audiobooks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">$9.99</div>
                    <div className="text-sm text-muted-foreground">Monthly</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

// Kids Home page component when in Kids Mode
function KidsHome() {
  return (
    <div className="min-h-screen flex flex-col bg-violet-50">
      {/* Custom kid header */}
      <KidHeader />
      
      <main className="flex-1 px-4 py-6 container mx-auto">
        {/* Fun welcome banner for kids */}
        <section className="mb-8">
          <div className="relative rounded-3xl overflow-hidden border-4 border-violet-400">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/80 to-indigo-600/60 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9" 
              alt="Kids reading" 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-in slide-in-from-top duration-300">
                Welcome to KidReads!
              </h1>
              <p className="text-xl text-white/90 mb-6 max-w-xl animate-in slide-in-from-left duration-300 delay-150">
                Discover fun stories, bedtime adventures, and magical tales just for you!
              </p>
              <div className="flex flex-wrap gap-4 animate-in slide-in-from-bottom duration-300 delay-300">
                <Link href="/bedtime-stories">
                  <Button size="lg" className="bg-violet-700 hover:bg-violet-800 text-white rounded-xl text-lg">
                    <Moon className="mr-2 h-5 w-5" />
                    Bedtime Stories
                  </Button>
                </Link>
                <Link href="/five-min-stories">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg">
                    <Clock className="mr-2 h-5 w-5" />
                    5-Minute Stories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Fun book suggestions */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-violet-800 mb-6">Stories You'll Love</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {kidsBooks.slice(0, 4).map((book) => (
              <KidBookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
        
        {/* Bedtime vs Quick Stories */}
        <section className="mb-10">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1476234251651-f353703a034d" 
                  alt="Child reading at bedtime" 
                  className="w-full aspect-video object-cover rounded-xl mb-4"
                />
                <h2 className="text-2xl font-bold text-violet-700 mb-4">
                  Bedtime Stories
                </h2>
                <p className="text-lg text-violet-600 mb-6">
                  Perfect for winding down at night with magical adventures and sweet dreams!
                </p>
                <Link href="/bedtime-stories">
                  <Button size="lg" className="bg-violet-600 hover:bg-violet-700 rounded-xl text-lg">
                    <Moon className="mr-2 h-5 w-5" />
                    Bedtime Stories
                  </Button>
                </Link>
              </div>
              
              <div className="md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1555344090-8f8556dabe3f" 
                  alt="Child reading a short story" 
                  className="w-full aspect-video object-cover rounded-xl mb-4"
                />
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  Just 5 Minutes?
                </h2>
                <p className="text-lg text-green-600 mb-6">
                  Short on time? Check out our quick 5-minute stories for a fast adventure!
                </p>
                <Link href="/five-min-stories">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 rounded-xl text-lg">
                    <Clock className="mr-2 h-5 w-5" />
                    5-Minute Stories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}