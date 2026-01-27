"use client"
import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "react-feather"

import { useActivePath } from "@/hooks/use-active-link"

interface MenuItem {
  title: string
  path: string
  submenu: MenuItem[]
}

export function Header() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const isActive = useActivePath()

  const handleMenuHover = (menuTitle: string) => {
    setHoveredMenu(menuTitle)
  }

  const handleMenuLeave = () => {
    setHoveredMenu(null)
  }

  // Define dropdown menu structure
  const menuItems = [
    // {
    //   title: "Games",
    //   path: "/games",
    //   submenu: [],
    // },
    {
      title: "Research",
      path: "/research",
      submenu: [{ title: "What's a Mobile Game?", path: "/research/what-is-mobile-game" }],
    },
    {
      title: "Archive",
      path: "/collection-and-experience",
      submenu: [
        { title: "Collection", path: "/collection-and-experience" },
        // { title: "3D Scans", path: "/collection-and-experience/3d-scans" },
        // { title: "Emulators", path: "/collection-and-experience/emulators" },
        { title: "Play Games", path: "/games" },
      ],
    },
    {
      title: "Education",
      path: "/education",
      submenu: [],
    },
    {
      title: "News",
      path: "/news",
      submenu: [],
    },
    {
      title: "About",
      path: "/about",
      submenu: [],
    },
    {
      title: "Contact",
      path: "/contact",
      submenu: [],
    },
  ]

  return (
    <header className="bg-black text-white py-4 px-4 md:px-12 lg:px-16 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-red-500 mb-4 md:mb-0">
          RMGP
        </Link>
        <nav>
          <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
            {menuItems.map((menuItem) => (
              <li
                key={menuItem.title}
                className="relative"
                onMouseEnter={() => handleMenuHover(menuItem.title)}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  href={menuItem.path}
                  className={`hover:text-red-500 transition-colors flex items-center gap-1 py-2 px-1 ${
                    isActive(menuItem.path) ? "text-red-500 font-semibold" : ""
                  }`}
                >
                  {menuItem.title}
                  {menuItem.submenu.length > 0 && <ChevronDown className="h-4 w-4" />}
                </Link>

                {/* Dropdown menu */}
                {menuItem.submenu.length > 0 && hoveredMenu === menuItem.title && (
                  <div className="absolute z-50 left-0 mt-0 w-52 rounded-md shadow-lg bg-black/90 ring-1 ring-gray-700 py-1">
                    {menuItem.submenu.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.path}
                        className={`block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-red-500 ${
                          isActive(subItem.path) ? "text-red-500 font-semibold" : ""
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
