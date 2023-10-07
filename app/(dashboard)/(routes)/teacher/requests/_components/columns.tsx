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
          status==='pending' && 'bg-sky-400 text-sky-600',
          status==='visited' && 'bg-purple-400 text-purple-600 ',
          status==='approved' && 'bg-green-400 text-green-600 ',
          status==='rejected' && 'bg-red-400 text-red-600 ',
        )}>
          {status==='pending' && 'Pending'}
          {status==='visited' && 'Visited'}
          {status==='approved' && 'Approved'}
          {status==='rejected' && 'Rejected'}

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
