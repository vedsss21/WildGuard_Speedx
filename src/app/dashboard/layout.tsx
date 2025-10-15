
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Award,
  BarChart3,
  Beaker,
  Handshake,
  LayoutDashboard,
  Map,
  ShieldAlert,
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

import { Icons } from "@/components/icons";
import Header from "@/components/dashboard/header";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LanguageProvider, useTranslation } from "@/contexts/language-context";
import { SearchProvider } from "@/contexts/search-context";
import { FirebaseClientProvider } from "@/firebase";

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


function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const dashboardBg = PlaceHolderImages.find(p => p.id === 'dashboard-background');

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
            <span className="text-lg font-bold font-headline">WildGuard</span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="p-2">
          <DashboardNav />
        </SidebarContent>

        <SidebarFooter className="p-2 mt-auto border-t border-sidebar-border">
          {/* UserMenu was here */}
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <Header />
        <main 
          className="dashboard-main min-h-[calc(100vh-3.5rem)] p-4 md:p-8"
          style={{ '--dashboard-bg-image': `url(${dashboardBg?.imageUrl})` } as React.CSSProperties}
        >
          {children}
        </main>
        <footer className="flex items-center justify-center p-6 bg-background relative z-10">
            <p className="text-sm text-muted-foreground">© 2025 WildGuard. All rights reserved.</p>
        </footer>
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
        <SearchProvider>
          <FirebaseClientProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
          </FirebaseClientProvider>
        </SearchProvider>
    </LanguageProvider>
  )
}
