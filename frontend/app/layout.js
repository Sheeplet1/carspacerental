import "@styles/globals.css";

import { Navbar } from "@components/Navbar";

export const metadata = {
  title: 'SFCars',
  description: 'Your perfect spot awaits - Discover and secure parking with ease.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background">
        <main className='app'>
          <Navbar />

          {children}
        </main>
      </body>
    </html>
  )
}
