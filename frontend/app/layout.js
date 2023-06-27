import "@styles/globals.css";

import { Navbar } from "@components/Navbar";
import UserProvider from "@contexts/UserProvider";

export const metadata = {
  title: 'SFCars',
  description: 'Your perfect spot awaits - Discover and secure parking with ease.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background" style={{ overflowY: "hidden" }}>
        <UserProvider>
          <main className='app'>
            <Navbar />
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  )
}
