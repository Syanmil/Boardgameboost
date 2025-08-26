"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileText,
  Clock,
  Trophy,
  UserCircle,
} from "lucide-react";
import { BoardGameBoostIcon } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FileText },
  { href: "/playtest-queue", label: "Playtest Queue", icon: Clock },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { user, profile } = useAuth();

  // Show loading state if user data isn't available yet
  if (!user) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Loading navigation...
      </div>
    );
  }

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <BoardGameBoostIcon className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold font-headline">BoardGameBoost</h2>
            <p className="text-xs text-muted-foreground">Yogyakarta Chapter</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  className="justify-start"
                  asChild
                >
                  <a>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.label}
                    </span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
         <div className="flex items-center gap-3">
            <Avatar>
                <AvatarImage 
                  src={profile?.avatar_url || ""} 
                  alt={profile?.display_name || user.email || "User"} 
                />
                <AvatarFallback>
                  {profile?.display_name 
                    ? profile.display_name.charAt(0).toUpperCase()
                    : user.email?.charAt(0).toUpperCase() || "U"
                  }
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
                <p className="font-semibold truncate">
                  {profile?.display_name || user.email?.split('@')[0] || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                {profile && (
                  <Badge variant="secondary" className="text-xs w-fit mt-1">
                    {profile.membership_tier}
                  </Badge>
                )}
            </div>
         </div>
      </SidebarFooter>
    </>
  );
}
