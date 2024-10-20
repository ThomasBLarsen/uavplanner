"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { FlightPlanner } from "@/components/FlightPlanner"
import { FlightPlan } from '@/types';

// Mock data for flight plans

export default function FlightPlans() {
  const [isAdmin] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<FlightPlan | null>(null)

 
  const mockFlightPlans: FlightPlan[] = [
    {
      id: '1',
      date: '2023-07-01',
      time: '10:00',
      status: 'Completed',
      pilotName: 'John Doe',
      incidentOccurred: false,
      incidentReport: '',
      adminFeedback: '',
      isPopulatedArea: false,
      hasNonRGBSensors: false,
      isOverProperty: false,
      actualTime: '',
      actualDuration: '',
      duration: '1h',
      operationType: 'Survey',
      droneType: 'Quadcopter',
      operationDescription: 'Routine survey',
      mapMode: 'route',
      mapData: [],
      constraints: [],
      preFlightChecklist: [],
      postFlightChecklist: [],
    },
    // ... other flight plans
  ];
  



  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Completed': return 'bg-green-500'
      case 'Approved': return 'bg-blue-500'
      case 'Submitted': return 'bg-yellow-500'
      case 'Rejected': return 'bg-red-500'
      case 'Planning': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Flight Plans</CardTitle>
        <div className="space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>New Flight Plan</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <FlightPlanner isAdmin={isAdmin} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pilot</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockFlightPlans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.date}</TableCell>
                <TableCell>{plan.time}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(plan.status)}>{plan.status}</Badge>
                </TableCell>
                <TableCell>{plan.pilotName}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setSelectedPlan(plan)}>View</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <FlightPlanner isAdmin={isAdmin} initialPlan={selectedPlan} />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}