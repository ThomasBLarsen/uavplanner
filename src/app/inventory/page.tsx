"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/Datatable"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type InventoryItem = {
  id: string
  name: string
  category: "drone" | "battery" | "accessory"
  quantity: number
  lastInspection: string
  nextInspection: string
  daysUntilInspection: number
}

const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">Quantity</div>,
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("quantity"))
      return <div className="text-right font-medium">{quantity}</div>
    },
  },
  {
    accessorKey: "lastInspection",
    header: "Last Inspection",
  },
  {
    accessorKey: "nextInspection",
    header: "Next Inspection",
  },
  {
    accessorKey: "daysUntilInspection",
    header: "Days Until Inspection",
    cell: ({ row }) => {
      const days = row.getValue("daysUntilInspection") as number
      let color: "green" | "yellow" | "red"
      if (days > 30) {
        color = "green"
      } else if (days > 7) {
        color = "yellow"
      } else {
        color = "red"
      }
      return (
        <div className="flex items-center">
            <Badge variant={color === "green" ? "default" : color === "yellow" ? "outline" : "destructive"}>
                {days} days
            </Badge>
          <div className={`ml-2 h-3 w-3 rounded-full bg-${color}-500`}></div>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.id)}
            >
              Copy item ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Update quantity</DropdownMenuItem>
            <DropdownMenuItem>Schedule inspection</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const data: InventoryItem[] = [
  {
    id: "1",
    name: "DJI Mini 2",
    category: "drone",
    quantity: 5,
    lastInspection: "2023-05-15",
    nextInspection: "2023-08-15",
    daysUntilInspection: 45,
  },
  {
    id: "2",
    name: "DJI Air 2S",
    category: "drone",
    quantity: 3,
    lastInspection: "2023-06-01",
    nextInspection: "2023-07-15",
    daysUntilInspection: 14,
  },
  {
    id: "3",
    name: "DJI Mavic 3",
    category: "drone",
    quantity: 2,
    lastInspection: "2023-06-10",
    nextInspection: "2023-07-01",
    daysUntilInspection: 0,
  },
  {
    id: "4",
    name: "Extra Battery Pack",
    category: "battery",
    quantity: 10,
    lastInspection: "2023-06-05",
    nextInspection: "2023-09-05",
    daysUntilInspection: 66,
  },
  {
    id: "5",
    name: "Propeller Set",
    category: "accessory",
    quantity: 20,
    lastInspection: "2023-05-20",
    nextInspection: "2023-08-20",
    daysUntilInspection: 50,
  },
]

export default function InventoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Drone Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  )
}