"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, X, Eye, Search } from 'lucide-react'

type FlightPlan = {
  id: string
  pilotName: string
  date: string
  time: string
  duration: string
  location: string
  purpose: string
  status: 'pending' | 'approved' | 'rejected'
}

const initialFlightPlans: FlightPlan[] = [
  {
    id: 'FP001',
    pilotName: 'John Doe',
    date: '2023-07-30',
    time: '10:00',
    duration: '2 hours',
    location: 'City Park',
    purpose: 'Aerial photography for event',
    status: 'pending',
  },
  {
    id: 'FP002',
    pilotName: 'Jane Smith',
    date: '2023-07-31',
    time: '14:00',
    duration: '1.5 hours',
    location: 'Industrial Zone',
    purpose: 'Infrastructure inspection',
    status: 'pending',
  },
  {
    id: 'FP003',
    pilotName: 'Mike Johnson',
    date: '2023-08-01',
    time: '09:30',
    duration: '3 hours',
    location: 'Coastal Area',
    purpose: 'Environmental survey',
    status: 'approved',
  },
  {
    id: 'FP004',
    pilotName: 'Sarah Williams',
    date: '2023-08-02',
    time: '11:00',
    duration: '1 hour',
    location: 'Downtown',
    purpose: 'Real estate photography',
    status: 'rejected',
  },
]

export default function ReviewFlightPlansPage() {
  const [flightPlans, setFlightPlans] = useState<FlightPlan[]>(initialFlightPlans)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlan, setSelectedPlan] = useState<FlightPlan | null>(null)
  const [feedback, setFeedback] = useState('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredFlightPlans = flightPlans.filter(plan =>
    plan.pilotName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected') => {
    setFlightPlans(plans =>
      plans.map(plan =>
        plan.id === id ? { ...plan, status: newStatus } : plan
      )
    )
    setSelectedPlan(null)
    setFeedback('')
  }

  const getStatusBadge = (status: FlightPlan['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>
      case 'approved':
        return <Badge variant="default">Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Review Flight Plans</CardTitle>
        <CardDescription>Review and approve submitted flight plans</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by pilot or ID"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Pilot</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFlightPlans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.id}</TableCell>
                <TableCell>{plan.pilotName}</TableCell>
                <TableCell>{plan.date}</TableCell>
                <TableCell>{plan.time}</TableCell>
                <TableCell>{plan.duration}</TableCell>
                <TableCell>{plan.location}</TableCell>
                <TableCell>{getStatusBadge(plan.status)}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => setSelectedPlan(plan)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Flight Plan Details</DialogTitle>
                        <DialogDescription>
                          Review the flight plan and provide feedback if necessary.
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-[400px] w-full pr-4">
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="id" className="text-right">
                              ID
                            </Label>
                            <div id="id" className="col-span-3">
                              {selectedPlan?.id}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pilot" className="text-right">
                              Pilot
                            </Label>
                            <div id="pilot" className="col-span-3">
                              {selectedPlan?.pilotName}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                              Date
                            </Label>
                            <div id="date" className="col-span-3">
                              {selectedPlan?.date}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">
                              Time
                            </Label>
                            <div id="time" className="col-span-3">
                              {selectedPlan?.time}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="duration" className="text-right">
                              Duration
                            </Label>
                            <div id="duration" className="col-span-3">
                              {selectedPlan?.duration}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">
                              Location
                            </Label>
                            <div id="location" className="col-span-3">
                              {selectedPlan?.location}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="purpose" className="text-right">
                              Purpose
                            </Label>
                            <div id="purpose" className="col-span-3">
                              {selectedPlan?.purpose}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                              Status
                            </Label>
                            <div id="status" className="col-span-3">
                              {getStatusBadge(selectedPlan?.status || 'pending')}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="feedback" className="text-right">
                              Feedback
                            </Label>
                            <Textarea
                              id="feedback"
                              className="col-span-3"
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              placeholder="Provide feedback (optional)"
                            />
                          </div>
                        </div>
                      </ScrollArea>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => selectedPlan && handleStatusChange(selectedPlan.id, 'rejected')}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                        <Button
                          onClick={() => selectedPlan && handleStatusChange(selectedPlan.id, 'approved')}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                      </DialogFooter>
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