"use client"

import { usePathname } from "next/navigation"

export function useActivePath(): (path: string) => boolean {
  const pathname = usePathname()

  const isActive = (path: string): boolean => {
    // Exact match
    if (path === pathname) return true

    // Check if it's a parent path (for dropdown items)
    if (path !== "/" && pathname.startsWith(path)) return true

    return false
  }

  return isActive
}
