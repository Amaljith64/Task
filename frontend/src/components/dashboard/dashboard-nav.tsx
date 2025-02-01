"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart, BookOpen, FolderOpen } from "lucide-react";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart },
  { name: "Categories", href: "/dashboard/categories", icon: FolderOpen },
  { name: "Resources", href: "/dashboard/resources", icon: BookOpen },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 min-h-screen border-r bg-card">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === link.href
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}