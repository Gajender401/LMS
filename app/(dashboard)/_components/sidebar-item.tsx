"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.includes("/teacher");

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex flex-row items-center ${isTeacherPage?'text-black rounded-sm px-5 py-2 hover:bg-slate-200':''} text-gray-200 hover:text-white transition duration-200 ease-in-out`}
    >
      <Icon
        size={22}
      />
      <span className="font-medium ml-2 text-lg">{label}</span>
    </button>

  )
}