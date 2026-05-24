import { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function Evenements() {
  const [email, setEmail] = useState('')

  const events = [
    {
      id: 1,
      title: "Lancement Haute Collection 2026 — Showroom Privé",
      date: "15 Juin 2026",
      time: "18:00 - 22:00",
      location: "Anfa Clubs, Casablanca",
      description: "Une immersion exclusive au cœur de notre nouvelle ligne de haute couture minimaliste. Découvrez les coupes avant-première, profitez d'un cocktail privé et échangez avec l'équipe artistique de LUMA.",
      type: "Présentiel (Sur Invitation)",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Talk : Mode Circulaire & L'Avenir du Tissu Organique",
      date: "02 Juillet 2026",
      time: "19:00",
      location: "Live Stream Privé via LUMA Club",
      description: "Un débat intime avec des experts du textile de luxe durable. Nous dévoilerons les coulisses de notre chaîne de production éco-responsable et l'importance d'investir dans le vêtement intemporel.",
      type: "Digital Access",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop"
    }
  ]

  const handleRegister = (e) => {
    e.preventDefault()
    alert('Votre demande d’accès VIP a été enregistrée. Un conseiller LUMA prendra contact avec vous par email.')
    setEmail('')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ 
        flex: 1,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', 
        backgroundColor: '#FFFFFF',
        color: '#000000',
        paddingTop: '70px',
        paddingBottom: '160px'
      }}>
      
      {/* 1. CINEMATIC HERO HEADER */}
      <div style={{
        position: 'relative',
        height: '450px',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: '100px'
      }}>
        <div style={{
          absolute: 'inset-0',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
          filter: 'grayscale(100%)'
        }} />
        <div style={{ relative: 'z-10', textAlign: 'center', padding: '0 20px' }}>
          <p style={{
            fontSize: '11px',
            color: '#FFFFFF',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            fontWeight: '600',
            marginBottom: '16px',
            opacity: 0.8
          }}>
            LUMA Expériences — 2026
          </p>
          <h1 style={{
            fontSize: '46px',
            fontWeight: '200',
            letterSpacing: '4px',
            color: '#FFFFFF',
            margin: '0 0 20px 0',
            textTransform: 'uppercase',
            lineHeight: '1.2'
          }}>
            Événements & Culture
          </h1>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#FFFFFF', margin: '0 auto', opacity: 0.5 }} />
        </div>
      </div>

      {/* 2. MAIN INTRO TEXT */}
      <div style={{ maxWidth: '800px', margin: '0 auto 120px auto', textAlign: 'center', padding: '0 30px' }}>
        <p style={{
          fontSize: '15px',
          color: '#555555',
          lineHeight: '2',
          letterSpacing: '0.5px',
          fontWeight: '300'
        }}>
          Vivez la mode au-delà du vêtement. Rejoignez nos showrooms éphémères, défilés privés et talks exclusifs conçus spécialement pour notre communauté d'avant-garde.
        </p>
      </div>

      {/* 3. ASYMMETRICAL LUXURY ZIG-ZAG LIST */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '140px'
      }}>
        {events.map((event, index) => (
          <div key={event.id} style={{
            display: 'flex',
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
            alignItems: 'center',
            gap: '100px',
            flexWrap: 'wrap'
          }}>
            
            {/* IMAGE COVER WITH SCALE ANIMATION CONTAINER */}
            <div className="event-img-container" style={{ 
              flex: '1 1 500px', 
              overflow: 'hidden', 
              height: '500px', 
              backgroundColor: '#FAFAFA',
              position: 'relative'
            }}>
              <img 
                src={event.image} 
                alt={event.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  filter: 'contrast(1.05) grayscale(15%)',
                  transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                fontSize: '10px',
                fontWeight: '600',
                padding: '6px 14px',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                {event.date}
              </div>
            </div>

            {/* CONTENT BLOC */}
            <div style={{ flex: '1 1 450px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#9E7755',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                display: 'block',
                marginBottom: '18px'
              }}>
                {event.type}
              </span>
              
              <h2 style={{
                fontSize: '28px',
                fontWeight: '300',
                margin: '0 0 24px 0',
                lineHeight: '1.4',
                letterSpacing: '0.5px',
                color: '#000000',
                textTransform: 'uppercase'
              }}>
                {event.title}
              </h2>

              {/* LOGISTICS BLOCK */}
              <div style={{ 
                marginBottom: '32px', 
                fontSize: '13px', 
                color: '#666666', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px',
                borderLeft: '1px solid #EAEAEA',
                paddingLeft: '20px'
              }}>
                <div><span style={{ color: '#999999', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px' }}>Heure :</span> &nbsp;{event.time}</div>
                <div><span style={{ color: '#999999', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px' }}>Lieu :</span> &nbsp;{event.location}</div>
              </div>

              <p style={{
                fontSize: '14px',
                color: '#666666',
                lineHeight: '1.9',
                marginBottom: '40px',
                fontWeight: '300',
                letterSpacing: '0.3px'
              }}>
                {event.description}
              </p>

              {/* PREMIUM ACTION BUTTON */}
              <button 
                onClick={() => alert(`Demande d'invitation enregistrée pour l'événement : \n${event.title}`)}
                style={{
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  padding: '16px 40px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '2.5px',
                  border: '1px solid #000000',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#000000';
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = '#000000';
                  e.target.style.color = '#FFFFFF';
                }}
              >
                Demander un accès VIP
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* 4. ULTRA-MINIMALIST CERCLE PRIVÉ FOOTER */}
      <div style={{
        maxWidth: '1000px',
        margin: '160px auto 0 auto',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #EAEAEA',
        padding: '100px 20px 0 20px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '11px', color: '#9E7755', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '16px' }}>
          LUMA Cercle Privé
        </p>
        <h3 style={{ fontSize: '22px', fontWeight: '200', letterSpacing: '2px', margin: '0 0 20px 0', textTransform: 'uppercase' }}>
          Accès Membres Privilégiés
        </h3>
        <p style={{ fontSize: '14px', color: '#777777', maxWidth: '480px', margin: '0 auto 48px auto', lineHeight: '1.8', fontWeight: '300' }}>
          Inscrivez-vous pour recevoir en avant-première nos invitations exclusives aux showrooms secrets, ventes privées et défilés.
        </p>
        
        {/* UNDERLINED DYNAMIC INPUT */}
        <form onSubmit={handleRegister} style={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '450px',
          margin: '0 auto',
          borderBottom: '1px solid #000000',
          paddingBottom: '10px'
        }}>
          <input 
            type="email" 
            placeholder="VOTRE ADRESSE EMAIL" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '8px 10px',
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '12px',
              letterSpacing: '2px',
              outline: 'none',
              flex: 1,
              color: '#000000',
              fontWeight: '300'
            }}
          />
          <button type="submit" style={{
            backgroundColor: 'transparent',
            color: '#000000',
            border: 'none',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '2.5px',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
            padding: '0 0 0 15px'
          }}
          onMouseEnter={e => e.target.style.opacity = 0.5}
          onMouseLeave={e => e.target.style.opacity = 1}>
            S'INSCRIRE
          </button>
        </form>
      </div>

      </div>
      <Footer />
    </div>
  )
}