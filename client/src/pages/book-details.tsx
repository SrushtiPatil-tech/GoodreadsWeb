import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Sidebar from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AudioPlayer from "@/components/books/audio-player";
import ReadAloudPlayer from "@/components/kids/read-aloud-player";
import { getBookById } from "@/data/books";
import { getKidsBookById } from "@/data/kids-books";
import { useMode } from "@/hooks/use-mode";
import { Book } from "@shared/schema";
import { 
  BookMarked, 
  Share2, 
  Star, 
  Headphones, 
  BookOpen, 
  CalendarDays,
  Clock,
  File,
  ArrowLeft,
  ShoppingCart,
  MessageCircle,
  Heart,
  ThumbsUp
} from "lucide-react";
import { Link } from "wouter";
import KidHeader from "@/components/kids/kid-header";
import { Moon } from "lucide-react";

export default function BookDetails() {
  const [match, params] = useRoute<{ id: string }>("/book/:id");
  const { isKidsMode } = useMode();
  const [book, setBook] = useState<Partial<Book> | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  
  useEffect(() => {
    if (match && params.id) {
      const bookId = parseInt(params.id);
      // Try to get from normal books first, then kids books
      let foundBook = getBookById(bookId);
      
      if (!foundBook) {
        foundBook = getKidsBookById(bookId);
      }
      
      if (foundBook) {
        setBook(foundBook);
      }
    }
  }, [match, params]);
  
  if (!book) {
    return <div>Loading...</div>;
  }
  
  return isKidsMode ? (
    <KidBookDetailsView book={book} />
  ) : (
    <StandardBookDetailsView book={book} readingProgress={readingProgress} />
  );
}

