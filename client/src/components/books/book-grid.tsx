import { Book } from "@shared/schema";
import BookCard from "./book-card";
import { useMode } from "@/hooks/use-mode";

interface BookGridProps {
  books: Partial<Book>[];
  title?: string;
  featured?: boolean;
}

export default function BookGrid({ books, title, featured = false }: BookGridProps) {
  const { isKidsMode } = useMode();
  
  return (
    <div className="space-y-6">
      {title && (
        <h2 className={`text-2xl font-bold ${isKidsMode ? 'text-violet-700' : ''}`}>
          {title}
        </h2>
      )}
      
      <div className={`grid gap-6 ${
        featured
          ? 'grid-cols-1'
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      }`}>
        {books.map((book) => (
          <BookCard 
            key={book.id} 
            book={book} 
            featured={featured}
          />
        ))}
      </div>
    </div>
  );
}
