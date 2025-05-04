import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Sidebar from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useMode } from "@/hooks/use-mode";
import {
  Check,
  X,
  CreditCard,
  Sparkles,
  Headphones,
  BookOpen,
  BarChart3,
  Shield,
  BookMarked
} from "lucide-react";
import KidHeader from "@/components/kids/kid-header";

export default function Subscription() {
  const { isKidsMode } = useMode();

  return isKidsMode ? <KidsSubscription /> : <StandardSubscription />;
}

function StandardSubscription() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  // Subscription plans data
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: { monthly: 4.99, yearly: 49.99 },
      description: "Essential features for casual readers",
      features: [
        { text: "Access to basic book recommendations", included: true },
        { text: "Limited book previews", included: true },
        { text: "Reading progress tracking", included: true },
        { text: "Ad-supported experience", included: true },
        { text: "Full e-book access", included: false },
        { text: "Audiobook access", included: false },
        { text: "Advanced reading analytics", included: false },
        { text: "Kids Mode features", included: false },
      ],
      popular: false,
    },
    {
      id: "standard",
      name: "Standard",
      price: { monthly: 9.99, yearly: 99.99 },
      description: "Perfect for regular readers",
      features: [
        { text: "Advanced book recommendations", included: true },
        { text: "Unlimited book previews", included: true },
        { text: "Advanced reading progress tracking", included: true },
        { text: "Ad-free experience", included: true },
        { text: "Full e-book access (10/month)", included: true },
        { text: "Limited audiobook access (5/month)", included: true },
        { text: "Basic reading analytics", included: true },
        { text: "Kids Mode with parental controls", included: false },
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: { monthly: 14.99, yearly: 149.99 },
      description: "The ultimate reading experience",
      features: [
        { text: "Personalized AI book recommendations", included: true },
        { text: "Unlimited book access", included: true },
        { text: "Comprehensive reading tracker & analytics", included: true },
        { text: "Ad-free premium experience", included: true },
        { text: "Unlimited e-book access", included: true },
        { text: "Unlimited audiobook access", included: true },
        { text: "Advanced reading analytics & yearly report", included: true },
        { text: "Kids Mode with all features & parental controls", included: true },
      ],
      popular: false,
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar />
        
        <main className="flex-1 px-4 py-8 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Subscription Plans</h1>
            <p className="text-muted-foreground mb-8">
              Choose the perfect plan to enhance your reading experience.
            </p>
            
            {/* Billing Cycle Selector */}
            <div className="flex justify-center mb-10">
              <Tabs 
                defaultValue="monthly" 
                value={billingCycle}
                onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}
                className="w-full max-w-md"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                  <TabsTrigger value="yearly">
                    Yearly Billing
                    <Badge className="ml-2 bg-green-500 hover:bg-green-600">Save 15%</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Subscription Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary/50 shadow-md' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary hover:bg-primary">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}</span>
                      <span className="text-muted-foreground">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                          )}
                          <span className={feature.included ? '' : 'text-muted-foreground'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}>
                      Select {plan.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Features Comparison */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Why Subscribe?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Unlimited Books</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Access thousands of e-books across all genres. New titles added every week.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                      <Headphones className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Audiobook Library</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Listen to professionally narrated audiobooks anywhere, anytime, on any device.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Advanced Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Track your reading habits, get personalized insights, and view your yearly reading DNA report.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">What Our Subscribers Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-5 w-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-muted-foreground text-sm">3 months ago</div>
                    </div>
                    <p className="italic mb-4">
                      "The reading analytics have completely changed how I approach books. Knowing my reading speed helps me plan my reading schedule, and the recommendations are spot on!"
                    </p>
                    <div className="font-medium">Sarah J.</div>
                    <div className="text-sm text-muted-foreground">Premium subscriber</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-5 w-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-muted-foreground text-sm">1 month ago</div>
                    </div>
                    <p className="italic mb-4">
                      "My kids absolutely love the Kids Mode. The bedtime stories and read-aloud feature have become part of our nightly routine. Worth every penny for our family!"
                    </p>
                    <div className="font-medium">Michael T.</div>
                    <div className="text-sm text-muted-foreground">Standard subscriber</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How does the billing work?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You'll be billed either monthly or yearly, depending on your chosen plan. You can cancel anytime, and your subscription will remain active until the end of the billing period.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I switch plans?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, you can upgrade or downgrade your subscription at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect on your next billing date.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What devices can I read on?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our service works on any device with a web browser, including smartphones, tablets, and computers. We also offer dedicated apps for iOS and Android for a better mobile reading experience.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Are the parental controls effective?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our parental controls allow you to set content restrictions, time limits, and monitor reading activity. They are designed to provide a safe reading environment for children of all ages.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-16 mb-8">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 pb-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 flex items-center">
                        <Sparkles className="text-primary mr-2 h-6 w-6" />
                        Ready to enhance your reading experience?
                      </h3>
                      <p className="text-muted-foreground">
                        Join thousands of readers who have elevated their reading journey with our premium features.
                      </p>
                    </div>
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Start Free Trial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

function KidsSubscription() {
  // Simplified subscription page for kids mode
  return (
    <div className="min-h-screen flex flex-col bg-violet-50">
      <KidHeader />
      
      <main className="flex-1 px-4 py-6 container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-violet-700 mb-4">
            Ask a Grown-Up About Reading Plans!
          </h1>
          <p className="text-xl text-violet-600 max-w-2xl mx-auto">
            This section is for parents. If you want to unlock all the fun stories and read-aloud features, please ask a grown-up to help!
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl border-4 border-violet-300 mb-10">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-violet-200 p-3 rounded-full mr-4">
                <BookMarked className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-violet-700">Unlimited Stories</h3>
                <p className="text-violet-600">Read all the books in our library!</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-violet-200 p-3 rounded-full mr-4">
                <Headphones className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-violet-700">Listen to Stories</h3>
                <p className="text-violet-600">All books can be read aloud to you!</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-violet-200 p-3 rounded-full mr-4">
                <Shield className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-violet-700">Parent Controls</h3>
                <p className="text-violet-600">Safe reading for all ages!</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-lg mx-auto text-center">
          <Button className="bg-violet-600 hover:bg-violet-700 text-lg rounded-xl py-6 px-8">
            Take Me Back to Stories
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

