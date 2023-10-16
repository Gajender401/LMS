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
      className={cn("flex items-center")}
    >
      <div
        className={cn(
          "flex items-center py-2.5 px-2.5 hover:bg-slate-200 rounded-full transition-all",
          isActive && "bg-black hover:bg-black"
        )}
      >
        <Icon
          size={33}
          className={cn(
            "text-black",
            isActive && "text-white"
          )}
        />
      </div>
    </button>
  )
}