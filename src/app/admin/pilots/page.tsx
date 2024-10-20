"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Edit, Trash2, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

type Certification = 'A1/A3' | 'A2' | 'Specific'

type Pilot = {
  id: string
  name: string
  email: string
  phone: string
  certifications: {
    type: Certification
    expirationDate: string
  }[]
}

const initialPilots: Pilot[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    certifications: [
      { type: 'A1/A3', expirationDate: '2023-12-31' },
      { type: 'A2', expirationDate: '2024-06-30' },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    certifications: [
      { type: 'A1/A3', expirationDate: '2023-09-15' },
      { type: 'Specific', expirationDate: '2025-03-31' },
    ],
  },
]

export default function PilotAdminPage() {
  const [pilots, setPilots] = useState<Pilot[]>(initialPilots)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newPilot, setNewPilot] = useState<Pilot>({
    id: '',
    name: '',
    email: '',
    phone: '',
    certifications: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPilot({ ...newPilot, [e.target.name]: e.target.value })
  }

  const handleCertificationChange = (type: Certification, checked: boolean) => {
    if (checked) {
      setNewPilot({
        ...newPilot,
        certifications: [
          ...newPilot.certifications,
          { type, expirationDate: new Date().toISOString().split('T')[0] },
        ],
      })
    } else {
      setNewPilot({
        ...newPilot,
        certifications: newPilot.certifications.filter(cert => cert.type !== type),
      })
    }
  }

  const handleAddPilot = () => {
    setPilots([...pilots, { ...newPilot, id: Date.now().toString() }])
    setNewPilot({
      id: '',
      name: '',
      email: '',
      phone: '',
      certifications: [],
    })
    setIsAddDialogOpen(false)
  }

  const handleDeletePilot = (id: string) => {
    setPilots(pilots.filter(pilot => pilot.id !== id))
  }

  const getCertificationStatus = (expirationDate: string) => {
    const today = new Date()
    const expDate = new Date(expirationDate)
    const daysUntilExpiration = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 3600 * 24))

    if (daysUntilExpiration <= 0) {
      return { status: 'expired', color: 'destructive' as const }
    } else if (daysUntilExpiration <= 30) {
      return { status: 'expiring soon', color: 'warning' as const }
    } else {
      return { status: 'valid', color: 'success' as const }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pilot Management</CardTitle>
        <CardDescription>Manage pilot information and certifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Pilot
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Pilot</DialogTitle>
                <DialogDescription>
                  Enter the details of the new pilot. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newPilot.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newPilot.email}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={newPilot.phone}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Certifications</Label>
                  <div className="col-span-3 space-y-2">
                    {(['A1/A3', 'A2', 'Specific'] as Certification[]).map((cert) => (
                      <div key={cert} className="flex items-center space-x-2">
                        <Checkbox
                          id={cert}
                          checked={newPilot.certifications.some(c => c.type === cert)}
                          onCheckedChange={(checked) => handleCertificationChange(cert, checked as boolean)}
                        />
                        <Label htmlFor={cert}>{cert}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddPilot}>Save Pilot</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Certifications</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pilots.map((pilot) => (
              <TableRow key={pilot.id}>
                <TableCell>{pilot.name}</TableCell>
                <TableCell>{pilot.email}</TableCell>
                <TableCell>{pilot.phone}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {pilot.certifications.map((cert) => {
                      const { status, color } = getCertificationStatus(cert.expirationDate)
                      return (
                        <Badge key={cert.type} variant={color}>
                          {cert.type}
                          {status !== 'valid' && (
                            <>
                              {' '}
                              <AlertCircle className="h-3 w-3 inline ml-1" />
                              {' '}
                              {status}
                            </>
                          )}
                        </Badge>
                      )
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDeletePilot(pilot.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}