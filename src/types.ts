// src/types.ts

export interface FlightPlan {
    id: string | null;
    date: string;
    time: string;
    duration: string;
    status: string;
    pilotName?: string;
    incidentOccurred: boolean;
    incidentReport: string;
    adminFeedback: string;
    isPopulatedArea: boolean;
    hasNonRGBSensors: boolean;
    isOverProperty: boolean;
    actualTime: string;
    actualDuration: string;
    operationType: string;
    droneType: string;
    operationDescription: string;
    mapMode: string;
    mapData: Array<{ lat: number; lng: number }>;
    constraints: string[];
    preFlightChecklist: string[];
    postFlightChecklist: string[];
  }
  