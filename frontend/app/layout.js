'use client'

import "@styles/globals.css";

import { LoadScript } from '@react-google-maps/api';
import { Navbar } from "@components/Navbar";
import UserProvider from "@contexts/UserProvider";

const libraries = ["places"];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background">
        <UserProvider>
          <LoadScript
            googleMapsApiKey="AIzaSyDLObtS4lYXqrA_Y_kF6VGxy-ogZFP5-lU"
            libraries={libraries}
          >
            <main className='app'>
              <Navbar />
              {children}
            </main>
          </LoadScript>
        </UserProvider>
      </body>
    </html>
  )
}
