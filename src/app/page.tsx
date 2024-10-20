"use client"

import { useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { AlertCircle, Award, CheckCircle, PlaneTakeoff, Settings, Star, Trophy, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

// Mock data for the chart
const flightData = [
  { name: "Mon", flights: 4 },
  { name: "Tue", flights: 7 },
  { name: "Wed", flights: 5 },
  { name: "Thu", flights: 6 },
  { name: "Fri", flights: 8 },
  { name: "Sat", flights: 10 },
  { name: "Sun", flights: 9 },
]

export default function Dashboard() {
  const [userRole] = useState('pilot')

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-8">
        <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

        {/* Summary statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Flights</CardTitle>
              <PlaneTakeoff className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          {userRole === 'manager' ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Drones</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">3 in maintenance</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Certified Pilots</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">16</div>
                  <p className="text-xs text-muted-foreground">2 certifications expiring soon</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Flight Score</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92/100</div>
                  <p className="text-xs text-muted-foreground">Last flight: 98/100</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Achievement</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-md font-bold">Night Flight Expert</div>
                  <Progress value={75} className="mt-2" />
                  <p className="text-xs text-muted-foreground">3 more night flights needed</p>
                </CardContent>
              </Card>
            </>
          )}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">+2% from last quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Flight activity chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{userRole === 'manager' ? 'Weekly Flight Activity' : 'Your Flight Activity'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={flightData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="flights" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick access and recent activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
              <CardDescription>Frequently used actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Button>Plan New Flight</Button>
                {userRole === 'manager' ? (
                  <>
                    <Button>Add New Drone</Button>
                    <Button>Schedule Maintenance</Button>
                    <Button>View Compliance Report</Button>
                  </>
                ) : (
                  <>
                    <Button>View Flight History</Button>
                    <Button>Check Weather Conditions</Button>
                    <Button>Review Safety Guidelines</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          {userRole === 'manager' ? (
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <div className="mr-2 rounded-full bg-blue-500 p-1">
                        <PlaneTakeoff className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Flight completed: Mission #1234</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 rounded-full bg-yellow-500 p-1">
                        <AlertCircle className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New regulation update: Check compliance</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 rounded-full bg-green-500 p-1">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Drone DJI-001 maintenance completed</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 rounded-full bg-purple-500 p-1">
                        <Users className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New pilot certification: John Doe</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </li>
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Recent milestones and badges</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <div className="mr-2 rounded-full bg-yellow-500 p-1">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Precision Landing Master</p>
                        <p className="text-xs text-gray-500">Achieved 3 days ago</p>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 rounded-full bg-blue-500 p-1">
                        <Trophy className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">50 Flights Milestone</p>
                        <p className="text-xs text-gray-500">Achieved 1 week ago</p>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 rounded-full bg-green-500 p-1">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Perfect Safety Record - 30 Days</p>
                        <p className="text-xs text-gray-500">Ongoing streak</p>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 rounded-full bg-purple-500 p-1">
                        <Star className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Top Performer - Q2 2023</p>
                        <p className="text-xs text-gray-500">Awarded last month</p>
                      </div>
                    </li>
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}