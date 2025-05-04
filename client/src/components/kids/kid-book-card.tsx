import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book } from "@shared/schema";
import { Link } from "wouter";
import { BookOpen, Headphones, Star, Moon, Clock } from "lucide-react";

interface KidBookCardProps {
  book: Partial<Book>;
  featured?: boolean;
}

export default function KidBookCard({ book, featured = false }: KidBookCardProps) {
  return (
    <Card className={`h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-4 border-violet-300 rounded-2xl 
      ${featured ? 'md:flex md:flex-row' : ''} 
      animate-in slide-in-from-bottom-2 duration-500`}
    >
      <div className={`relative ${featured ? 'md:w-1/3' : ''}`}>
        {/* Cover Image */}
        <img 
          src={typeof book.coverUrl === 'string' ? book.coverUrl : 'https://placehold.co/200x300?text=No+Cover'} 
          alt={`Cover of ${book.title || 'Book'}`}
          className={`h-64 w-full object-cover ${featured ? 'md:h-full' : ''}`}
        />
        
        {/* Type Badge - Special badges for bedtime or 5-min stories */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {book.isBedtimeStory && (
            <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-3">
              <Moon className="h-4 w-4 mr-1" />
              Bedtime
            </Badge>
          )}
          
          {book.isFiveMinuteStory && (
            <Badge className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3">
              <Clock className="h-4 w-4 mr-1" />
              5-Min Story
            </Badge>
          )}
          
          {book.hasAudiobook && (
            <Badge className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-1 px-3">
              <Headphones className="h-4 w-4 mr-1" />
              Read Aloud
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className={`p-5 ${featured ? 'md:w-2/3 md:p-6' : ''} bg-violet-50`}>
        <Link href={`/book/${book.id}`}>
          <a className="group">
            <h3 className="font-bold text-xl group-hover:text-violet-700 text-violet-600">
              {book.title}
            </h3>
          </a>
        </Link>
        <p className="text-base text-violet-500 mt-1">by {book.author}</p>
        
        {/* Reading Level */}
        {book.readingLevel && (
          <div className="mt-2">
            <Badge className="bg-violet-200 text-violet-700 hover:bg-violet-300">
              {book.readingLevel}
            </Badge>
          </div>
        )}
        
        {/* Rating Stars (simplified for kids - always positive) */}
        <div className="flex items-center mt-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-6 w-6 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        
        {/* Description (truncated, simpler language) */}
        {book.description && (
          <p className="mt-4 text-base text-violet-600 line-clamp-3">
            {book.description}
          </p>
        )}
      </CardContent>
      
      <CardFooter className={`flex justify-between p-5 pt-0 ${featured ? 'md:px-6' : ''} bg-violet-50`}>
        <Button 
          size="lg" 
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-base transition-all duration-300 transform hover:scale-105 hover:shadow-md"
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
          <BookOpen className="h-5 w-5 mr-2" />
          Read Now
        </Button>
        
        {book.hasAudiobook && (
          <Button 
            variant="outline" 
            size="lg" 
            className="border-violet-500 text-violet-600 hover:bg-violet-100 font-bold rounded-xl text-base transition-all duration-300 transform hover:scale-105 hover:shadow-md"
            onClick={(e) => {
              // Add a "pop" animation when clicked
              const button = e.currentTarget;
              button.classList.add('scale-90');
              setTimeout(() => {
                button.classList.remove('scale-90');
                // Start audio (we'll just show an alert for now)
                alert(`Now playing audio for: ${book.title}`);
              }, 150);
            }}
          >
            <Headphones className="h-5 w-5 mr-2" />
            Listen
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
