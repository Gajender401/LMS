"use client"

import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Eye } from "lucide-react"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "name",
    header: () => {
      return (
        <Button
          variant="ghost"
        >
          Aplicant's name
        </Button>
      )
    },
  },
  {
    accessorKey: "course",
    header: () => {
      return (
        <Button
          variant="ghost"
        >
          Course
        </Button>
      )
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") || false;

      return (
        <Badge className={cn(
          status=='Pending' && 'bg-sky-200 text-sky-600 hover:bg-sky-200',
          status=='Visited' && 'bg-purple-200 text-purple-600 hover:bg-purple-200 ',
          status=='Approved' && 'bg-green-200 text-green-600 hover:bg-green-200',
          status=='Rejected' && 'bg-red-200 text-red-600 hover:bg-red-200',
        )}>
          {row.getValue("status")}
        </Badge>
      )
    }
  },
  {
    id: "view",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/teacher/requests/${id}`}>
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }

]
