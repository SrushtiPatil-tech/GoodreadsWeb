import { useState } from "react";
import KidHeader from "@/components/kids/kid-header";
import Footer from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import KidBookCard from "@/components/kids/kid-book-card";
import { allKidsBooks, bedtimeStories, fiveMinuteStories } from "@/data/kids-books";
import { 
  Search, 
  BookOpen, 
  Moon, 
  Clock, 
  Filter, 
  Headphones, 
  Star,
  LayoutGrid,
  LayoutList
} from "lucide-react";

export default function KidsMode() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    hasAudio: false,
    bedtimeOnly: false,
    quickReads: false,
  });
  
  // Filter books based on search and filters
  const filteredBooks = allKidsBooks.filter(book => {
    const matchesSearch = !searchTerm || 
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilters = 
      (!filters.hasAudio || book.hasAudiobook) &&
      (!filters.bedtimeOnly || book.isBedtimeStory) &&
      (!filters.quickReads || book.isFiveMinuteStory);
      
    return matchesSearch && matchesFilters;
  });

  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter]
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-violet-50">
      <KidHeader />
      
      <main className="flex-1 px-4 py-6 container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-violet-700">
          Explore Kid-Friendly Books
        </h1>
        
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-2xl border-4 border-violet-300 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-violet-500" />
              <Input
                type="text"
                placeholder="Find a story..."
                className="pl-10 border-violet-300 rounded-xl text-lg h-12 bg-violet-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <Button 
                variant="outline" 
                className={`border-violet-300 rounded-xl h-12 transition-all duration-300 transform hover:scale-105 hover:shadow-md ${filters.hasAudio ? 'bg-violet-200 text-violet-700' : ''}`}
                onClick={() => {
                  toggleFilter('hasAudio');
                  // Add a subtle animation effect
                  const button = document.activeElement as HTMLElement;
                  if (button) {
                    button.classList.add('animate-pulse');
                    setTimeout(() => button.classList.remove('animate-pulse'), 300);
                  }
                }}
              >
                <Headphones className="mr-2 h-5 w-5" />
                Read Aloud
              </Button>
              
              <Button 
                variant="outline" 
                className={`border-violet-300 rounded-xl h-12 transition-all duration-300 transform hover:scale-105 hover:shadow-md ${filters.bedtimeOnly ? 'bg-violet-200 text-violet-700' : ''}`}
                onClick={() => {
                  toggleFilter('bedtimeOnly');
                  // Add a subtle animation effect
                  const button = document.activeElement as HTMLElement;
                  if (button) {
                    button.classList.add('animate-pulse');
                    setTimeout(() => button.classList.remove('animate-pulse'), 300);
                  }
                }}
              >
                <Moon className="mr-2 h-5 w-5" />
                Bedtime
              </Button>
              
              <Button 
                variant="outline" 
                className={`border-violet-300 rounded-xl h-12 transition-all duration-300 transform hover:scale-105 hover:shadow-md ${filters.quickReads ? 'bg-violet-200 text-violet-700' : ''}`}
                onClick={() => {
                  toggleFilter('quickReads');
                  // Add a subtle animation effect
                  const button = document.activeElement as HTMLElement;
                  if (button) {
                    button.classList.add('animate-pulse');
                    setTimeout(() => button.classList.remove('animate-pulse'), 300);
                  }
                }}
              >
                <Clock className="mr-2 h-5 w-5" />
                Quick Reads
              </Button>
              
              <div className="flex items-center space-x-2 pl-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-lg ${viewMode === 'grid' ? 'bg-violet-200 text-violet-700' : ''}`}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-lg ${viewMode === 'list' ? 'bg-violet-200 text-violet-700' : ''}`}
                  onClick={() => setViewMode("list")}
                >
                  <LayoutList className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="mb-6 bg-violet-200 p-1 rounded-xl">
            <TabsTrigger 
              value="all" 
              className="rounded-lg px-6 py-2 text-base data-[state=active]:bg-violet-600 data-[state=active]:text-white"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              All Books
            </TabsTrigger>
            <TabsTrigger 
              value="bedtime" 
              className="rounded-lg px-6 py-2 text-base data-[state=active]:bg-violet-600 data-[state=active]:text-white"
            >
              <Moon className="mr-2 h-5 w-5" />
              Bedtime Stories
            </TabsTrigger>
            <TabsTrigger 
              value="five-min" 
              className="rounded-lg px-6 py-2 text-base data-[state=active]:bg-violet-600 data-[state=active]:text-white"
            >
              <Clock className="mr-2 h-5 w-5" />
              5-Min Stories
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {/* All Books */}
            <div className="mb-6">
              {filteredBooks.length === 0 ? (
                <Card className="border-4 border-violet-200 rounded-2xl">
                  <CardContent className="pt-6 text-center">
                    <Search className="h-12 w-12 text-violet-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-violet-700 mb-2">No stories found</h3>
                    <p className="text-violet-600">Try a different search or clear the filters</p>
                    <Button 
                      className="mt-4 bg-violet-600 hover:bg-violet-700 rounded-xl"
                      onClick={() => {
                        setSearchTerm("");
                        setFilters({
                          hasAudio: false,
                          bedtimeOnly: false,
                          quickReads: false,
                        });
                      }}
                    >
                      Show All Stories
                    </Button>
                  </CardContent>
                </Card>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => (
                    <KidBookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBooks.map((book) => (
                    <Card key={book.id} className="border-4 border-violet-300 rounded-2xl overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <img 
                            src={book.coverUrl || 'https://placehold.co/200x300?text=No+Cover'} 
                            alt={`Cover of ${book.title || 'Book'}`}
                            className="w-1/3 h-48 object-cover"
                          />
                          <div className="p-4 flex-1">
                            <div className="flex flex-col h-full justify-between">
                              <div>
                                <h3 className="text-xl font-bold text-violet-700 mb-1">{book.title}</h3>
                                <p className="text-violet-600 mb-2">{book.author}</p>
                              
                                <div className="flex gap-2 mb-2">
                                  {book.isBedtimeStory && (
                                    <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white py-1">
                                      <Moon className="h-3 w-3 mr-1" />
                                      Bedtime
                                    </Badge>
                                  )}
                                  
                                  {book.isFiveMinuteStory && (
                                    <Badge className="bg-green-600 hover:bg-green-700 text-white py-1">
                                      <Clock className="h-3 w-3 mr-1" />
                                      5-Min
                                    </Badge>
                                  )}
                                  
                                  {book.hasAudiobook && (
                                    <Badge className="bg-amber-600 hover:bg-amber-700 text-white py-1">
                                      <Headphones className="h-3 w-3 mr-1" />
                                      Read Aloud
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center mt-3">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-5 w-5 text-yellow-400 fill-yellow-400"
                                    />
                                  ))}
                                </div>
                                <Button 
                                  size="sm" 
                                  className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-md"
                                  onClick={(e) => {
                                    // Add a "pop" animation when clicked
                                    const button = e.currentTarget;
                                    button.classList.add('scale-90');
                                    setTimeout(() => {
                                      button.classList.remove('scale-90');
                                      // Navigate to the book (we'll just show an alert for now)
                                      alert(`Opening book: ${book.title}`);
                                    }, 150);
                                  }}
                                >
                                  Read Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="bedtime" className="mt-0">
            {/* Bedtime Stories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {bedtimeStories.map((book) => (
                <KidBookCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="five-min" className="mt-0">
            {/* 5-Minute Stories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {fiveMinuteStories.map((book) => (
                <KidBookCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
