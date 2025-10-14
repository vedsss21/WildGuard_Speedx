
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Activity,
  Award,
  BarChart3,
  Beaker,
  Bell,
  Handshake,
  LayoutDashboard,
  LogOut,
  Map,
  Settings,
  ShieldAlert,
  User,
  Users,
  Siren,
  WifiOff,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Icons } from "@/components/icons";
import Header from "@/components/dashboard/header";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { LanguageProvider, useTranslation } from "@/contexts/language-context";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "nav.dashboard" },
  { href: "/dashboard/map", icon: Map, label: "nav.map" },
  { href: "/dashboard/reports", icon: BarChart3, label: "nav.reports" },
  { href: "/dashboard/analyzer", icon: Activity, label: "nav.analyzer" },
  { href: "/dashboard/research", icon: Beaker, label: "nav.research" },
  { href: "/dashboard/community", icon: Handshake, label: "nav.community" },
  { href: "/dashboard/engagement", icon: Award, label: "nav.engagement" },
  { href: "/dashboard/incidents", icon: ShieldAlert, label: "nav.manageIncidents" },
  { href: "/dashboard/alerts", icon: Siren, label: "nav.alerts" },
  { href: "/dashboard/rangers", icon: Users, label: "nav.rangers" },
  { href: "/dashboard/offline", icon: WifiOff, label: "nav.offline" },
];

function DashboardNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
     <SidebarMenu>
      {NAV_ITEMS.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={t(item.label)}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{t(item.label)}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

function UserMenu() {
  const { t } = useTranslation();
  const userProfileImage = PlaceHolderImages.find(p => p.id === 'user-profile');

  return (
    <div
      className={cn(
        "p-2 rounded-lg flex items-center gap-3 bg-sidebar-accent",
        "group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:bg-transparent"
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage
                src={userProfileImage?.imageUrl}
                alt="User avatar"
                data-ai-hint={userProfileImage?.imageHint}
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{t('user.name')}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {t('user.email')}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>{t('user.menu.profile')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>{t('user.menu.settings')}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <Link href="/">{t('user.menu.logout')}</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="duration-200 flex flex-col transition-opacity ease-linear group-data-[collapsible=icon]:opacity-0">
        <span className="font-semibold text-sidebar-foreground">{t('user.name')}</span>
        <span className="text-xs text-sidebar-foreground/70">
          {t('user.role')}
        </span>
      </div>
    </div>
  )
}

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="border-sidebar-border"
        defaultOpen={true}
      >
        <SidebarHeader className="h-14 border-b border-sidebar-border">
          <Link
            href="/dashboard"
            className="duration-200 flex items-center gap-2 text-sidebar-foreground transition-opacity ease-linear group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:opacity-0"
          >
            <Icons.Logo className="size-7 text-primary" />
            <span className="text-lg font-bold font-headline">EcoGuardian</span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="p-2">
          <DashboardNav />
        </SidebarContent>

        <SidebarFooter className="p-2 mt-auto border-t border-sidebar-border">
          <UserMenu />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <Header />
        <main className="min-h-[calc(100vh-3.5rem)] p-4 md:p-8 bg-secondary/50">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </LanguageProvider>
  )
}
