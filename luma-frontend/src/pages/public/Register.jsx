import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const sanitizedForm = {
        ...form,
        email: form.email.toLowerCase().trim()
      }
      await register(sanitizedForm)
      navigate('/dashboard')
    } catch (err) {
      setError("Désolé, une erreur est survenue lors de l'inscription.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex text-gray-900 bg-white font-sans selection:bg-black selection:text-white">
      {/* Left Column: Image / Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
            alt="Mode et Vêtements" 
            className="object-cover w-full h-full opacity-60 transition-transform duration-[20s] hover:scale-110 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
          <div>
            <Link to="/" className="text-white text-3xl font-bold tracking-[0.3em]">LUMA</Link>
          </div>
          <div className="max-w-md">
            <div className="inline-block px-3 py-1 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs tracking-widest uppercase">
              Le Vestiaire Luma
            </div>
            <h1 className="text-white text-5xl font-light tracking-tight leading-tight mb-6">
              Rejoignez le <span className="font-semibold italic">club</span> des privilégiés.
            </h1>
            <p className="text-white/70 text-sm tracking-wide leading-relaxed">
              Créez votre compte pour accéder à des offres exclusives, suivre vos commandes et sauvegarder vos pièces favorites.
            </p>
          </div>
          <div className="text-white/40 text-[10px] tracking-widest uppercase">
            © {new Date().getFullYear()} LUMA. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24 bg-[#FAFAFA] relative overflow-y-auto">
        <div className="w-full max-w-md relative z-10 py-10">
          {/* Mobile Header */}
          <div className="lg:hidden mb-12 text-center">
            <Link to="/" className="text-black text-3xl font-bold tracking-[0.3em]">LUMA</Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-medium tracking-tight text-black mb-3">
              Créer un compte
            </h2>
            <p className="text-sm text-gray-500 tracking-wide">
              Remplissez les informations ci-dessous pour vous inscrire.
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50/50 border border-red-100 rounded-xl flex items-center gap-3 animate-fade-in">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-semibold tracking-wider text-gray-700 uppercase">
                Nom Complet
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full bg-white border border-gray-200 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all shadow-sm"
                placeholder="Jean Dupont"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-semibold tracking-wider text-gray-700 uppercase">
                Adresse Email
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full bg-white border border-gray-200 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all shadow-sm"
                placeholder="nom@exemple.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs font-semibold tracking-wider text-gray-700 uppercase">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                className="w-full bg-white border border-gray-200 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password_confirmation" className="block text-xs font-semibold tracking-wider text-gray-700 uppercase">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="password_confirmation"
                value={form.password_confirmation}
                onChange={e => setForm({...form, password_confirmation: e.target.value})}
                className="w-full bg-white border border-gray-200 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden bg-black text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-black/20"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Création...
                    </>
                  ) : (
                    'Créer mon compte'
                  )}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="text-black font-semibold hover:underline underline-offset-4 decoration-2 decoration-gray-300 transition-all">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}