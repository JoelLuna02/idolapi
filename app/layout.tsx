"use client"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import './globals.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function RootLayout({children, }: { children: React.ReactNode }) {
  useEffect(() => {
    require('jquery/dist/jquery.min.js')
    require('@popperjs/core/dist/umd/popper.min.js')
    require('bootstrap/dist/js/bootstrap.min.js')
  })
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
