import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Sidebar from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookGrid from "@/components/books/book-grid";
import { books } from "@/data/books";
import { useMode } from "@/hooks/use-mode";
import { CheckCircle, Brain, BookOpen, Clock, ThumbsUp, MoveRight } from "lucide-react";
import KidHeader from "@/components/kids/kid-header";
import { kidsBooks } from "@/data/kids-books";
import KidBookCard from "@/components/kids/kid-book-card";

export default function BookMatch() {
  const { isKidsMode } = useMode();
  
  return isKidsMode ? <KidBookMatchQuiz /> : <StandardBookMatchQuiz />;
}

function StandardBookMatchQuiz() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(20);
  const totalSteps = 5;
  
  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      setProgress(((step + 1) / totalSteps) * 100);
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(((step - 1) / totalSteps) * 100);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar />
        
        <main className="flex-1 px-4 py-8 lg:px-8">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">Book Match Quiz</h1>
            <p className="text-muted-foreground mb-6">
              Answer a few questions to help us find your perfect next read.
            </p>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <Progress value={progress} className="h-2 mb-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Step {step} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>
            
            {/* Quiz Cards */}
            <div className="space-y-6">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>What genres do you enjoy reading?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["Fiction", "Non-Fiction", "Mystery", "Science Fiction", "Fantasy", 
                        "Romance", "Biography", "History", "Self-Help", "Business"].map((genre) => (
                        <div key={genre} className="flex items-center space-x-2">
                          <input type="checkbox" id={genre} className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor={genre}>{genre}</Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleNextStep}>
                      Next
                      <MoveRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>How much time do you spend reading each week?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup defaultValue="2-5">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="<1" id="lt1" />
                        <Label htmlFor="lt1">Less than 1 hour</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2-5" id="2-5" />
                        <Label htmlFor="2-5">2-5 hours</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="6-10" id="6-10" />
                        <Label htmlFor="6-10">6-10 hours</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="10+" id="10plus" />
                        <Label htmlFor="10plus">More than 10 hours</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>Back</Button>
                    <Button onClick={handleNextStep}>Next</Button>
                  </CardFooter>
                </Card>
              )}
              
              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>What's your preferred reading pace?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Slow, savoring each word</span>
                        <span className="text-sm">Fast, eager to find out what happens</span>
                      </div>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                    
                    <div>
                      <Label htmlFor="wpm">Your estimated reading speed (words per minute)</Label>
                      <div className="flex items-center space-x-4 mt-2">
                        <Button variant="outline" size="sm">Slow (150)</Button>
                        <Button variant="outline" size="sm">Average (250)</Button>
                        <Button variant="outline" size="sm">Fast (400)</Button>
                        <Button variant="outline" size="sm">Very Fast (600+)</Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>Back</Button>
                    <Button onClick={handleNextStep}>Next</Button>
                  </CardFooter>
                </Card>
              )}
              
              {step === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle>How are you feeling today?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-auto py-8 flex flex-col items-center">
                        <div className="text-2xl mb-2">😊</div>
                        <span>Happy & Upbeat</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-8 flex flex-col items-center">
                        <div className="text-2xl mb-2">🤔</div>
                        <span>Contemplative</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-8 flex flex-col items-center">
                        <div className="text-2xl mb-2">😴</div>
                        <span>Tired & Relaxed</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-8 flex flex-col items-center">
                        <div className="text-2xl mb-2">🧠</div>
                        <span>Mentally Stimulated</span>
                      </Button>
                    </div>
                    
                    <div className="mt-6">
                      <Label htmlFor="mood">Tell us more about your current mood:</Label>
                      <Textarea
                        id="mood"
                        placeholder="I'm feeling..."
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>Back</Button>
                    <Button onClick={handleNextStep}>Next</Button>
                  </CardFooter>
                </Card>
              )}
              
              {step === 5 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your recent favorite reads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tell us about a few books you've enjoyed recently so we can find similar recommendations.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="book1">Book 1</Label>
                        <div className="flex gap-2 mt-1">
                          <input
                            type="text"
                            id="book1"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Title or Author"
                          />
                          <Button variant="outline" size="icon" className="h-10 w-10">
                            <BookOpen className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="book2">Book 2</Label>
                        <div className="flex gap-2 mt-1">
                          <input
                            type="text"
                            id="book2"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Title or Author"
                          />
                          <Button variant="outline" size="icon" className="h-10 w-10">
                            <BookOpen className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="book3">Book 3</Label>
                        <div className="flex gap-2 mt-1">
                          <input
                            type="text"
                            id="book3"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Title or Author"
                          />
                          <Button variant="outline" size="icon" className="h-10 w-10">
                            <BookOpen className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>Back</Button>
                    <Button onClick={() => setStep(6)}>Get Recommendations</Button>
                  </CardFooter>
                </Card>
              )}
              
              {step === 6 && (
                <div className="space-y-8">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <CheckCircle className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Your Book Match is Complete!</h3>
                          <p className="text-muted-foreground">We've found books that match your preferences.</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex flex-col items-center p-4 rounded-lg bg-background">
                          <Brain className="h-8 w-8 text-primary mb-2" />
                          <span className="text-sm font-medium">Thoughtful Reads</span>
                        </div>
                        <div className="flex flex-col items-center p-4 rounded-lg bg-background">
                          <Clock className="h-8 w-8 text-primary mb-2" />
                          <span className="text-sm font-medium">5-7 day reads</span>
                        </div>
                        <div className="flex flex-col items-center p-4 rounded-lg bg-background">
                          <ThumbsUp className="h-8 w-8 text-primary mb-2" />
                          <span className="text-sm font-medium">98% Match</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Tabs defaultValue="matches">
                    <TabsList className="mb-6">
                      <TabsTrigger value="matches">Perfect Matches</TabsTrigger>
                      <TabsTrigger value="stretch">Stretch Recommendations</TabsTrigger>
                      <TabsTrigger value="audiobook">Audio Recommendations</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="matches" className="mt-0">
                      <BookGrid books={books.slice(0, 4)} title="Your Personalized Recommendations" />
                    </TabsContent>
                    
                    <TabsContent value="stretch" className="mt-0">
                      <BookGrid books={books.slice(4, 8)} title="Try Something Different" />
                    </TabsContent>
                    
                    <TabsContent value="audiobook" className="mt-0">
                      <BookGrid books={books.filter(b => b.hasAudiobook).slice(0, 4)} title="Great Audiobooks For You" />
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-center">
                    <Button variant="outline" onClick={() => setStep(1)}>Retake Quiz</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

function KidBookMatchQuiz() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setStep(4); // Results
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-violet-50">
      <KidHeader />
      
      <main className="flex-1 px-4 py-6 container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-violet-700 text-center">
            Find Your Perfect Book!
          </h1>
          
          {/* Quiz Cards */}
          <div className="space-y-6">
            {step === 1 && (
              <Card className="border-4 border-violet-300 rounded-3xl overflow-hidden">
                <div className="bg-violet-200 p-4">
                  <CardTitle className="text-2xl text-violet-700">What do you like to read about?</CardTitle>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center border-violet-300 hover:bg-violet-100 rounded-xl">
                      <div className="text-3xl mb-2">🧙‍♂️</div>
                      <span className="text-lg">Magic & Fantasy</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center border-violet-300 hover:bg-violet-100 rounded-xl">
                      <div className="text-3xl mb-2">🚀</div>
                      <span className="text-lg">Adventure</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center border-violet-300 hover:bg-violet-100 rounded-xl">
                      <div className="text-3xl mb-2">🦄</div>
                      <span className="text-lg">Animals</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center border-violet-300 hover:bg-violet-100 rounded-xl">
                      <div className="text-3xl mb-2">🦸‍♀️</div>
                      <span className="text-lg">Heroes</span>
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="p-6 bg-violet-100 flex justify-center">
                  <Button className="bg-violet-600 hover:bg-violet-700 text-lg rounded-xl" onClick={handleNextStep}>
                    Next Question
                    <MoveRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {step === 2 && (
              <Card className="border-4 border-violet-300 rounded-3xl overflow-hidden">
                <div className="bg-violet-200 p-4">
                  <CardTitle className="text-2xl text-violet-700">How long do you like your stories?</CardTitle>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex items-center justify-start border-violet-300 hover:bg-violet-100 rounded-xl">
                      <div className="text-2xl mr-4">⚡</div>
                      <span className="text-lg">Super Quick (5 minutes)</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex items-center justify-start border-violet-300 hover:bg-violet-100 rounded-xl">
                      <div className="text-2xl mr-4">🕰️</div>
                      <span className="text-lg">Short (10-15 minutes)</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex items-center justify-start border-violet-300 hover:bg-violet-100 rounded-xl">
                      <div className="text-2xl mr-4">📚</div>
                      <span className="text-lg">Medium (15-30 minutes)</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex items-center justify-start border-violet-300 hover:bg-violet-100 rounded-xl">
                      <div className="text-2xl mr-4">🌙</div>
                      <span className="text-lg">Bedtime Story (perfect for sleepytime)</span>
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="p-6 bg-violet-100 flex justify-center">
                  <Button className="bg-violet-600 hover:bg-violet-700 text-lg rounded-xl" onClick={handleNextStep}>
                    Next Question
                    <MoveRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {step === 3 && (
              <Card className="border-4 border-violet-300 rounded-3xl overflow-hidden">
                <div className="bg-violet-200 p-4">
                  <CardTitle className="text-2xl text-violet-700">How do you want to enjoy your story?</CardTitle>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center border-violet-300 hover:bg-violet-100 rounded-xl">
                      <div className="text-3xl mb-2">📖</div>
                      <span className="text-lg">Read by myself</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center border-violet-300 hover:bg-violet-100 rounded-xl">
                      <div className="text-3xl mb-2">🎧</div>
                      <span className="text-lg">Listen to story</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center border-violet-300 hover:bg-violet-100 rounded-xl">
                      <div className="text-3xl mb-2">👪</div>
                      <span className="text-lg">Read with grown-up</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center border-violet-300 hover:bg-violet-100 rounded-xl">
                      <div className="text-3xl mb-2">🌟</div>
                      <span className="text-lg">Any way is fine!</span>
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="p-6 bg-violet-100 flex justify-center">
                  <Button className="bg-violet-600 hover:bg-violet-700 text-lg rounded-xl" onClick={handleNextStep}>
                    Find My Books!
                    <MoveRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {step === 4 && (
              <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
                <Card className="border-4 border-violet-300 rounded-3xl overflow-hidden">
                  <CardContent className="pt-6 p-6">
                    <div className="flex items-center justify-center mb-6">
                      <div className="bg-violet-200 p-4 rounded-full">
                        <CheckCircle className="h-10 w-10 text-violet-600" />
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-center text-violet-700 mb-4">
                      Hooray! We Found Your Perfect Books!
                    </h2>
                    
                    <div className="flex justify-center">
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div key={star} className="text-4xl text-yellow-400">⭐</div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recommended Books */}
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-violet-700">
                    Books Just For You!
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {kidsBooks.slice(0, 3).map(book => (
                      <KidBookCard key={book.id} book={book} />
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-violet-700 pt-4">
                    Fun Bedtime Stories
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {kidsBooks.filter(b => b.isBedtimeStory).slice(0, 3).map(book => (
                      <KidBookCard key={book.id} book={book} />
                    ))}
                  </div>
                  
                  <div className="flex justify-center pt-6">
                    <Button className="bg-violet-600 hover:bg-violet-700 text-lg rounded-xl" onClick={() => setStep(1)}>
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
