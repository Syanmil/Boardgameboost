"use client";

import { Button } from "@/components/ui/button";
import { BoardGameBoostIcon } from "@/components/icons";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function LandingNavbar() {
  const { user, profile, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <BoardGameBoostIcon className="w-8 h-8" />
            <span className="font-headline text-xl font-bold">BoardGameBoost</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted animate-pulse rounded-full"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <BoardGameBoostIcon className="w-8 h-8" />
          <span className="font-headline text-xl font-bold">BoardGameBoost</span>
        </div>

        {/* Auth State */}
        <div className="flex items-center gap-2">
          {user ? (
            // Authenticated User Menu
            <div className="flex items-center gap-3">
              <Button asChild>
                <Link href="/" className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage 
                        src={profile?.avatar_url || ""} 
                        alt={profile?.display_name || user.email || "User"} 
                      />
                      <AvatarFallback>
                        {profile?.display_name 
                          ? profile.display_name.split(' ').map(n => n[0]).join('').toUpperCase()
                          : user.email?.[0]?.toUpperCase() || <User className="w-4 h-4" />
                        }
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">
                      {profile?.display_name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    {profile && (
                      <p className="text-xs leading-none text-muted-foreground capitalize">
                        {profile.membership_tier} Member
                      </p>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/" className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600 focus:text-red-600"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            // Non-authenticated User Buttons
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth">Join Community</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}