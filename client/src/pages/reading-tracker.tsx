import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Sidebar from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { books } from "@/data/books";
import { useMode } from "@/hooks/use-mode";
import {
  BarChart,
  PieChart,
  Calendar,
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  BookMarked,
  BarChart3,
  Star
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";
import KidHeader from "@/components/kids/kid-header";
import { kidsBooks } from "@/data/kids-books";

export default function ReadingTracker() {
  const { isKidsMode } = useMode();

  return isKidsMode ? <KidsReadingTracker /> : <StandardReadingTracker />;
}

function StandardReadingTracker() {
  // Sample reading data for charts
  const monthlyData = [
    { month: "Jan", pages: 450 },
    { month: "Feb", pages: 320 },
    { month: "Mar", pages: 580 },
    { month: "Apr", pages: 250 },
    { month: "May", pages: 400 },
    { month: "Jun", pages: 380 },
    { month: "Jul", pages: 520 },
  ];
  
  const readingTimeData = [
    { name: "Morning", value: 25 },
    { name: "Afternoon", value: 15 },
    { name: "Evening", value: 45 },
    { name: "Night", value: 15 },
  ];
  
  const genreData = [
    { name: "Fiction", value: 35 },
    { name: "Non-Fiction", value: 20 },
    { name: "Mystery", value: 15 },
    { name: "Science Fiction", value: 10 },
    { name: "Fantasy", value: 20 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Currently reading books (mock data)
  const currentlyReading = books.slice(0, 3).map((book, index) => ({
    ...book,
    progress: [65, 23, 40][index]
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar />
        
        <main className="flex-1 px-4 py-8 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Reading Tracker</h1>
          <p className="text-muted-foreground mb-6">
            Track your reading progress, set goals, and view analytics.
          </p>
          
          {/* Reading Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Books Read</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +3 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pages Read</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">
                  Average 407 pages per week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Reading Goal</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">52%</div>
                <p className="text-xs text-muted-foreground">
                  13/25 books this year
                </p>
                <Progress value={52} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>
          
          {/* Currently Reading Section */}
          <h2 className="text-xl font-bold mb-4">Currently Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {currentlyReading.map((book) => (
              <Card key={book.id}>
                <CardContent className="p-0">
                  <div className="flex flex-row p-6">
                    <img 
                      src={book.coverUrl} 
                      alt={`Cover of ${book.title}`}
                      className="w-20 h-28 object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold line-clamp-1">{book.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                      <div className="flex items-center justify-between mb-1 text-sm">
                        <span>Page {Math.floor((book.progress || 0) * (book.pageCount || 100) / 100)}/{book.pageCount}</span>
                        <span>{book.progress}%</span>
                      </div>
                      <Progress value={book.progress} className="h-1 mb-2" />
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Est. finish in 4 days
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Reading Analytics */}
          <h2 className="text-xl font-bold mb-4">Reading Analytics</h2>
          <Tabs defaultValue="progress">
            <TabsList className="mb-6">
              <TabsTrigger value="progress">
                <TrendingUp className="h-4 w-4 mr-2" />
                Progress
              </TabsTrigger>
              <TabsTrigger value="habits">
                <Clock className="h-4 w-4 mr-2" />
                Habits
              </TabsTrigger>
              <TabsTrigger value="genres">
                <PieChart className="h-4 w-4 mr-2" />
                Genres
              </TabsTrigger>
              <TabsTrigger value="yearly">
                <Calendar className="h-4 w-4 mr-2" />
                Yearly Report
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="progress" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Reading Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={monthlyData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorPages" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="pages" 
                        stroke="#3b82f6" 
                        fillOpacity={1} 
                        fill="url(#colorPages)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reading Streak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-5xl font-bold text-primary">14</div>
                      <div className="text-xl">Days in a row</div>
                      <div className="text-sm text-muted-foreground">Keep it up!</div>
                    </div>
                    <div className="mt-6 grid grid-cols-7 gap-2">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="h-8 w-full bg-primary/20 rounded-sm flex items-center justify-center text-xs"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Reading Speed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-5xl font-bold text-primary">320</div>
                      <div className="text-xl">Words per minute</div>
                      <div className="text-sm text-muted-foreground">Above average</div>
                    </div>
                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Slow</span>
                        <span className="text-sm text-muted-foreground">Fast</span>
                      </div>
                      <div className="h-4 w-full bg-secondary rounded-full relative">
                        <div 
                          className="absolute top-0 left-0 h-4 bg-primary rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                        <div 
                          className="absolute top-0 left-0 h-6 w-6 bg-white border-2 border-primary rounded-full -mt-1 shadow-md"
                          style={{ left: "65%" }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="habits" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reading Time of Day</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={readingTimeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {readingTimeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Average Reading Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { day: "Mon", minutes: 25 },
                          { day: "Tue", minutes: 35 },
                          { day: "Wed", minutes: 45 },
                          { day: "Thu", minutes: 30 },
                          { day: "Fri", minutes: 55 },
                          { day: "Sat", minutes: 85 },
                          { day: "Sun", minutes: 75 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="minutes" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="genres" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Books by Genre</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={genreData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {genreData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Your Top Genres</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {genreData.map((genre, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{genre.name}</span>
                            <span className="text-sm text-muted-foreground">{genre.value}%</span>
                          </div>
                          <Progress value={genre.value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="yearly" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your 2023 Reading DNA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/5 p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-4">Reading Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-background p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary">19</div>
                        <div className="text-sm text-muted-foreground">Books Completed</div>
                      </div>
                      <div className="bg-background p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary">5,284</div>
                        <div className="text-sm text-muted-foreground">Pages Read</div>
                      </div>
                      <div className="bg-background p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary">278</div>
                        <div className="text-sm text-muted-foreground">Hours Spent</div>
                      </div>
                      <div className="bg-background p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary">4.2</div>
                        <div className="text-sm text-muted-foreground">Average Rating</div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-4">Reading Personality</h3>
                    <div className="bg-background p-4 rounded-lg mb-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Fiction Lover</span>
                          <span>Non-Fiction Explorer</span>
                        </div>
                        <Progress value={65} className="h-2" />
                        
                        <div className="flex justify-between">
                          <span>Sequential Reader</span>
                          <span>Multiple Books At Once</span>
                        </div>
                        <Progress value={30} className="h-2" />
                        
                        <div className="flex justify-between">
                          <span>Morning Reader</span>
                          <span>Night Owl</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-4">Top Picks of 2023</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {books.slice(0, 4).map((book) => (
                        <div key={book.id} className="bg-background p-2 rounded-lg">
                          <img 
                            src={book.coverUrl} 
                            alt={`Cover of ${book.title}`}
                            className="w-full h-40 object-cover mb-2 rounded"
                          />
                          <div className="text-sm font-medium line-clamp-1">{book.title}</div>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

function KidsReadingTracker() {
  // Reading progress for kid books
  const booksRead = [
    { ...kidsBooks[0], status: "completed", date: "July 15" },
    { ...kidsBooks[1], status: "completed", date: "July 17" },
    { ...kidsBooks[2], status: "current", progress: 60, date: "July 20" },
  ];
  
  // Stars earned for reading
  const totalStars = 12;
  
  return (
    <div className="min-h-screen flex flex-col bg-violet-50">
      <KidHeader />
      
      <main className="flex-1 px-4 py-6 container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-violet-700 text-center">
          My Reading Adventure
        </h1>
        
        {/* Reading Badges & Stars */}
        <Card className="border-4 border-violet-300 rounded-3xl overflow-hidden mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
              <div className="bg-violet-200 p-4 rounded-full flex items-center justify-center h-32 w-32">
                <BookOpen className="h-16 w-16 text-violet-600" />
              </div>
              
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-violet-700 mb-2">Reading Champion</h2>
                <p className="text-lg text-violet-600 mb-4">You've earned:</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {[...Array(totalStars)].map((_, i) => (
                    <div key={i} className="text-3xl text-yellow-400">⭐</div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Reading Streak */}
            <div className="bg-violet-100 p-4 rounded-xl">
              <h3 className="text-xl font-bold text-violet-700 mb-3 text-center">Your Reading Streak</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="text-4xl font-bold text-violet-700">7</div>
                <div className="text-lg text-violet-600">Days in a row!</div>
              </div>
              <div className="flex justify-center gap-1">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                  <div key={i} className="h-12 w-12 bg-violet-300 text-violet-700 rounded-lg flex items-center justify-center font-bold text-lg">
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Books Read */}
        <h2 className="text-2xl font-bold mb-4 text-violet-700">My Books</h2>
        <div className="space-y-4 mb-8">
          {booksRead.map((book) => (
            <Card key={book.id} className="border-4 border-violet-300 rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <img 
                    src={book.coverUrl} 
                    alt={`Cover of ${book.title}`}
                    className="w-full sm:w-1/3 h-48 sm:h-auto object-cover"
                  />
                  <div className="p-4 flex-1">
                    <h3 className="text-xl font-bold text-violet-700 mb-1">{book.title}</h3>
                    <p className="text-lg text-violet-600 mb-3">{book.author}</p>
                    
                    {book.status === "completed" ? (
                      <div className="bg-green-100 text-green-700 p-3 rounded-xl flex items-center">
                        <CheckCircle className="h-6 w-6 mr-2" />
                        <span className="font-bold">Finished on {book.date}!</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-lg text-violet-600">Reading now:</span>
                          <span className="text-lg font-bold text-violet-700">{book.progress}%</span>
                        </div>
                        <Progress value={book.progress} className="h-4 rounded-lg bg-violet-200" />
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <Button className="bg-violet-600 hover:bg-violet-700 text-white text-lg rounded-xl">
                        {book.status === "completed" ? "Read Again" : "Keep Reading"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Reading Rewards */}
        <Card className="border-4 border-violet-300 rounded-3xl overflow-hidden mb-8 bg-indigo-100">
          <CardHeader className="bg-indigo-200">
            <CardTitle className="text-xl text-indigo-700">Reading Rewards</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-indigo-700 mb-2">
                Earn more stars to unlock fun rewards!
              </h3>
              <Progress value={totalStars * 5} max={100} className="h-6 bg-indigo-200 rounded-lg" />
              <p className="mt-2 text-indigo-600">
                {totalStars} stars earned / 20 stars needed for next reward
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border-2 border-indigo-300 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="font-bold text-indigo-700">Reading Champion</h4>
                <p className="text-sm text-indigo-600">5 stars</p>
                <Badge className="mt-2 bg-green-500">Unlocked!</Badge>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-indigo-300 text-center">
                <div className="text-3xl mb-2">🎮</div>
                <h4 className="font-bold text-indigo-700">Fun Game Access</h4>
                <p className="text-sm text-indigo-600">10 stars</p>
                <Badge className="mt-2 bg-green-500">Unlocked!</Badge>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-indigo-300 text-center opacity-70">
                <div className="text-3xl mb-2">🎨</div>
                <h4 className="font-bold text-indigo-700">Special Story</h4>
                <p className="text-sm text-indigo-600">20 stars</p>
                <Badge className="mt-2 bg-amber-500">8 more stars!</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}

// Mocking the Badge component since it wasn't in the starter files
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}

// Mocking CheckCircle for the kids tracker
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
