import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Nextus 3D - Rotterdam Portfolio Experience',
  description: 'Interactive 3D portfolio showcasing Rotterdam\'s iconic Erasmus Bridge with React Three Fiber and Next.js 14',
  keywords: 'Rotterdam, 3D, React Three Fiber, Next.js, Portfolio, Erasmus Bridge, Netherlands',
  authors: [{ name: 'Nextus 3D' }],
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Nextus 3D - Rotterdam Portfolio Experience',
    description: 'Interactive 3D portfolio showcasing Rotterdam\'s iconic Erasmus Bridge',
    url: 'http://localhost:3000',
    siteName: 'Nextus 3D',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#003082',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
} 