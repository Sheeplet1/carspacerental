import "@styles/globals.css";

import { Navbar } from "@components/Navbar";
import { Sidebar } from "@components/Sidebar";

export const metadata = {
  title: 'SFCars',
  description: 'Your perfect spot awaits - Discover and secure parking with ease.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className='app'>
          <Navbar />

          {children}
        </main>
      </body>
    </html>
  )
}
