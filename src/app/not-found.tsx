"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/")
  })

  return <div className="h-screen flex justify-center items-center">Page not found.</div>
}
