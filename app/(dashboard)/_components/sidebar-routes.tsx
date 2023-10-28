"use client";

import { BarChart, Compass, Layout, List, Airplay, GraduationCap, Building2, Contact2, Book, HomeIcon, Calendar, Settings, Code2, Router, MessageSquare, Briefcase, Split, Tv } from "lucide-react";
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
  {
    icon: Settings,
    label: "Settings",
    href: "/settings"
  }
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
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

  // {
  //   icon: Contact2,
  //   label: "Persnol info",
  //   href: "#persnol-info",
  // },
  // {
  //   icon: GraduationCap,
  //   label: "Education info",
  //   href: "#education-info",
  // },
  // {
  //   icon: Building2,
  //   label: "Occupation details",
  //   href: "#occupation-details",
  // },
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