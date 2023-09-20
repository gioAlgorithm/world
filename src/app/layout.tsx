"use client"
import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Belanosima } from 'next/font/google'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {metadata} from "./metaData"
import { useEffect } from 'react'


const inter = Belanosima({ 
  weight:['400','600','700'],
  subsets: ['latin'] 
})



const client = new ApolloClient({
  uri: "https://graphql.country/graphql",
  cache: new InMemoryCache()
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // metadata 
  useEffect(() => {
    if (metadata.title) {
      document.title = String(metadata.title)
    }
  }, []);

  return (
    <html lang="en">
      
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <Navbar />
          {children}
        </ApolloProvider>
      </body>
    </html>
  )
}
