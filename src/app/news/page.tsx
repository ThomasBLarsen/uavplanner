"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, CheckCircle2, Info, Zap } from "lucide-react"

type Update = {
  id: string
  title: string
  content: string
  date: string
  type: 'system' | 'flight' | 'maintenance' | 'regulatory'
  priority: 'low' | 'medium' | 'high'
}

const updates: Update[] = [
  {
    id: '1',
    title: 'System Maintenance Completed',
    content: 'The scheduled system maintenance has been successfully completed. All services are now fully operational.',
    date: '2023-07-28T09:00:00Z',
    type: 'system',
    priority: 'low',
  },
  {
    id: '2',
    title: 'Flight Plan Approved',
    content: 'Your flight plan for Mission ID: DRN-2023-07-28-001 has been approved. You are cleared for takeoff.',
    date: '2023-07-28T10:15:00Z',
    type: 'flight',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Drone Maintenance Required',
    content: 'Drone ID: DJI-M300-RTK-003 is due for its scheduled maintenance. Please schedule a maintenance check as soon as possible.',
    date: '2023-07-27T14:30:00Z',
    type: 'maintenance',
    priority: 'high',
  },
  {
    id: '4',
    title: 'New Regulatory Update',
    content: 'The FAA has issued new guidelines for night operations. Please review the updated regulations in the app.',
    date: '2023-07-26T11:00:00Z',
    type: 'regulatory',
    priority: 'high',
  },
  {
    id: '5',
    title: 'Weather Alert',
    content: 'Severe weather conditions are expected in your area. All flights are temporarily suspended until further notice.',
    date: '2023-07-28T08:45:00Z',
    type: 'flight',
    priority: 'high',
  },
]

export default function NewsAndUpdatesPage() {
  const [activeTab, setActiveTab] = useState<string>("all")

  const filteredUpdates = activeTab === "all" 
    ? updates 
    : updates.filter(update => update.type === activeTab)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>News and Updates</CardTitle>
        <CardDescription>Stay informed with the latest system notifications, flight updates, maintenance alerts, and regulatory information</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="flight">Flight</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <UpdatesList updates={filteredUpdates} />
          </TabsContent>
          <TabsContent value="system">
            <UpdatesList updates={filteredUpdates} />
          </TabsContent>
          <TabsContent value="flight">
            <UpdatesList updates={filteredUpdates} />
          </TabsContent>
          <TabsContent value="maintenance">
            <UpdatesList updates={filteredUpdates} />
          </TabsContent>
          <TabsContent value="regulatory">
            <UpdatesList updates={filteredUpdates} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function UpdatesList({ updates }: { updates: Update[] }) {
  return (
    <ScrollArea className="h-[600px] w-full pr-4">
      <div className="space-y-4">
        {updates.map((update) => (
          <Card key={update.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <UpdateIcon type={update.type} priority={update.priority} />
              <div className="flex-1">
                <CardTitle className="text-lg">{update.title}</CardTitle>
                <CardDescription>{new Date(update.date).toLocaleString()}</CardDescription>
              </div>
              <Badge variant={getBadgeVariant(update.priority)}>{update.type}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{update.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

function UpdateIcon({ type, priority }: { type: Update['type'], priority: Update['priority'] }) {
  const iconProps = {
    className: `h-6 w-6 ${getPriorityColor(priority)}`,
  }

  switch (type) {
    case 'system':
      return <Zap {...iconProps} />
    case 'flight':
      return <Info {...iconProps} />
    case 'maintenance':
      return <AlertTriangle {...iconProps} />
    case 'regulatory':
      return <Bell {...iconProps} />
    default:
      return <CheckCircle2 {...iconProps} />
  }
}

function getBadgeVariant(priority: Update['priority']): "default" | "secondary" | "destructive" | "outline" {
  switch (priority) {
    case 'low':
      return "default"
    case 'medium':
      return "secondary"
    case 'high':
      return "destructive"
    default:
      return "outline"
  }
}

function getPriorityColor(priority: Update['priority']): string {
  switch (priority) {
    case 'low':
      return "text-green-500"
    case 'medium':
      return "text-yellow-500"
    case 'high':
      return "text-red-500"
    default:
      return "text-gray-500"
  }
}