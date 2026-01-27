// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "RMGD - Retro Mobile Game Database",
//   description: "A database and resource for retro mobile gaming",
//   generator: "v0.dev",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   )
// }

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ChatbotWidget from "@/components/chatbot/chatbot-widget";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RMGD - Retro Mobile Game Database",
  description: "A database and resource for retro mobile gaming",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HRCDM0K7MY"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HRCDM0K7MY');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <ChatbotWidget />
      </body>
    </html>
  )
}