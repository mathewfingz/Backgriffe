export default function LoginPage(){
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 text-fg">
        <h1 className="text-2xl font-display mb-4">Inicia sesión</h1>
        <form className="space-y-4" action="/api/auth/signin" method="post">
          <label className="block">
            <span className="block text-sm mb-1">Email</span>
            <input name="email" type="email" required className="w-full h-12 rounded-lg bg-black/20 border border-white/10 px-3 outline-none focus-visible:ring-2 focus-visible:ring-primary" />
          </label>
          <label className="block">
            <span className="block text-sm mb-1">Password</span>
            <input name="password" type="password" required className="w-full h-12 rounded-lg bg-black/20 border border-white/10 px-3 outline-none focus-visible:ring-2 focus-visible:ring-primary" />
          </label>
          <button className="w-full h-12 rounded-lg bg-primary text-black font-medium">Entrar</button>
        </form>
      </div>
    </main>
  )
}

