import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMode } from "@/hooks/use-mode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Book,
  BookOpen,
  User,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Header() {
  const [location] = useLocation();
  const { isKidsMode, toggleMode } = useMode();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Toggle between light and dark theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className={`w-full border-b ${isKidsMode ? 'bg-violet-100 border-violet-300' : 'bg-background border-border'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <BookOpen className={`h-8 w-8 ${isKidsMode ? 'text-violet-600' : 'text-primary'}`} />
              <span className={`text-xl font-bold ${isKidsMode ? 'text-violet-700' : 'text-foreground'}`}>
                {isKidsMode ? "KidReads" : "Goodreads"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
                Home
              </div>
            </Link>
            <Link href="/book-match">
              <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === '/book-match' ? 'text-primary' : 'text-muted-foreground'}`}>
                Book Match
              </div>
            </Link>
            <Link href="/reading-tracker">
              <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === '/reading-tracker' ? 'text-primary' : 'text-muted-foreground'}`}>
                Reading Tracker
              </div>
            </Link>
            <Link href="/subscription">
              <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === '/subscription' ? 'text-primary' : 'text-muted-foreground'}`}>
                Subscription
              </div>
            </Link>
            
            {isKidsMode && (
              <>
                <Link href="/bedtime-stories">
                  <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === '/bedtime-stories' ? 'text-primary' : 'text-muted-foreground'}`}>
                    Bedtime Stories
                  </div>
                </Link>
                <Link href="/five-min-stories">
                  <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === '/five-min-stories' ? 'text-primary' : 'text-muted-foreground'}`}>
                    5-Min Stories
                  </div>
                </Link>
              </>
            )}
          </nav>

          {/* Search and User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search books..." 
                className="pl-8"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              
              {/* Kids Mode Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Kid Mode</span>
                <Switch 
                  checked={isKidsMode} 
                  onCheckedChange={toggleMode}
                />
              </div>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <User className="h-5 w-5" />
                    <span className="sr-only md:not-sr-only md:text-sm">Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>My Books</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search books..." 
                className="pl-8"
              />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link href="/">
                <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
                  Home
                </div>
              </Link>
              <Link href="/book-match">
                <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === '/book-match' ? 'text-primary' : 'text-muted-foreground'}`}>
                  Book Match
                </div>
              </Link>
              <Link href="/reading-tracker">
                <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === '/reading-tracker' ? 'text-primary' : 'text-muted-foreground'}`}>
                  Reading Tracker
                </div>
              </Link>
              <Link href="/subscription">
                <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === '/subscription' ? 'text-primary' : 'text-muted-foreground'}`}>
                  Subscription
                </div>
              </Link>
              
              {isKidsMode && (
                <>
                  <Link href="/bedtime-stories">
                    <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === '/bedtime-stories' ? 'text-primary' : 'text-muted-foreground'}`}>
                      Bedtime Stories
                    </div>
                  </Link>
                  <Link href="/five-min-stories">
                    <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === '/five-min-stories' ? 'text-primary' : 'text-muted-foreground'}`}>
                      5-Min Stories
                    </div>
                  </Link>
                </>
              )}
            </nav>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Kid Mode</span>
                <Switch 
                  checked={isKidsMode} 
                  onCheckedChange={toggleMode}
                />
              </div>
              
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
                {theme === "light" ? (
                  <Moon className="ml-2 h-4 w-4" />
                ) : (
                  <Sun className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
