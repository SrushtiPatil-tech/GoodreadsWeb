import { useMode } from "@/hooks/use-mode";
import { Link } from "wouter";
import { BookOpen, Heart, Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const { isKidsMode } = useMode();
  
  return (
    <footer className={`w-full py-8 border-t ${isKidsMode ? 'bg-violet-100 border-violet-300' : 'bg-background border-border'}`}>
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <BookOpen className={`h-6 w-6 ${isKidsMode ? 'text-violet-600' : 'text-primary'}`} />
                <span className={`text-lg font-bold ${isKidsMode ? 'text-violet-700' : 'text-foreground'}`}>
                  {isKidsMode ? "KidReads" : "Goodreads"}
                </span>
              </a>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {isKidsMode 
                ? "A fun, safe place for young readers to explore the magic of books." 
                : "The world's largest site for readers and book recommendations."}
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className={`text-sm font-semibold mb-4 ${isKidsMode ? 'text-violet-700' : 'text-foreground'}`}>
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-sm text-muted-foreground hover:text-primary">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/book-match">
                  <a className="text-sm text-muted-foreground hover:text-primary">
                    Book Match
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/reading-tracker">
                  <a className="text-sm text-muted-foreground hover:text-primary">
                    Reading Tracker
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/subscription">
                  <a className="text-sm text-muted-foreground hover:text-primary">
                    Subscription
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Kid Mode Links - Conditionally Rendered */}
          <div className="col-span-1">
            <h3 className={`text-sm font-semibold mb-4 ${isKidsMode ? 'text-violet-700' : 'text-foreground'}`}>
              {isKidsMode ? "Kid's Corner" : "Community"}
            </h3>
            <ul className="space-y-2">
              {isKidsMode ? (
                <>
                  <li>
                    <Link href="/bedtime-stories">
                      <a className="text-sm text-muted-foreground hover:text-primary">
                        Bedtime Stories
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/five-min-stories">
                      <a className="text-sm text-muted-foreground hover:text-primary">
                        5-Minute Stories
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/kids-mode">
                      <a className="text-sm text-muted-foreground hover:text-primary">
                        All Kid Books
                      </a>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Discussions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Book Clubs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Reading Challenges
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          {/* Help Section */}
          <div className="col-span-1">
            <h3 className={`text-sm font-semibold mb-4 ${isKidsMode ? 'text-violet-700' : 'text-foreground'}`}>
              Help
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {isKidsMode ? "KidReads" : "Goodreads"}. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-muted-foreground flex items-center justify-center">
            Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> for book lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
