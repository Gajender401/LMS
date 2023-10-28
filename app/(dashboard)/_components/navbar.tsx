import { NavbarRoutes } from "@/components/navbar-routes"

import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
  return (
    <div>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}