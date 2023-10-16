import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto bg-[#f3f6fd]">
      <div className="flex flex-col mt-28 w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}