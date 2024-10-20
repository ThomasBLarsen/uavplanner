"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, PlaneTakeoff, Package, Newspaper, ClipboardList, Users, BarChart, ChevronDown, User2, Settings, Command } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const regularNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Flight Plan", icon: PlaneTakeoff, url: "/flight-plan" },
  { title: "Inventory", icon: Package, url: "/inventory" },
  { title: "News and Updates", icon: Newspaper, url: "/news" },
]

const adminNavItems = [
  { title: "Review Flight Plans", icon: ClipboardList, url: "/admin/review-flight-plans" },
  { title: "Pilot Management", icon: Users, url: "/admin/pilots" },
  { title: "Reports", icon: BarChart, url: "/admin/reports" },
]

const teams = [
  { name: "Acme Inc", logo: Command, plan: "Pro Plan" },
  { name: "Acme Corp", logo: Command, plan: "Free Plan" },
]

export function AppSidebar() {
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  const [isAdmin, setIsAdmin] = React.useState(false)
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border bg-gray-100">
                    <activeTeam.logo className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-medium leading-none">{activeTeam.name}</span>
                    <span className="text-xs leading-none text-muted-foreground">{activeTeam.plan}</span>
                  </div>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>Switch Team</DropdownMenuLabel>
              {teams.map((team) => (
                <DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)}>
                  <team.logo className="mr-2 h-4 w-4" />
                  <span>{team.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {regularNavItems.map((item) => (
              <Link key={item.title} href={item.url}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${pathname === item.url ? 'bg-gray-100' : ''}`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
          {isAdmin && (
            <>
              <div className="my-4 border-t" />
              <div className="space-y-1">
                {adminNavItems.map((item) => (
                  <Link key={item.title} href={item.url}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${pathname === item.url ? 'bg-gray-100' : ''}`}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Button>
                  </Link>
                ))}
              </div>
            </>
          )}
        </nav>
        <div className="border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">shadcn</span>
                  <span className="text-xs text-muted-foreground">m@example.com</span>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User2 className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsAdmin(!isAdmin)}>
                <span>{isAdmin ? "Disable Admin Mode" : "Enable Admin Mode"}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  )
}