// Standard book view for adult mode
function StandardBookDetailsView({ book, readingProgress }: { book: Partial<Book>, readingProgress: number }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar />
        
        <main className="flex-1 px-4 py-8 lg:px-8">
          <div className="container mx-auto">
            {/* Back button */}
            <Link href="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to browse
              </Button>
            </Link>
            
            {/* Book Header */}
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              {/* Book Cover */}
              <div className="md:w-1/4">
                <div className="relative">
                  <img 
                    src={typeof book.coverUrl === 'string' ? book.coverUrl : 'https://placehold.co/200x300?text=No+Cover'}
                    alt={`Cover of ${book.title || 'Book'}`}
                    className="w-full aspect-[2/3] object-cover shadow-lg rounded-md"
                  />
                  {book.hasAudiobook && (
                    <Badge className="absolute top-2 right-2 bg-black/70 hover:bg-black/70">
                      <Headphones className="h-3 w-3 mr-1" />
                      Audiobook
                    </Badge>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <Button className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Now
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <BookMarked className="mr-2 h-4 w-4" />
                    Want to Read
                  </Button>
                  
                  {book.hasAudiobook && (
                    <Button variant="outline" className="w-full">
                      <Headphones className="mr-2 h-4 w-4" />
                      Listen
                    </Button>
                  )}
                  
                  <a href="https://www.amazon.com/s?k=book" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buy on Amazon
                    </Button>
                  </a>
                  
                  <Button variant="ghost" className="w-full" onClick={() => alert('Shared book with your friends!')}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
              
              {/* Book Details */}
              <div className="md:w-3/4">
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
                
                {/* Rating */}
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">4.0 · 124 ratings</span>
                </div>
                
                {/* Book Metadata */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Published</span>
                    <span className="font-medium">{book.publicationYear}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Pages</span>
                    <span className="font-medium">{book.pageCount}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Genre</span>
                    <span className="font-medium">{book.genre}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Audiobook</span>
                    <span className="font-medium">{book.hasAudiobook ? 'Available' : 'Unavailable'}</span>
                  </div>
                </div>
                
                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
                  <p className="text-muted-foreground">{book.description}</p>
                </div>
                
                {/* Reading Progress */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Your Reading Progress</h3>
                    <span className="text-sm text-muted-foreground">Page 0 of {book.pageCount}</span>
                  </div>
                  <Progress value={readingProgress} className="h-2" />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>Not started</span>
                    <span>Estimated finish: 5 days at your reading pace</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs for additional content */}
            <Tabs defaultValue="reader">
              <TabsList className="mb-6">
                <TabsTrigger value="reader" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Reader
                </TabsTrigger>
                <TabsTrigger value="audiobook" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Headphones className="mr-2 h-4 w-4" />
                  Audiobook
                </TabsTrigger>
                <TabsTrigger value="community" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Community
                </TabsTrigger>
                <TabsTrigger value="details" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <File className="mr-2 h-4 w-4" />
                  Details
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="reader">
                <div className="border rounded-lg p-8 bg-white min-h-[400px]">
                  <div className="text-center text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <h3 className="text-xl font-medium mb-2">Reader Available with Subscription</h3>
                    <p className="mb-6">Get unlimited access to our full library with a Premium subscription.</p>
                    <Link href="/subscription">
                      <Button>View Subscription Plans</Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="audiobook">
                {book.hasAudiobook ? (
                  <AudioPlayer book={book} />
                ) : (
                  <div className="border rounded-lg p-8 bg-white text-center text-muted-foreground">
                    <Headphones className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <h3 className="text-xl font-medium mb-2">Audiobook Not Available</h3>
                    <p>This book doesn't have an audiobook version yet.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="community">
                <div className="border rounded-lg p-6 bg-white">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Reviews */}
                    <div className="md:w-2/3">
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                        Community Reviews
                      </h3>
                      
                      {/* Review posting form */}
                      <div className="border rounded p-4 mb-6 bg-gray-50">
                        <h4 className="text-sm font-medium mb-3">Write a Review</h4>
                        <div className="flex items-center mb-3 text-sm">
                          <span className="mr-2">Your Rating:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-5 w-5 cursor-pointer text-gray-300 hover:text-yellow-500`}
                                onClick={() => alert(`You rated this book ${i+1} stars`)}
                              />
                            ))}
                          </div>
                        </div>
                        <textarea 
                          className="w-full border rounded p-2 mb-3 text-sm" 
                          rows={3} 
                          placeholder="Share your thoughts on this book..."
                        ></textarea>
                        <Button size="sm" onClick={() => alert('Review submitted!')}>Post Review</Button>
                      </div>
                      
                      {/* Existing reviews */}
                      <div className="space-y-6">
                        {/* Review 1 */}
                        <div className="border-b pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-sm">
                                JD
                              </div>
                              <div>
                                <div className="font-medium">John Doe</div>
                                <div className="text-xs text-muted-foreground">June 12, 2023</div>
                              </div>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            This book completely captivated me from start to finish. The author's writing style is engaging 
                            and the character development is outstanding. I particularly enjoyed how the protagonist evolved 
                            throughout the story. Highly recommended!
                          </p>
                          <div className="flex items-center mt-2 text-sm">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>24</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              <span>Reply</span>
                            </Button>
                          </div>
                        </div>
                        
                        {/* Review 2 */}
                        <div className="border-b pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-sm">
                                JS
                              </div>
                              <div>
                                <div className="font-medium">Jane Smith</div>
                                <div className="text-xs text-muted-foreground">May 28, 2023</div>
                              </div>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            An absolute masterpiece! The world-building is incredible and the plot twists kept me guessing. 
                            I couldn't put it down and finished it in one sitting. This is definitely going on my favorites shelf.
                          </p>
                          <div className="flex items-center mt-2 text-sm">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>42</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              <span>Reply</span>
                            </Button>
                          </div>
                        </div>
                        
                        {/* Load more reviews button */}
                        <Button variant="outline" className="w-full" size="sm">
                          Load More Reviews
                        </Button>
                      </div>
                    </div>
                    
                    {/* Community Stats */}
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium mb-4">Reader Activity</h3>
                      
                      {/* Rating stats */}
                      <div className="border rounded p-4 mb-6 bg-gray-50">
                        <h4 className="text-sm font-medium mb-3">Rating Distribution</h4>
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map(stars => (
                            <div key={stars} className="flex items-center text-sm">
                              <div className="w-8 text-muted-foreground">{stars}★</div>
                              <div className="flex-1 mx-2">
                                <div className="h-2 bg-gray-200 rounded overflow-hidden">
                                  <div 
                                    className="h-full bg-yellow-500" 
                                    style={{ width: `${stars === 5 ? 55 : stars === 4 ? 30 : stars === 3 ? 10 : stars === 2 ? 3 : 2}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="w-8 text-right text-muted-foreground">
                                {stars === 5 ? 55 : stars === 4 ? 30 : stars === 3 ? 10 : stars === 3 ? 3 : 2}%
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="text-center mt-3 text-sm text-muted-foreground">
                          4.3 average out of 5
                        </div>
                      </div>
                      
                      {/* Currently reading */}
                      <div className="border rounded p-4 mb-6 bg-gray-50">
                        <h4 className="text-sm font-medium mb-3">Currently Reading</h4>
                        <div className="text-center mb-2 text-2xl font-bold text-primary">
                          421
                        </div>
                        <div className="text-center text-xs text-muted-foreground">
                          people currently reading this book
                        </div>
                      </div>
                      
                      {/* Lists */}
                      <div className="border rounded p-4 bg-gray-50">
                        <h4 className="text-sm font-medium mb-3">Popular Shelves</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-white">
                            <BookMarked className="h-3 w-3 mr-1" />
                            Must Read (324)
                          </Badge>
                          <Badge variant="outline" className="bg-white">
                            <Heart className="h-3 w-3 mr-1" />
                            Favorites (189)
                          </Badge>
                          <Badge variant="outline" className="bg-white">
                            Fiction (142)
                          </Badge>
                          <Badge variant="outline" className="bg-white">
                            {book.genre} (118)
                          </Badge>
                          <Badge variant="outline" className="bg-white">
                            Book Club (87)
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                          Add to Your Shelves
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details">
                <div className="border rounded-lg p-6 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Book Details</h3>
                      <div className="space-y-3">
                        <div className="flex">
                          <span className="text-muted-foreground w-36">Title:</span>
                          <span>{book.title}</span>
                        </div>
                        <div className="flex">
                          <span className="text-muted-foreground w-36">Author:</span>
                          <span>{book.author}</span>
                        </div>
                        <div className="flex">
                          <span className="text-muted-foreground w-36">Published:</span>
                          <span>{book.publicationYear}</span>
                        </div>
                        <div className="flex">
                          <span className="text-muted-foreground w-36">Pages:</span>
                          <span>{book.pageCount}</span>
                        </div>
                        <div className="flex">
                          <span className="text-muted-foreground w-36">Genre:</span>
                          <span>{book.genre}</span>
                        </div>
                        <div className="flex">
                          <span className="text-muted-foreground w-36">ISBN:</span>
                          <span>978-1234567890</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Additional Information</h3>
                      <div className="space-y-3">
                        <div className="flex">
                          <span className="text-muted-foreground w-36">Publisher:</span>
                          <span>Example Publishers</span>
                        </div>
                        <div className="flex">
                          <span className="text-muted-foreground w-36">Language:</span>
                          <span>English</span>
                        </div>
                        <div className="flex">
                          <span className="text-muted-foreground w-36">Format:</span>
                          <span>Paperback, Ebook, Audiobook</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

// Kid-friendly book view for kids mode
function KidBookDetailsView({ book }: { book: Partial<Book> }) {
  return (
    <div className="min-h-screen flex flex-col bg-violet-50">
      <KidHeader />
      
      <main className="flex-1 px-4 py-6 container mx-auto">
        {/* Back button */}
        <Link href="/kids-mode">
          <Button variant="outline" className="mb-6 bg-violet-200 text-violet-700 hover:bg-violet-300 border-violet-400 text-lg rounded-xl">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to books
          </Button>
        </Link>
        
        {/* Book Header - Kid-friendly version */}
        <div className="flex flex-col md:flex-row gap-8 mb-10 bg-white p-6 rounded-3xl border-4 border-violet-300 shadow-lg">
          {/* Book Cover */}
          <div className="md:w-1/3">
            <div className="relative">
              <img 
                src={typeof book.coverUrl === 'string' ? book.coverUrl : 'https://placehold.co/200x300?text=No+Cover'} 
                alt={`Cover of ${book.title || 'Book'}`}
                className="w-full aspect-[3/4] object-cover rounded-2xl border-4 border-violet-400 shadow-lg"
              />
              
              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {book.isBedtimeStory && (
                  <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 text-base">
                    <Moon className="h-4 w-4 mr-2" />
                    Bedtime Story
                  </Badge>
                )}
                
                {book.isFiveMinuteStory && (
                  <Badge className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-4 text-base">
                    <Clock className="h-4 w-4 mr-2" />
                    5-Min Story
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Action Buttons - Larger and more colorful for kids */}
            <div className="mt-6 space-y-4">
              <Button className="w-full bg-violet-600 hover:bg-violet-700 font-bold text-lg rounded-xl py-6">
                <BookOpen className="mr-2 h-6 w-6" />
                Read Story
              </Button>
              
              {book.hasAudiobook && (
                <Button variant="outline" className="w-full border-violet-500 text-violet-600 hover:bg-violet-100 font-bold text-lg rounded-xl py-6">
                  <Headphones className="mr-2 h-6 w-6" />
                  Listen to Story
                </Button>
              )}
            </div>
          </div>
          
          {/* Book Details */}
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-2 text-violet-700">{book.title}</h1>
            <p className="text-xl text-violet-600 mb-6">by {book.author}</p>
            
            {/* Stars - Always positive for kids */}
            <div className="flex mb-6">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-8 w-8 text-yellow-400 fill-yellow-400" 
                />
              ))}
            </div>
            
            {/* Reading Level */}
            {book.readingLevel && (
              <div className="mb-6">
                <Badge className="bg-violet-200 text-violet-700 hover:bg-violet-300 text-lg py-1 px-4">
                  {book.readingLevel}
                </Badge>
              </div>
            )}
            
            {/* Book Metadata - Simplified for kids */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-violet-100 p-4 rounded-xl">
                <div className="flex items-center">
                  <CalendarDays className="h-6 w-6 text-violet-600 mr-3" />
                  <div>
                    <div className="text-sm text-violet-600">Published</div>
                    <div className="font-bold text-lg text-violet-700">{book.publicationYear}</div>
                  </div>
                </div>
              </div>
              <div className="bg-violet-100 p-4 rounded-xl">
                <div className="flex items-center">
                  <File className="h-6 w-6 text-violet-600 mr-3" />
                  <div>
                    <div className="text-sm text-violet-600">Pages</div>
                    <div className="font-bold text-lg text-violet-700">{book.pageCount}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description - Larger text for kids */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3 text-violet-700">What's It About?</h2>
              <p className="text-lg text-violet-800 leading-relaxed bg-violet-100 p-4 rounded-xl border-2 border-violet-200">
                {book.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Read Aloud Player for Kids */}
        {book.hasAudiobook && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-violet-700">Listen to the Story</h2>
            <ReadAloudPlayer book={book} />
          </div>
        )}
        
        {/* Related Stories */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-violet-700">More Fun Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Show a few related kid books */}
            {[1, 2, 3].map((index) => (
              <KidBookCard 
                key={index} 
                book={index === 1 ? 
                  { ...book, id: book.id ? book.id + 100 : 100, title: "Another Adventure" } : 
                  { ...book, id: book.id ? book.id + 200 + index : 200 + index, title: `Fun Story ${index}` }}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

import KidBookCard from "@/components/kids/kid-book-card";
