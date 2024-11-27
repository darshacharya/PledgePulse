import { LanguageProvider } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { Poppins, Cinzel } from 'next/font/google'
import "./globals.css"

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

const cinzel = Cinzel({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
})

export const metadata = {
  title: "Water Department Dashboard",
  description: "Water Department Dashboard Application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${poppins.variable} ${cinzel.variable} font-sans antialiased`}>
        <LanguageProvider>
          <div className="min-h-screen">
            <LanguageSwitcher />
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
