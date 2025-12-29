"use client";
import { Inter } from 'next/font/google'
import './globals.css'
import { gilroy, tiroDevanagari } from './lib/font'


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
