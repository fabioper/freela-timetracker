import "./globals.css"
import type { Metadata } from "next"
import React, { PropsWithChildren } from "react"
import Header from "@/app/_shared/components/header"
import AuthProvider from "@/app/_shared/contexts/auth.provider"
import "primereact/resources/themes/soho-dark/theme.css"
import "primeicons/primeicons.css"
import { PrimeReactProvider } from "primereact/api"
import Protected from "@/app/_shared/components/protected"
import { inter } from "@/app/_shared/fonts"
import { TailwindFix } from "@/app/_shared/components/tailwind-fix"

export const metadata: Metadata = {
  title: "Time Tracker",
  description: "Generated by create next app",
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br">
      <body className={inter.variable}>
        <PrimeReactProvider value={{ ripple: false }}>
          <AuthProvider>
            <Header />
            <Protected>{children}</Protected>
          </AuthProvider>
        </PrimeReactProvider>
        <TailwindFix />
      </body>
    </html>
  )
}
