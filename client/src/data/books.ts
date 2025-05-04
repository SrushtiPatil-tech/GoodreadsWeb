import { Book } from "@shared/schema";

// Mock book data for the static site
export const books: Partial<Book>[] = [
  {
    id: 1,
    title: "The Evolution of Everything",
    author: "Matt Ridley",
    coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73",
    description: "The New York Times bestselling author of The Rational Optimist and Genome returns with a fascinating argument for evolution that challenges the idea that major biological and cultural innovations are directed.",
    pageCount: 368,
    publicationYear: 2015,
    genre: "Science",
    hasAudiobook: true,
    isKidFriendly: false,
  },
  {
    id: 2,
    title: "The Book of Joy",
    author: "Dalai Lama & Desmond Tutu",
    coverUrl: "https://images.unsplash.com/photo-1555252586-d77e8c828e41",
    description: "Two spiritual giants. Five days. One timeless question: How do we find joy in the face of life's inevitable suffering?",
    pageCount: 384,
    publicationYear: 2016,
    genre: "Philosophy",
    hasAudiobook: true,
    isKidFriendly: false,
  },
  {
    id: 3,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    coverUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666",
    description: "Timeless lessons on wealth, greed, and happiness doing well with money isn't necessarily about what you know. It's about how you behave.",
    pageCount: 256,
    publicationYear: 2020,
    genre: "Finance",
    hasAudiobook: true,
    isKidFriendly: false,
  },
  {
    id: 4,
    title: "The Impostor's Handbook",
    author: "Rain Bennett",
    coverUrl: "https://images.unsplash.com/photo-1612969308146-066d55f37ccb",
    description: "Don't have a CS degree? Neither does the author. That didn't stop him from shipping code to over 40 million users as CTO of Business Insider.",
    pageCount: 450,
    publicationYear: 2016,
    genre: "Technology",
    hasAudiobook: false,
    isKidFriendly: false,
  },
  {
    id: 5,
    title: "Quiet: The Power of Introverts",
    author: "Susan Cain",
    coverUrl: "https://images.unsplash.com/photo-1521105993401-3a51411aff9e",
    description: "At least one-third of the people we know are introverts. In a culture that prizes extroversion, they feel out of place.",
    pageCount: 352,
    publicationYear: 2012,
    genre: "Psychology",
    hasAudiobook: true,
    isKidFriendly: false,
  },
  {
    id: 6,
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverUrl: "https://images.unsplash.com/photo-1459369510627-9efbee1e6051",
    description: "An allegorical novel, The Alchemist follows a young Andalusian shepherd in his journey to the pyramids of Egypt.",
    pageCount: 208,
    publicationYear: 1988,
    genre: "Fiction",
    hasAudiobook: true,
    isKidFriendly: true,
  },
  {
    id: 7,
    title: "The Prophet",
    author: "Kahlil Gibran",
    coverUrl: "https://images.unsplash.com/photo-1561331109-af9d653b6aa4",
    description: "The Prophet is a collection of poetic essays on love, marriage, children, giving, eating and drinking, work, joy and sorrow, and many other aspects of life.",
    pageCount: 127,
    publicationYear: 1923,
    genre: "Poetry",
    hasAudiobook: true,
    isKidFriendly: false,
  },
  {
    id: 8,
    title: "Big Magic",
    author: "Elizabeth Gilbert",
    coverUrl: "https://images.unsplash.com/photo-1521123845560-14093637aa7d",
    description: "Creative living beyond fear - a book about the attitudes, approaches, and habits we need in order to live our most creative lives.",
    pageCount: 304,
    publicationYear: 2015,
    genre: "Self-Help",
    hasAudiobook: true,
    isKidFriendly: false,
  },
];

// Featured books for homepage
export const featuredBooks = books.slice(0, 4);

// Books with audiobooks
export const booksWithAudio = books.filter(book => book.hasAudiobook);

// Get book by ID
export const getBookById = (id: number) => {
  return books.find(book => book.id === id);
};

// Popular genres for filtering
export const popularGenres = [
  "Fiction", 
  "Fantasy", 
  "Science Fiction", 
  "Mystery", 
  "Romance", 
  "Biography", 
  "History", 
  "Science", 
  "Self-Help", 
  "Business"
];
