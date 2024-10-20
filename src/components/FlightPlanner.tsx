"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Route } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

const steps = [
  "Flight Details",
  "Area Planning",
  "Pre-Flight Checks",
  "Review & Submit",
]

const flightStages = [
  "Planning",
  "Submitted",
  "Reviewed",
  "Pre-Flight",
  "Completed",
]

const operationTypes = ['A1', 'A2', 'A3', 'Specific']

const drones = [
  { name: 'DJI Mini 2', category: 'A1', weight: 249 },
  { name: 'DJI Air 2S', category: 'A2', weight: 595 },
  { name: 'DJI Mavic 3', category: 'A2', weight: 895 },
  { name: 'DJI Inspire 2', category: 'A3', weight: 4250 },
  { name: 'DJI Matrice 300 RTK', category: 'Specific', weight: 9000 },
]

interface FlightPlan {
  id: string | null;
  date: string;
  time: string;
  duration: string;
  operationType: string;
  droneType: string;
  operationDescription: string;
  mapMode: string;
  mapData: Array<{ lat: number; lng: number }>;
  constraints: string[];
  preFlightChecklist: string[];
  postFlightChecklist: string[];
  incidentOccurred: boolean;
  incidentReport: string;
  adminFeedback: string;
  isPopulatedArea: boolean;
  hasNonRGBSensors: boolean;
  isOverProperty: boolean;
  actualTime: string;
  actualDuration: string;
  status: string;
}

