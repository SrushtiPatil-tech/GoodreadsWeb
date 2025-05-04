import { Book } from "@shared/schema";

// Mock kids book data
export const kidsBooks: Partial<Book>[] = [
  {
    id: 101,
    title: "The Curious Explorer",
    author: "Maria Johnson",
    coverUrl: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9",
    description: "Join Alex on an adventure as they explore the wonders of the natural world, discovering new plants, animals, and landscapes.",
    pageCount: 32,
    publicationYear: 2021,
    genre: "Children's Adventure",
    isKidFriendly: true,
    readingLevel: "Ages 6-8",
    hasAudiobook: true,
  },
  {
    id: 102,
    title: "Bella's Bedtime Safari",
    author: "Robert Thompson",
    coverUrl: "https://images.unsplash.com/photo-1476469535352-80159d0af31d",
    description: "Bella's imagination takes her on a safari adventure right from her bedroom as she prepares for sleep.",
    pageCount: 24,
    publicationYear: 2020,
    genre: "Children's Bedtime",
    isKidFriendly: true,
    readingLevel: "Ages 3-5",
    isBedtimeStory: true,
    hasAudiobook: true,
  },
  {
    id: 103,
    title: "The Magical Library",
    author: "Emily Chen",
    coverUrl: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6",
    description: "When Sam visits a mysterious library, the books come alive and take them on adventures beyond imagination.",
    pageCount: 40,
    publicationYear: 2022,
    genre: "Children's Fantasy",
    isKidFriendly: true,
    readingLevel: "Ages 7-10",
    hasAudiobook: true,
  },
  {
    id: 104,
    title: "The Little Dinosaur's Big Day",
    author: "James Peterson",
    coverUrl: "https://images.unsplash.com/photo-1516042438821-0abd7a73c4b3",
    description: "Follow Tiny the T-Rex as he navigates his first day of dinosaur school and makes new friends.",
    pageCount: 28,
    publicationYear: 2019,
    genre: "Children's Dinosaur",
    isKidFriendly: true,
    readingLevel: "Ages 4-6",
    hasAudiobook: true,
  },
  {
    id: 105,
    title: "Goodnight Moon and Stars",
    author: "Sarah Williams",
    coverUrl: "https://images.unsplash.com/photo-1516280287949-2747a3304a2f",
    description: "A soothing bedtime story that takes children on a peaceful journey through the night sky.",
    pageCount: 20,
    publicationYear: 2020,
    genre: "Children's Bedtime",
    isKidFriendly: true,
    readingLevel: "Ages 2-4",
    isBedtimeStory: true,
    hasAudiobook: true,
  },
  {
    id: 106,
    title: "The Five-Minute Dragon Tale",
    author: "David Lee",
    coverUrl: "https://images.unsplash.com/photo-1559475470-c399f648251d",
    description: "A quick adventure with a friendly dragon who helps a village solve a problem.",
    pageCount: 10,
    publicationYear: 2021,
    genre: "Children's Fantasy",
    isKidFriendly: true,
    readingLevel: "Ages 5-8",
    isFiveMinuteStory: true,
    hasAudiobook: true,
  },
  {
    id: 107,
    title: "Counting Stars",
    author: "Lisa Johnson",
    coverUrl: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c",
    description: "A magical counting book that helps children learn numbers while exploring the night sky.",
    pageCount: 15,
    publicationYear: 2022,
    genre: "Children's Educational",
    isKidFriendly: true,
    readingLevel: "Ages 3-5",
    isBedtimeStory: true,
    hasAudiobook: true,
  },
  {
    id: 108,
    title: "The Quick Bunny Race",
    author: "Michael Brown",
    coverUrl: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2",
    description: "A fast-paced story about a bunny race that teaches the importance of persistence.",
    pageCount: 12,
    publicationYear: 2021,
    genre: "Children's Fable",
    isKidFriendly: true,
    readingLevel: "Ages 4-7",
    isFiveMinuteStory: true,
    hasAudiobook: true,
  }
];

// Bedtime stories collection
export const bedtimeStories = kidsBooks.filter(book => book.isBedtimeStory);

// Five-minute stories collection
export const fiveMinuteStories = kidsBooks.filter(book => book.isFiveMinuteStory);

// Get kids book by ID
export const getKidsBookById = (id: number) => {
  return kidsBooks.find(book => book.id === id);
};

// All kids books (regardless of category)
export const allKidsBooks = kidsBooks;
