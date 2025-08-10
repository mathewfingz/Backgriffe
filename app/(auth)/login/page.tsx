"use client"
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage(){
  const [error, setError] = useState<string|undefined>()
  const router = useRouter()
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Pixel-verse desktop background (md+) */}
      <div aria-hidden className="hidden md:block absolute inset-0 -z-10" style={{
        background:
          'radial-gradient(1200px 600px at 10% -10%, rgba(0,229,255,0.25), transparent 60%),'+
          'radial-gradient(900px 500px at 90% 10%, rgba(124,212,253,0.20), transparent 60%),'+
          'radial-gradient(700px 500px at 50% 100%, rgba(155,255,183,0.15), transparent 60%)'
      }} />

      {/* Curry-landing mobile background (<md) */}
      <div aria-hidden className="md:hidden absolute inset-0 -z-10" style={{
        background:
          'radial-gradient(600px 300px at 20% -10%, rgba(242,201,76,0.25), transparent 60%),'+
          'radial-gradient(400px 300px at 100% 10%, rgba(255,181,107,0.15), transparent 60%)'
      }} />

      <section className="container-safe grid min-h-screen items-center py-10 md:py-20">
        <div className="mx-auto w-full max-w-md">
          {/* Glass card for desktop; solid high-contrast for mobile */}
          <div className="rounded-2xl border p-6 md:p-8 md:bg-white/5 md:backdrop-blur md:border-white/15 bg-transparent">
            <div className="mb-6 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-display tracking-tight">Bienvenido</h1>
              <p className="text-sm text-muted mt-1">Ingresa a tu cuenta para continuar</p>
            </div>

            <form className="space-y-4" onSubmit={async (e)=>{
              e.preventDefault()
              const form = e.currentTarget as HTMLFormElement
              const formData = new FormData(form)
              const email = String(formData.get('email')||'')
              const password = String(formData.get('password')||'')
              const res = await signIn('credentials', { email, password, redirect: false })
              if ((res as any)?.error) setError('Credenciales inválidas')
              else router.replace('/')
            }}>
              <label className="block">
                <span className="block text-sm mb-1">Email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full h-14 md:h-12 rounded-xl bg-black/20 md:bg-black/20 border border-white/15 px-4 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </label>
              <label className="block">
                <span className="block text-sm mb-1">Password</span>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full h-14 md:h-12 rounded-xl bg-black/20 md:bg-black/20 border border-white/15 px-4 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </label>
              {error && (
                <div role="status" className="text-red-400 text-sm" aria-live="polite">{error}</div>
              )}
              <button
                className="w-full h-14 md:h-12 rounded-xl bg-primary text-black font-medium text-base md:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Entrar
              </button>
            </form>

            {/* Desktop subtle footer links */}
            <div className="hidden md:flex justify-between text-xs text-muted mt-4">
              <a href="#" className="hover:underline">¿Olvidaste tu contraseña?</a>
              <a href="#" className="hover:underline">Necesitas ayuda</a>
            </div>
          </div>

          {/* Desktop social proof row */}
          <div className="hidden md:flex justify-center gap-6 mt-6 text-xs text-muted">
            <span>Confiado por marcas modernas</span>
            <span aria-hidden>•</span>
            <span>Seguridad y rendimiento</span>
          </div>
        </div>
      </section>
    </main>
  )
}

