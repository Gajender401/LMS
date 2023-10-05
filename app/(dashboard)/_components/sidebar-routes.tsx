"use client";

import { BarChart, Compass, Layout, List, Airplay, GraduationCap, Building2, Contact2, Book } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
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
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}