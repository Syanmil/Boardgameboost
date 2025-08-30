"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MessageSquare, Trophy, Play, Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing-navbar";

const activities = [
  {
    id: 1,
    title: "Weekly Game Design Workshop",
    description: "Learn the fundamentals of board game design through hands-on activities and expert guidance.",
    image: "https://placehold.co/400x300/A7D1AB/FFFFFF?text=Workshop",
    date: "Monthly on Wednesdays First Week",
  },
  {
    id: 2,
    title: "Playtest Saturday Sessions",
    description: "Test your prototypes with fellow designers and get valuable feedback to improve your games.",
    image: "https://placehold.co/400x300/E5B9A5/FFFFFF?text=Playtest",
    date: "Every Wednesday",
  },
  {
    id: 3,
    title: "Monthly Game Publishing Talk",
    description: "Industry experts share insights on publishing, marketing, and bringing your games to market.",
    image: "https://placehold.co/400x300/A7D1AB/FFFFFF?text=Publishing",
    date: "Tentative - Monthly on Wednesday fourth week",
  },
  {
    id: 4,
    title: "Design Challenge Competition",
    description: "Monthly themed design challenges to spark creativity and friendly competition among members.",
    image: "https://placehold.co/400x300/E5B9A5/FFFFFF?text=Challenge",
    date: "quarterly",
  }
];

const galleryImages = [
  {
    id: 1,
    src: "https://placehold.co/600x400/A7D1AB/FFFFFF?text=Workshop+Session",
    alt: "Members working on game prototypes during a workshop",
    caption: "Collaborative design session"
  },
  {
    id: 2,
    src: "https://placehold.co/600x400/E5B9A5/FFFFFF?text=Playtest+Event",
    alt: "Group of people playtesting board games",
    caption: "Saturday playtest gathering"
  },
  {
    id: 3,
    src: "https://placehold.co/600x400/A7D1AB/FFFFFF?text=Community+Meet",
    alt: "Community members discussing game ideas",
    caption: "Monthly community meetup"
  },
  {
    id: 4,
    src: "https://placehold.co/600x400/E5B9A5/FFFFFF?text=Game+Showcase",
    alt: "Display of member-created board games",
    caption: "Member game showcase"
  },
  {
    id: 5,
    src: "https://placehold.co/600x400/A7D1AB/FFFFFF?text=Design+Talk",
    alt: "Speaker presenting to the community",
    caption: "Industry expert presentation"
  },
  {
    id: 6,
    src: "https://placehold.co/600x400/E5B9A5/FFFFFF?text=Winner+Ceremony",
    alt: "Winners of design challenge",
    caption: "Design challenge winners"
  }
];

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <LandingNavbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold font-headline mb-6 text-foreground">
            Yogyakarta Board Game Design Club
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join our vibrant community of board game designers, creators, and enthusiasts. 
            Learn, create, playtest, and bring your game ideas to life with fellow passionate designers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth">Join Our Community</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#activities">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="activities" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline mb-4">What We Do</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our community focuses on fostering creativity, collaboration, and skill development 
              in board game design through various activities and events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Users className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect with like-minded designers and build lasting friendships.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Calendar className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Regular Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Weekly workshops, monthly talks, and special design challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MessageSquare className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get constructive feedback on your designs from experienced players.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Trophy className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Participate in challenges and showcase your creative achievements.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {activity.title}
                   {typeof activity.participants === "number" && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {activity.participants}
                      </Badge>
                   )}
                  </CardTitle>
                  <CardDescription>{activity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {activity.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline mb-4 flex items-center justify-center gap-2">
              <Camera className="w-8 h-8 text-primary" />
              Community Gallery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take a look at our vibrant community in action through these moments 
              captured during our various events and activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-center">{image.caption}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">Ready to Join Us?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Become part of Yogyakarta's most creative board game design community. 
            Start your journey as a game designer today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Get Started Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#activities">Learn More About Our Activities</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}