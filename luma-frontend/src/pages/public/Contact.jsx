import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Sparkles } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate luxury api transmission
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF8F6', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main className="flex-1 pt-[110px] pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full animate-fade-in" style={{ fontFamily: '"Outfit", sans-serif' }}>
        
        {/* HERO TITLE BLOCK */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] uppercase tracking-widest text-[#C8956C] font-extrabold flex items-center justify-center gap-1.5">
            <Sparkles size={10} /> Relations Clients & Atelier
          </span>
          <h1 className="text-4xl md:text-5xl font-light uppercase tracking-widest text-stone-900 font-serif">
            Contacter La Maison
          </h1>
          <div className="w-12 h-[1px] bg-[#C8956C] mx-auto"></div>
          <p className="text-xs text-stone-450 max-w-md mx-auto leading-relaxed">
            Notre service conciergerie est à votre entière disposition pour toute demande de commande personnalisée, suivi ou rendez-vous en showroom privé.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT SIDE: SHOWROOM / DETAILS */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-stone-150/70 shadow-sm flex flex-col justify-between space-y-10">
            <div className="space-y-6">
              <h2 className="text-xl font-light uppercase tracking-widest text-stone-900 font-serif border-b border-stone-100 pb-4">
                Nos Coordonnées
              </h2>

              <div className="space-y-6 text-xs text-stone-600">
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-[#C8956C] flex-shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 uppercase tracking-wider mb-1">Showroom Privé</h3>
                    <p className="leading-relaxed">Anfa Clubs, Boulevard de l'Aviation,<br />Casablanca, Maroc</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-[#C8956C] flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 uppercase tracking-wider mb-1">Téléphone & Conciergerie</h3>
                    <p className="leading-relaxed font-semibold text-stone-850">+212 522 99 88 77</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">WhatsApp Privé: +212 661 23 45 67</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-[#C8956C] flex-shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 uppercase tracking-wider mb-1">Relations Clientèle</h3>
                    <p className="leading-relaxed font-semibold text-stone-850">contact@luma.com</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">Réponse garantie sous 24h ouvrées.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-[#C8956C] flex-shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 uppercase tracking-wider mb-1">Heures d'Ouverture</h3>
                    <p className="leading-relaxed">Du Lundi au Samedi : 10h00 - 19h00</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">Showroom accessible uniquement sur rendez-vous.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* LUXURY BADGE */}
            <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#F3F2EE] flex gap-3 items-start">
              <MessageSquare className="text-[#C8956C] flex-shrink-0 mt-0.5" size={16} />
              <div className="text-[10px] leading-relaxed text-stone-500">
                <p className="font-bold text-stone-800 uppercase tracking-wider">Demande de mesure personnalisée</p>
                <p className="mt-0.5">Pour vos événements et cérémonies privées, nos modélistes et tailleurs se déplacent à domicile ou vous reçoivent en salon privé.</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: MESSAGE FORM */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-stone-150/70 shadow-sm">
            <h2 className="text-xl font-light uppercase tracking-widest text-stone-900 font-serif border-b border-stone-100 pb-4 mb-6">
              Nous Écrire
            </h2>

            {success ? (
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-8 text-center space-y-4 my-12 animate-fade-in">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800">Message Transmis avec Succès</h3>
                <p className="text-xs text-emerald-600 max-w-sm mx-auto leading-relaxed">
                  Votre message a été transmis directement à notre atelier. Un conseiller LUMA prendra contact avec vous dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Votre Nom Complet</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ex: Selma Tazi"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-900 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-stone-450 font-bold">Votre Adresse Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Ex: selma@luma.com"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-900 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-stone-450 font-bold">Sujet de votre demande</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Ex: Demande de rendez-vous / Mesures sur-mesure"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-stone-450 font-bold">Votre Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Veuillez détailler votre demande ici..."
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-900 transition-colors resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#1A1A1A] hover:bg-[#C8956C] disabled:bg-stone-200 text-white font-bold py-4 text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>Transmission en cours...</>
                  ) : (
                    <>
                      Envoyer le message <Send size={12} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
