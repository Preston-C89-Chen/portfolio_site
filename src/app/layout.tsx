import type { Metadata } from 'next'
import './globals.css'
import { gilroy, tiroDevanagari } from './lib/font'


export const metadata: Metadata = {
  title: 'Preston Chen | Field Engineering, Integrations & Test',
  description: 'Production robotics operations, API integrations, telemetry diagnostics, and UAS flight testing. Preston Chen builds and validates software for real-world systems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${gilroy.variable} ${tiroDevanagari.variable} ${gilroy.className}`}>{children}</body>
    </html>
  )
}
