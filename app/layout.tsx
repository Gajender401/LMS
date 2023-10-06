import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
import { UserContextProvider } from "@/hooks/context";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LMS',
  description: 'It is Ed-tech platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserContextProvider >
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <ConfettiProvider />
            <ToastProvider />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </UserContextProvider>
  )
}
