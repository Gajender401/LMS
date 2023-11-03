"use client";

import { BarChart, List, Airplay, Book, HomeIcon, Code2, MessageSquare, Briefcase, Split, Tv, GroupIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: HomeIcon,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Split,
    label: "My Journey",
    href: "/myjourney",
  },
  {
    icon: Tv,
    label: "Live class",
    href: "/live",
  },
  {
    icon: Code2,
    label: "Playground",
    href: "/playground"
  },
  {
    icon: Briefcase,
    label: "Job Portal",
    href: "/jobportal"
  },
  {
    icon: MessageSquare,
    label: "Doubts",
    href: "/doubts"
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: GroupIcon,
    label: "Batch",
    href: "/teacher/batch",
  },
  {
    icon: Tv,
    label: "Live",
    href: "/teacher/live",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: Airplay,
    label: "Requests",
    href: "/teacher/requests",
  },
]

const applicationRoutes = [
  {
    icon: Book,
    label: "Application",
    href: "#",
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  var routes = isTeacherPage ? teacherRoutes : guestRoutes;

  if (pathname?.includes("/apply")) {
    routes = applicationRoutes
  }

  return (
    <div>
      {routes.map((route) => (
        <div 
        key={route.href}
         className="mt-8 mb-8" >
          <SidebarItem
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        </div>
      ))}
    </div>
  )
}