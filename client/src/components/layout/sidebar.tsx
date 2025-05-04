import { useMode } from "@/hooks/use-mode";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { popularGenres } from "@/data/books";
import {
  BookOpen,
  Home,
  Search,
  PieChart,
  BookMarked,
  CreditCard,
  Moon,
  Stars,
  Clock,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();
  const { isKidsMode } = useMode();

  return (
    <aside className={`w-64 border-r h-[calc(100vh-4rem)] sticky top-16 hidden lg:block ${
      isKidsMode ? 'bg-violet-50 border-violet-200' : 'bg-background border-border'
    }`}>
      <ScrollArea className="h-full py-6 px-3">
        <nav className="space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            <Link href="/">
              <a className={`flex items-center text-sm px-3 py-2 rounded-md ${
                location === '/' 
                  ? `font-medium ${isKidsMode ? 'bg-violet-100 text-violet-700' : 'bg-primary/10 text-primary'}` 
                  : 'text-muted-foreground hover:bg-secondary'
              }`}>
                <Home className="mr-2 h-4 w-4" />
                Home
              </a>
            </Link>
            
            <Link href="/book-match">
              <a className={`flex items-center text-sm px-3 py-2 rounded-md ${
                location === '/book-match' 
                  ? `font-medium ${isKidsMode ? 'bg-violet-100 text-violet-700' : 'bg-primary/10 text-primary'}` 
                  : 'text-muted-foreground hover:bg-secondary'
              }`}>
                <Search className="mr-2 h-4 w-4" />
                Book Match
              </a>
            </Link>
            
            <Link href="/reading-tracker">
              <a className={`flex items-center text-sm px-3 py-2 rounded-md ${
                location === '/reading-tracker' 
                  ? `font-medium ${isKidsMode ? 'bg-violet-100 text-violet-700' : 'bg-primary/10 text-primary'}` 
                  : 'text-muted-foreground hover:bg-secondary'
              }`}>
                <PieChart className="mr-2 h-4 w-4" />
                Reading Tracker
              </a>
            </Link>
            
            <Link href="/subscription">
              <a className={`flex items-center text-sm px-3 py-2 rounded-md ${
                location === '/subscription' 
                  ? `font-medium ${isKidsMode ? 'bg-violet-100 text-violet-700' : 'bg-primary/10 text-primary'}` 
                  : 'text-muted-foreground hover:bg-secondary'
              }`}>
                <CreditCard className="mr-2 h-4 w-4" />
                Subscription
              </a>
            </Link>
          </div>
          
          {/* Kids Specific Navigation */}
          {isKidsMode && (
            <div className="space-y-1">
              <h3 className="px-3 text-xs font-semibold text-violet-700 uppercase tracking-wider">
                Kids Corner
              </h3>
              
              <Link href="/kids-mode">
                <a className={`flex items-center text-sm px-3 py-2 rounded-md ${
                  location === '/kids-mode' 
                    ? 'font-medium bg-violet-100 text-violet-700' 
                    : 'text-muted-foreground hover:bg-secondary'
                }`}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  All Kid Books
                </a>
              </Link>
              
              <Link href="/bedtime-stories">
                <a className={`flex items-center text-sm px-3 py-2 rounded-md ${
                  location === '/bedtime-stories' 
                    ? 'font-medium bg-violet-100 text-violet-700' 
                    : 'text-muted-foreground hover:bg-secondary'
                }`}>
                  <Moon className="mr-2 h-4 w-4" />
                  Bedtime Stories
                </a>
              </Link>
              
              <Link href="/five-min-stories">
                <a className={`flex items-center text-sm px-3 py-2 rounded-md ${
                  location === '/five-min-stories' 
                    ? 'font-medium bg-violet-100 text-violet-700' 
                    : 'text-muted-foreground hover:bg-secondary'
                }`}>
                  <Clock className="mr-2 h-4 w-4" />
                  5-Min Stories
                </a>
              </Link>
            </div>
          )}
          
          {/* Book Collections */}
          <div className="space-y-1">
            <h3 className={`px-3 text-xs font-semibold uppercase tracking-wider ${
              isKidsMode ? 'text-violet-700' : 'text-muted-foreground'
            }`}>
              My Books
            </h3>
            
            <Button variant="ghost" className="w-full justify-start text-sm px-3 py-2 text-muted-foreground hover:bg-secondary">
              <BookMarked className="mr-2 h-4 w-4" />
              Want to Read
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-sm px-3 py-2 text-muted-foreground hover:bg-secondary">
              <BookOpen className="mr-2 h-4 w-4" />
              Currently Reading
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-sm px-3 py-2 text-muted-foreground hover:bg-secondary">
              <Stars className="mr-2 h-4 w-4" />
              Read
            </Button>
          </div>
          
          {/* Popular Genres */}
          <div className="space-y-1">
            <h3 className={`px-3 text-xs font-semibold uppercase tracking-wider ${
              isKidsMode ? 'text-violet-700' : 'text-muted-foreground'
            }`}>
              Popular Genres
            </h3>
            
            <div className="space-y-1">
              {popularGenres.slice(0, isKidsMode ? 5 : 7).map((genre, index) => (
                <Button 
                  key={index} 
                  variant="ghost" 
                  className="w-full justify-start text-sm px-3 py-2 text-muted-foreground hover:bg-secondary"
                >
                  <ChevronRight className="mr-2 h-4 w-4" />
                  {genre}
                </Button>
              ))}
            </div>
          </div>
        </nav>
      </ScrollArea>
    </aside>
  );
}
