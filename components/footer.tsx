import Link from "next/link"
import { Facebook, Linkedin, Youtube, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t py-12 px-4 md:px-12 lg:px-16 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold mb-6 block">
              RMGP
            </Link>
            <div className="flex gap-4 mt-4">
              <Link href="/social/facebook" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </Link>
              <Link href="/social/linkedin" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </Link>
              <Link href="/social/youtube" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </Link>
              <Link href="/social/instagram" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Games</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/games" className="text-gray-600 hover:text-gray-900">
                  Play Games
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Collection & Experience</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/collection-and-experience" className="text-gray-600 hover:text-gray-900">
                  Collection
                </Link>
              </li>
              {/* <li>
                <Link href="/experience/3d-scans" className="text-gray-600 hover:text-gray-900">
                  3D Scans
                </Link>
              </li>
              <li>
                <Link href="/experience/emulators" className="text-gray-600 hover:text-gray-900">
                  Emulators
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources & Scholarship</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/education" className="text-gray-600 hover:text-gray-900">
                  Educational Resources
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-600 hover:text-gray-900">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/research/what-is-mobile-game" className="text-gray-600 hover:text-gray-900">
                  What's a Mobile Game?
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About & Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-600 hover:text-gray-900">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Retro Mobile Gaming Project. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
