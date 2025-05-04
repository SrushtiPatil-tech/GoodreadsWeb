import { useState, useRef } from "react";
import { Book } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Rewind,
  FastForward
} from "lucide-react";
import { useMode } from "@/hooks/use-mode";

interface AudioPlayerProps {
  book: Partial<Book>;
  isKidUI?: boolean;
}

export default function AudioPlayer({ book, isKidUI = false }: AudioPlayerProps) {
  const { isKidsMode } = useMode();
  // For a static demo, we don't need actual audio functionality
  // But we'll simulate the player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(360); // 6 minutes in seconds
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  
  // For the actual player we would use useRef
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In an actual implementation, we would play/pause the audio element
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In an actual implementation, we would mute/unmute the audio element
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleTimeChange = (value: number[]) => {
    setCurrentTime(value[0]);
    // In an actual implementation, we would seek to this time
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (isMuted && value[0] > 0) setIsMuted(false);
    // In an actual implementation, we would set volume on the audio element
  };
  
  const skipBackward = () => {
    const newTime = Math.max(0, currentTime - 10);
    setCurrentTime(newTime);
  };
  
  const skipForward = () => {
    const newTime = Math.min(duration, currentTime + 10);
    setCurrentTime(newTime);
  };
  
  // Use different styles based on isKidUI prop or global kids mode
  const useKidStyles = isKidUI || isKidsMode;
  
  return (
    <div className={`p-4 rounded-lg ${
      useKidStyles 
        ? 'bg-violet-100 border-2 border-violet-300' 
        : 'bg-secondary/30 border border-border'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={book.coverUrl} 
            alt={`Cover of ${book.title}`} 
            className={`h-16 w-16 object-cover rounded ${useKidStyles ? 'border-2 border-violet-400' : ''}`}
          />
          <div>
            <h3 className={`font-bold ${useKidStyles ? 'text-violet-700 text-lg' : 'text-base'}`}>
              {book.title}
            </h3>
            <p className={`text-sm ${useKidStyles ? 'text-violet-600' : 'text-muted-foreground'}`}>
              {book.author}
            </p>
          </div>
        </div>
        
        {/* Kid mode uses larger, more colorful controls */}
        {useKidStyles ? (
          <Button 
            onClick={toggleMute}
            variant="ghost" 
            size="icon" 
            className="text-violet-600 hover:text-violet-800 hover:bg-violet-200"
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>
        ) : (
          <div className="flex items-center space-x-2 w-28">
            <Button onClick={toggleMute} variant="ghost" size="icon" className="h-8 w-8">
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>
        )}
      </div>
      
      {/* Audio controls */}
      <div className="flex flex-col space-y-3">
        {/* Time slider */}
        <div className="flex items-center space-x-2">
          <span className={`text-xs ${useKidStyles ? 'text-violet-700' : 'text-muted-foreground'}`}>
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={handleTimeChange}
            className={`flex-1 ${useKidStyles ? 'text-violet-500' : ''}`}
          />
          <span className={`text-xs ${useKidStyles ? 'text-violet-700' : 'text-muted-foreground'}`}>
            {formatTime(duration)}
          </span>
        </div>
        
        {/* Playback controls */}
        <div className="flex items-center justify-center space-x-2">
          {useKidStyles ? (
            // Kid-friendly larger controls
            <>
              <Button 
                onClick={skipBackward} 
                variant="ghost" 
                size="icon"
                className="text-violet-600 hover:text-violet-800 hover:bg-violet-200 h-12 w-12"
              >
                <Rewind className="h-8 w-8" />
              </Button>
              
              <Button 
                onClick={togglePlay} 
                className="rounded-full bg-violet-600 hover:bg-violet-700 h-16 w-16 flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </Button>
              
              <Button 
                onClick={skipForward} 
                variant="ghost" 
                size="icon"
                className="text-violet-600 hover:text-violet-800 hover:bg-violet-200 h-12 w-12"
              >
                <FastForward className="h-8 w-8" />
              </Button>
            </>
          ) : (
            // Standard controls
            <>
              <Button onClick={() => setCurrentTime(0)} variant="ghost" size="icon" className="h-9 w-9">
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button onClick={skipBackward} variant="ghost" size="icon" className="h-9 w-9">
                <Rewind className="h-4 w-4" />
              </Button>
              
              <Button onClick={togglePlay} size="icon" className="rounded-full h-10 w-10">
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>
              
              <Button onClick={skipForward} variant="ghost" size="icon" className="h-9 w-9">
                <FastForward className="h-4 w-4" />
              </Button>
              
              <Button onClick={() => setCurrentTime(duration)} variant="ghost" size="icon" className="h-9 w-9">
                <SkipForward className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        
        {/* Some playback speed options for non-kid UI */}
        {!useKidStyles && (
          <div className="flex items-center justify-center space-x-2">
            <Button variant="ghost" size="sm" className="text-xs h-7">
              0.75x
            </Button>
            <Button variant="ghost" size="sm" className="text-xs font-bold h-7 bg-secondary/50">
              1x
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-7">
              1.25x
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-7">
              1.5x
            </Button>
          </div>
        )}
      </div>
      
      {/* Actual audio element would be here in a real implementation */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
