'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function ThemeSetter(){
  const pathname = usePathname()
  useEffect(()=>{
    const root = document.documentElement
    if (!pathname){
      root.setAttribute('data-theme', 'pixel-verse')
      return
    }
    if (pathname.startsWith('/admin')) root.setAttribute('data-theme', 'nova-works')
    else if (pathname.startsWith('/stores')) root.setAttribute('data-theme', 'nova-haven')
    else if (pathname.startsWith('/login')){
      const isMobile = window.matchMedia('(max-width: 767px)').matches
      root.setAttribute('data-theme', isMobile ? 'curry-landing' : 'pixel-verse')
    } else {
      root.setAttribute('data-theme', 'pixel-verse')
    }
  }, [pathname])
  return null
}

