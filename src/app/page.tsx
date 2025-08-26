"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Medal, BookOpen, Users, Star } from 'lucide-react';
import { playtestSessions, gameProjects } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { LandingPage } from '@/components/landing-page';
import { useAuth } from '@/hooks/useAuth';

function Dashboard() {
  const { user, profile } = useAuth();
  
  const upcomingSessions = playtestSessions.filter(
    (session) => new Date(session.scheduledDate) > new Date() && session.status === 'scheduled'
  );
  const userProjects = gameProjects.filter(p => p.designerId === user?.id && p.isActive);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome back, {(profile.display_name || user.email?.split('@')[0] || 'User').split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here's a snapshot of your journey in game design today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contribution Points
            </CardTitle>
            <Medal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile?.total_contribution_points || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +10 points from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Testing Points</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile?.total_testing_points || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +5 from your last playtest
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProjects.length}</div>
            <p className="text-xs text-muted-foreground">
              Keep up the great work!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membership</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{profile?.membership_tier || 'basic'}</div>
            <p className="text-xs text-muted-foreground">
              {profile?.membership_expiry 
                ? `Expires on ${new Date(profile.membership_expiry).toLocaleDateString()}`
                : 'Active membership'
              }
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Your Active Projects</CardTitle>
            <CardDescription>
              An overview of games you are currently developing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userProjects.length > 0 ? (
                userProjects.map((project) => (
                    <div key={project.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                        <Image src={`https://placehold.co/100x100.png`} alt={project.title} width={64} height={64} className="rounded-md" data-ai-hint="game box" />
                        <div className="flex-1">
                            <Link href={`/projects/${project.id}`} className="font-semibold hover:underline">{project.title}</Link>
                            <p className="text-sm text-muted-foreground">{project.description.substring(0, 80)}...</p>
                        </div>
                        <Badge variant="outline" className="capitalize">{project.stage}</Badge>
                    </div>
                ))
            ) : (
                <p className="text-center text-muted-foreground py-8">You have no active projects. Start a new one!</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Upcoming Playtests</CardTitle>
            <CardDescription>
              Sessions you can join to help fellow designers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.slice(0, 3).map((session) => (
                <div key={session.id} className="flex flex-col gap-1 p-2 rounded-lg hover:bg-muted">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold">{gameProjects.find(p => p.id === session.gameProjectId)?.title}</p>
                            <p className="text-sm text-muted-foreground">{session.venue}</p>
                        </div>
                        <Badge variant="secondary">{session.registeredPlayers.length}/{session.maxPlayers}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{new Date(session.scheduledDate).toLocaleString()}</p>
                </div>
            ))}
            <Button asChild className="w-full">
                <Link href="/playtest-queue">View All Sessions</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return user ? <Dashboard /> : <LandingPage />;
}
