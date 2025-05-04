import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMode } from "@/hooks/use-mode";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Search,
  Moon,
  Clock,
  User,
  Menu,
  X,
  Sun,
  ChevronDown,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function KidHeader() {
  const [location] = useLocation();
  const { toggleMode } = useMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Toggle between light and dark theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="w-full border-b-4 border-violet-400 bg-violet-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - More playful for kids */}
          <Link href="/">
            <a className="flex items-center space-x-2">
              <BookOpen className="h-10 w-10 text-violet-600" />
              <span className="text-2xl font-bold text-violet-700 tracking-wide">
                KidReads
              </span>
            </a>
          </Link>

          {/* Desktop Navigation - Larger and more colorful */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className={`text-lg font-medium transition-colors hover:text-violet-700 ${
                location === '/' ? 'text-violet-700 border-b-4 border-violet-400 pb-1' : 'text-violet-600'
              }`}>
                Home
              </a>
            </Link>
            
            <Link href="/bedtime-stories">
              <a className={`text-lg font-medium transition-colors hover:text-violet-700 ${
                location === '/bedtime-stories' ? 'text-violet-700 border-b-4 border-violet-400 pb-1' : 'text-violet-600'
              }`}>
                <div className="flex items-center">
                  <Moon className="h-5 w-5 mr-1" />
                  Bedtime
                </div>
              </a>
            </Link>
            
            <Link href="/five-min-stories">
              <a className={`text-lg font-medium transition-colors hover:text-violet-700 ${
                location === '/five-min-stories' ? 'text-violet-700 border-b-4 border-violet-400 pb-1' : 'text-violet-600'
              }`}>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                  5-Min Stories
                </div>
              </a>
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Theme Toggle - Sun/Moon for kids */}
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={toggleTheme}
              className="bg-violet-200 text-violet-700 hover:bg-violet-300 rounded-full h-12 w-12"
            >
              {theme === "light" ? (
                <Moon className="h-6 w-6" />
              ) : (
                <Sun className="h-6 w-6" />
              )}
            </Button>
            
            {/* Exit Kids Mode Button */}
            <div 
              className="flex items-center bg-violet-200 hover:bg-violet-300 p-2 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => {
                toggleMode();
                window.location.href = '/';
              }}
            >
              <span className="text-base font-medium text-violet-700 mr-2">Exit Kid Mode</span>
              <Switch 
                checked={true}
              />
            </div>
            
            {/* Parent Settings Button */}
            <Button 
              variant="ghost" 
              className="bg-violet-500 hover:bg-violet-600 text-white rounded-full"
            >
              <User className="h-5 w-5 mr-1" />
              Parent Settings
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-violet-700 hover:bg-violet-200 h-12 w-12"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/">
                <a className={`flex items-center text-xl font-medium py-3 px-4 rounded-xl ${
                  location === '/' ? 'bg-violet-200 text-violet-700' : 'text-violet-600'
                }`}>
                  <BookOpen className="h-6 w-6 mr-2" />
                  Home
                </a>
              </Link>
              
              <Link href="/bedtime-stories">
                <a className={`flex items-center text-xl font-medium py-3 px-4 rounded-xl ${
                  location === '/bedtime-stories' ? 'bg-violet-200 text-violet-700' : 'text-violet-600'
                }`}>
                  <Moon className="h-6 w-6 mr-2" />
                  Bedtime Stories
                </a>
              </Link>
              
              <Link href="/five-min-stories">
                <a className={`flex items-center text-xl font-medium py-3 px-4 rounded-xl ${
                  location === '/five-min-stories' ? 'bg-violet-200 text-violet-700' : 'text-violet-600'
                }`}>
                  <Clock className="h-6 w-6 mr-2" />
                  5-Min Stories
                </a>
              </Link>
            </div>
            
            <div className="flex flex-col space-y-4 mt-6 pt-6 border-t-2 border-violet-300">
              <Button 
                variant="ghost" 
                onClick={toggleTheme}
                className="justify-start bg-violet-200 text-violet-700 hover:bg-violet-300 text-lg h-14 rounded-xl"
              >
                {theme === "light" ? (
                  <Moon className="h-6 w-6 mr-2" />
                ) : (
                  <Sun className="h-6 w-6 mr-2" />
                )}
                {theme === "light" ? "Night Mode" : "Day Mode"}
              </Button>
              
              <Button 
                variant="ghost" 
                className="justify-start bg-violet-500 hover:bg-violet-600 text-white text-lg h-14 rounded-xl"
              >
                <User className="h-6 w-6 mr-2" />
                Parent Settings
              </Button>
              
              <div 
                className="flex items-center justify-between bg-violet-200 hover:bg-violet-300 p-4 rounded-xl w-full transition-all duration-300 cursor-pointer"
                onClick={() => {
                  toggleMode();
                  window.location.href = '/';
                }}
              >
                <span className="text-lg font-medium text-violet-700">Exit Kid Mode</span>
                <Switch 
                  checked={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
