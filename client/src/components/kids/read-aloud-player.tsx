import { useState, useRef } from "react";
import { Book } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Rewind,
  FastForward,
  Home
} from "lucide-react";

interface ReadAloudPlayerProps {
  book: Partial<Book>;
}

export default function ReadAloudPlayer({ book }: ReadAloudPlayerProps) {
  // State for player controls (static demo)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // 5 minutes in seconds
  const [isMuted, setIsMuted] = useState(false);
  
  // Ref for audio (would be used in a real implementation)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Would actually play/pause audio in real implementation
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Would actually mute audio in real implementation
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleTimeChange = (value: number[]) => {
    setCurrentTime(value[0]);
    // Would seek to this time in real implementation
  };
  
  const skipBackward = () => {
    const newTime = Math.max(0, currentTime - 10);
    setCurrentTime(newTime);
  };
  
  const skipForward = () => {
    const newTime = Math.min(duration, currentTime + 10);
    setCurrentTime(newTime);
  };
  
  const goToStart = () => {
    setCurrentTime(0);
  };
  
  return (
    <div className="p-6 rounded-3xl bg-violet-100 border-4 border-violet-300 shadow-lg">
      <div className="flex items-center space-x-6 mb-6">
        <img 
          src={book.coverUrl} 
          alt={`Cover of ${book.title}`} 
          className="h-24 w-24 object-cover rounded-xl border-4 border-violet-400"
        />
        <div>
          <h3 className="font-bold text-2xl text-violet-700">
            {book.title}
          </h3>
          <p className="text-lg text-violet-600">
            by {book.author}
          </p>
        </div>
      </div>
      
      {/* Voice selection for kids */}
      <div className="mb-6 bg-violet-200 p-4 rounded-xl">
        <h4 className="font-bold text-violet-700 mb-3">Choose a Reader Voice:</h4>
        <div className="flex flex-wrap gap-2">
          <Button className="bg-violet-500 hover:bg-violet-600 text-white font-bold text-lg rounded-xl">
            Storytime Sam
          </Button>
          <Button variant="outline" className="border-violet-500 text-violet-600 hover:bg-violet-100 font-bold text-lg rounded-xl">
            Magical Maya
          </Button>
          <Button variant="outline" className="border-violet-500 text-violet-600 hover:bg-violet-100 font-bold text-lg rounded-xl">
            Robot Remy
          </Button>
        </div>
      </div>
      
      {/* Time slider */}
      <div className="flex items-center space-x-4 mb-6">
        <Button
          onClick={goToStart}
          variant="ghost"
          size="icon"
          className="bg-violet-200 text-violet-700 hover:bg-violet-300 h-10 w-10 rounded-lg"
        >
          <Home className="h-5 w-5" />
        </Button>
        
        <span className="text-base font-medium text-violet-700 w-14 text-center">
          {formatTime(currentTime)}
        </span>
        
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleTimeChange}
          className="flex-1"
        />
        
        <span className="text-base font-medium text-violet-700 w-14 text-center">
          {formatTime(duration)}
        </span>
        
        <Button
          onClick={toggleMute}
          variant="ghost"
          size="icon"
          className="bg-violet-200 text-violet-700 hover:bg-violet-300 h-10 w-10 rounded-lg"
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Playback controls - Large, kid-friendly buttons */}
      <div className="flex items-center justify-center space-x-6">
        <Button 
          onClick={skipBackward} 
          variant="outline" 
          size="icon"
          className="border-violet-400 text-violet-600 hover:bg-violet-200 hover:border-violet-500 h-16 w-16 rounded-xl"
        >
          <Rewind className="h-8 w-8" />
        </Button>
        
        <Button 
          onClick={togglePlay} 
          className="rounded-full bg-violet-600 hover:bg-violet-700 h-20 w-20 flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="h-10 w-10" />
          ) : (
            <Play className="h-10 w-10 ml-1" />
          )}
        </Button>
        
        <Button 
          onClick={skipForward} 
          variant="outline" 
          size="icon"
          className="border-violet-400 text-violet-600 hover:bg-violet-200 hover:border-violet-500 h-16 w-16 rounded-xl"
        >
          <FastForward className="h-8 w-8" />
        </Button>
      </div>
      
      {/* Text highlighting would be here in a real implementation */}
      <div className="mt-8 p-6 bg-white rounded-xl border-2 border-violet-300 text-lg text-violet-800 leading-relaxed">
        <p>
          The story text would appear here as it's being read, with 
          <span className="bg-violet-200 px-1 mx-1">highlighted words</span> 
          that show what's currently being read aloud.
        </p>
      </div>
      
      {/* Actual audio element would be here in a real implementation */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
