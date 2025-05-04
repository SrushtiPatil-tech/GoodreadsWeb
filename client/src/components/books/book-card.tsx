import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book } from "@shared/schema";
import { Link } from "wouter";
import { BookOpen, Headphones, Star, PlusCircle } from "lucide-react";
import { useMode } from "@/hooks/use-mode";

interface BookCardProps {
  book: Partial<Book>;
  featured?: boolean;
}

export default function BookCard({ book, featured = false }: BookCardProps) {
  const { isKidsMode } = useMode();
  
  return (
    <Card className={`h-full overflow-hidden transition-all duration-200 hover:shadow-md ${
      isKidsMode ? 'border-violet-200 hover:border-violet-400' : ''
    } ${featured ? 'md:flex md:flex-row' : ''}`}>
      <div className={`relative ${featured ? 'md:w-1/3' : ''}`}>
        {/* Cover Image */}
        <img 
          src={book.coverUrl} 
          alt={`Cover of ${book.title}`}
          className={`h-56 w-full object-cover ${featured ? 'md:h-full' : ''}`}
        />
        
        {/* Audiobook Badge */}
        {book.hasAudiobook && (
          <Badge className="absolute top-2 right-2 bg-black/70 hover:bg-black/70">
            <Headphones className="h-3 w-3 mr-1" />
            Audiobook
          </Badge>
        )}
      </div>
      
      <CardContent className={`p-4 ${featured ? 'md:w-2/3 md:p-6' : ''}`}>
        <Link href={`/book/${book.id}`}>
          <a className="group">
            <h3 className={`font-bold text-lg group-hover:text-primary ${
              isKidsMode ? 'text-violet-700' : ''
            }`}>
              {book.title}
            </h3>
          </a>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">by {book.author}</p>
        
        {/* Rating Stars (mock) */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-xs text-muted-foreground ml-2">(124 ratings)</span>
        </div>
        
        {/* Description (truncated) */}
        {book.description && (
          <p className="mt-3 text-sm line-clamp-3">
            {book.description}
          </p>
        )}
        
        {/* Genre Badge */}
        {book.genre && (
          <div className="mt-3">
            <Badge variant="secondary" className={isKidsMode ? 'bg-violet-100 text-violet-700 hover:bg-violet-200' : ''}>
              {book.genre}
            </Badge>
          </div>
        )}
      </CardContent>
      
      <CardFooter className={`flex justify-between p-4 pt-0 ${featured ? 'md:px-6' : ''}`}>
        <Button variant="outline" size="sm" className={isKidsMode ? 'border-violet-300' : ''}>
          <BookOpen className="h-4 w-4 mr-1" />
          Read
        </Button>
        <Button variant="ghost" size="sm">
          <PlusCircle className="h-4 w-4 mr-1" />
          Want to Read
        </Button>
      </CardFooter>
    </Card>
  );
}
