"use client"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import 'node_modules/highlight.js/styles/vs2015.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { useEffect } from 'react'
import { Manrope } from "next/font/google";
import '../globals.css'
import hljs from 'highlight.js'

const roboto = Manrope({ weight: "400", subsets: ["latin"] });

export default function RootLayout({children, }: { children: React.ReactNode }) {
  useEffect(() => {
    require('jquery/dist/jquery.min.js')
    require('@popperjs/core/dist/umd/popper.min.js')
    require('bootstrap/dist/js/bootstrap.min.js')
    hljs.highlightAll()
  })
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}