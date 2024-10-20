import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppSidebar } from '@/components/AppSidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaaS Admin Dashboard',
  description: 'Admin dashboard for your SaaS application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <AppSidebar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}