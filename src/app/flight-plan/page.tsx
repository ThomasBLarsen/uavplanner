"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { FlightPlanner } from "@/components/FlightPlanner"

// Mock data for flight plans
const mockFlightPlans = [
  { id: 1, date: '2023-07-01', time: '10:00', status: 'Completed', pilotName: 'John Doe' },
  { id: 2, date: '2023-07-05', time: '14:30', status: 'Approved', pilotName: 'Jane Smith' },
  { id: 3, date: '2023-07-10', time: '09:00', status: 'Submitted', pilotName: 'Mike Johnson' },
  { id: 4, date: '2023-07-15', time: '11:00', status: 'Rejected', pilotName: 'Sarah Williams' },
  { id: 5, date: '2023-07-20', time: '16:00', status: 'Planning', pilotName: 'Chris Brown' },
]

export default function FlightPlans() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const getStatusColor = (status) => {
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