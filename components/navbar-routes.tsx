'use client'
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { BellDotIcon, BellIcon, LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";


export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/chapter");

  return (
    <nav className="hidden w-full lg:block pt-5 pb-5 shadow-lg">
    <div className="nav-bar md:mr-10 md:ml-10 flex flex-row justify-between">
      <div className="logo-sect">
        <a href="">
          <img src="/logo.svg" alt="" />
        </a>
      </div>
      <div className="nav-links flex flex-row">
        <a href="" className="mr-8">
          <img src="/notification.png" alt="" width="30px" />
        </a>
        <a href="" className="mr-8">
          <img src="/discord.png" alt="" width="30px" />
        </a>
        {isTeacherPage || isCoursePage ? (
            <Link href="/">
              <Button size="sm" variant="ghost">
                <LogOut className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </Link>
          ) : isTeacher(userId) ? (
            <Link href="/teacher/courses">
              <Button size="sm" variant="ghost">
                Teacher mode
              </Button>
            </Link>
          ) : (
            // Add a default condition if neither isTeacherPage nor isCoursePage is true
            <Link href="/">
              <Button size="sm" variant="ghost">
                <LogOut className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </Link>
          )}
          <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  </nav>


  );
};