export function FlightPlanner({ isAdmin = false, initialPlan = null }: { isAdmin?: boolean; initialPlan?: FlightPlan | null }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [flightStage, setFlightStage] = useState(initialPlan ? initialPlan.status : "Planning")
  const [flightPlan, setFlightPlan] = useState<FlightPlan>({
    id: initialPlan ? initialPlan.id : null,
    date: initialPlan ? initialPlan.date : '',
    time: initialPlan ? initialPlan.time : '',
    duration: '',
    operationType: '',
    droneType: '',
    operationDescription: '',
    mapMode: 'route',
    mapData: [],
    constraints: [],
    preFlightChecklist: [],
    postFlightChecklist: [],
    incidentOccurred: false,
    incidentReport: '',
    adminFeedback: '',
    isPopulatedArea: false,
    hasNonRGBSensors: false,
    isOverProperty: false,
    actualTime: '',
    actualDuration: '',
    status: initialPlan ? initialPlan.status : "Planning",
  })

  useEffect(() => {
    if (initialPlan) {
      setFlightPlan(prevPlan => ({ ...prevPlan, ...initialPlan }))
    }
  }, [initialPlan])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFlightPlan({ ...flightPlan, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFlightPlan({ ...flightPlan, [name]: value })
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFlightPlan({ ...flightPlan, [name]: checked })
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setFlightStage("Submitted")
    }
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleApproval = (approved: boolean) => {
    setFlightStage(approved ? "Reviewed" : "Reviewed")
  }

  const handleResubmit = () => {
    setFlightStage("Submitted")
  }

interface Drone {
    name: string;
    category: string;
    weight: number;
}

const isDroneCompatible = (drone: Drone | undefined): boolean => {
    if (!drone) return false;
    if (!flightPlan.operationType) return true;
    if (flightPlan.operationType === 'Specific') return drone.category === 'Specific';
    return drone.category <= flightPlan.operationType;
};

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={flightPlan.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={flightPlan.time}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (hours)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="0.5"
                step="0.5"
                value={flightPlan.duration}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operationType">Operation Type</Label>
              <Select
                value={flightPlan.operationType}
                onValueChange={(value) => handleSelectChange('operationType', value)}
              >
                <SelectTrigger id="operationType">
                  <SelectValue placeholder="Select operation type" />
                </SelectTrigger>
                <SelectContent>
                  {operationTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="droneType">Drone Type</Label>
              <Select
                value={flightPlan.droneType}
                onValueChange={(value) => handleSelectChange('droneType', value)}
              >
                <SelectTrigger id="droneType">
                  <SelectValue placeholder="Select drone type" />
                </SelectTrigger>
                <SelectContent>
                  {drones.map((drone) => (
                    <SelectItem 
                      key={drone.name} 
                      value={drone.name}
                      disabled={!isDroneCompatible(drone)}
                    >
                      {drone.name} ({drone.weight}g)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {flightPlan.droneType && !isDroneCompatible(drones.find(d => d.name === flightPlan.droneType)) && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Incompatible Drone</AlertTitle>
                <AlertDescription>
                  The selected drone is not compatible with the chosen operation type.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="operationDescription">Operation Description</Label>
              <Textarea
                id="operationDescription"
                name="operationDescription"
                placeholder="Describe the operation and its purpose"
                value={flightPlan.operationDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Map Mode</Label>
              <RadioGroup
                value={flightPlan.mapMode}
                onValueChange={(value) => handleSelectChange('mapMode', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="route" id="route" />
                  <Label htmlFor="route">Route (Polyline)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="area" id="area" />
                  <Label htmlFor="area">Area (Polygon)</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="h-96 bg-gray-200 flex flex-col items-center justify-center relative">
              <p className="text-gray-500">Map Placeholder</p>
              {flightPlan.mapMode === 'route' ? (
                <Route className="h-12 w-12 text-primary absolute" />
              ) : (
                <div className="h-24 w-24 border-2 border-primary absolute" />
              )}
              <Button 
                className="mt-4"
                onClick={() => {
                  // Simulating drawing on the map
                  setFlightPlan(prev => ({
                    ...prev,
                    mapData: [...prev.mapData, { lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180 }]
                  }))
                }}
              >
                Add Point
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Area Advice</h3>
              <p className="text-sm text-gray-600">
                Based on the selected area, consider the following:
                - Avoid flying near airports or restricted zones
                - Check for temporary flight restrictions
                - Be aware of local privacy laws and regulations
              </p>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pre-Flight Checks</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isPopulatedArea"
                  checked={flightPlan.isPopulatedArea}
                  onCheckedChange={(checked) => handleCheckboxChange('isPopulatedArea', checked as boolean)}
                />
                <Label htmlFor="isPopulatedArea">Flying over a populated area</Label>
              </div>
              {flightPlan.isPopulatedArea && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Caution</AlertTitle>
                  <AlertDescription>
                    Flying over populated areas may require additional precautions and permissions.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hasNonRGBSensors"
                  checked={flightPlan.hasNonRGBSensors}
                  onCheckedChange={(checked) => handleCheckboxChange('hasNonRGBSensors', checked as boolean)}
                />
                <Label htmlFor="hasNonRGBSensors">Using sensors other than RGB camera</Label>
              </div>
              {flightPlan.hasNonRGBSensors && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Note</AlertTitle>
                  <AlertDescription>
                    Ensure compliance with regulations regarding the use of non-RGB sensors.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isOverProperty"
                  checked={flightPlan.isOverProperty}
                  onCheckedChange={(checked) => handleCheckboxChange('isOverProperty', checked as boolean)}
                />
                <Label htmlFor="isOverProperty">Flying over private property</Label>
              </div>
              {flightPlan.isOverProperty && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    Ensure you have necessary permissions to fly over private property.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Flight Plan Summary</h3>
              <p>Date: {flightPlan.date}</p>
              <p>Time: {flightPlan.time}</p>
              <p>Duration: {flightPlan.duration} hours</p>
              <p>Operation Type: {flightPlan.operationType}</p>
              <p>Drone Type: {flightPlan.droneType}</p>
              <p>Operation Description: {flightPlan.operationDescription}</p>
              <p>Constraints: {flightPlan.constraints.join(', ')}</p>
              <p>Map Mode: {flightPlan.mapMode}</p>
              <p>Map Data Points: {flightPlan.mapData.length}</p>
              <p>Flying over populated area: {flightPlan.isPopulatedArea ? 'Yes' : 'No'}</p>
              <p>Using non-RGB sensors: {flightPlan.hasNonRGBSensors ? 'Yes' : 'No'}</p>
              <p>Flying over private property: {flightPlan.isOverProperty ? 'Yes' : 'No'}</p>
            </div>
            
            {isAdmin && (flightStage === "Submitted" || flightStage === "Reviewed") && (
              <div className="space-y-2">
                <Label htmlFor="adminFeedback">Admin Feedback</Label>
                <Textarea
                  id="adminFeedback"
                  name="adminFeedback"
                  placeholder="Provide feedback for the pilot"
                  value={flightPlan.adminFeedback}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  const renderFlightStageContent = () => {
    switch (flightStage) {
      case "Planning":
        return (
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`text-sm ${
                  index === currentStep ? 'font-bold  text-primary' : 'text-gray-500'
                }`}
              >
                {step}
              </div>
            ))}
            {renderStepContent()}
          </div>
        )
      case "Submitted":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Flight Plan Submitted</h3>
            <p>Your flight plan has been submitted for approval. Please wait for admin review.</p>
            {renderStepContent()}
          </div>
        )
      case "Reviewed":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Flight Plan Reviewed</h3>
            <p>Your flight plan has been reviewed. {flightPlan.adminFeedback ? 'Please check the admin feedback.' : 'You may proceed with the pre-flight checklist.'}</p>
            {flightPlan.adminFeedback && (
              <div>
                <h4 className="font-semibold">Admin Feedback:</h4>
                <p>{flightPlan.adminFeedback}</p>
              </div>
            )}
            {renderStepContent()}
          </div>
        )
      case "Pre-Flight":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pre-Flight Checklist</h3>
            <div className="space-y-2">
              {['Drone inspection', 'Battery check', 'Weather conditions', 'Area clearance', 'Communication check'].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox 
                    id={item}
                    checked={flightPlan.preFlightChecklist.includes(item)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFlightPlan(prev => ({ ...prev, preFlightChecklist: [...prev.preFlightChecklist, item] }))
                      } else {
                        setFlightPlan(prev => ({ ...prev, preFlightChecklist: prev.preFlightChecklist.filter(i => i !== item) }))
                      }
                    }}
                  />
                  <Label htmlFor={item}>{item}</Label>
                </div>
              ))}
            </div>
          </div>
        )
      case "Completed":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Post-Flight Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="actualTime">Actual Start Time</Label>
                <Input
                  id="actualTime"
                  name="actualTime"
                  type="time"
                  value={flightPlan.actualTime || flightPlan.time}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actualDuration">Actual Duration (hours)</Label>
                <Input
                  id="actualDuration"
                  name="actualDuration"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={flightPlan.actualDuration || flightPlan.duration}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              {['Drone landed safely', 'No damage to equipment', 'Flight data recorded', 'Battery level checked', 'Area cleared', 'Incident occurred'].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox 
                    id={item}
                    checked={item === 'Incident occurred' ? flightPlan.incidentOccurred : flightPlan.postFlightChecklist.includes(item)}
                    onCheckedChange={(checked) => {
                      if (item === 'Incident occurred') {
                        setFlightPlan(prev => ({ ...prev, incidentOccurred: checked as boolean }))
                      } else if (checked) {
                        setFlightPlan(prev => ({ ...prev, postFlightChecklist: [...prev.postFlightChecklist, item] }))
                      } else {
                        setFlightPlan(prev => ({ ...prev, postFlightChecklist: prev.postFlightChecklist.filter(i => i !== item) }))
                      }
                    }}
                  />
                  <Label htmlFor={item}>{item}</Label>
                </div>
              ))}
            </div>
            {flightPlan.incidentOccurred && (
              <div className="space-y-2">
                <Label htmlFor="incidentReport">Incident Report</Label>
                <Textarea
                  id="incidentReport"
                  name="incidentReport"
                  placeholder="Provide details of the incident"
                  value={flightPlan.incidentReport}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Flight Planner</CardTitle>
        <CardDescription>Plan and manage your drone flights</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            {flightStages.map((stage, index) => (
              <div
                key={stage}
                className={`flex flex-col items-center ${
                  flightStages.indexOf(flightStage) >= index ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <div className={`w-6 h-6 rounded-full ${
                  flightStages.indexOf(flightStage) >= index ? 'bg-primary' : 'bg-gray-300'
                } flex items-center justify-center text-xs font-bold`}>
                  {index + 1}
                </div>
                <span className="text-xs mt-1">{stage}</span>
              </div>
            ))}
          </div>
          <Progress value={(flightStages.indexOf(flightStage) + 1) / flightStages.length * 100} className="w-full" />
        </div>
        {renderFlightStageContent()}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between">
        {flightStage === "Planning" && (
          <>
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="mb-2 sm:mb-0"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextStep}
            >
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </>
        )}
        {flightStage === "Submitted" && isAdmin && (
          <>
            <Button onClick={() => handleApproval(false)} variant="destructive" className="mb-2 sm:mb-0">
              Request Changes
            </Button>
            <Button onClick={() => handleApproval(true)}>
              Approve
            </Button>
          </>
        )}
        {flightStage === "Reviewed" && flightPlan.adminFeedback && !isAdmin && (
          <Button onClick={handleResubmit}>
            Resubmit
          </Button>
        )}
        {flightStage !== "Planning" && (
          <Button
            onClick={() => {
              const currentIndex = flightStages.indexOf(flightStage)
              if (currentIndex < flightStages.length - 1) {
                setFlightStage(flightStages[currentIndex + 1])
              }
            }}
            disabled={flightStage === "Completed"}
          >
            {flightStage === "Completed" ? "Flight Completed" : "Next Stage"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}