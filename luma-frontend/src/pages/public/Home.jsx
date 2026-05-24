import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#FFFFFF', 
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden'
    }}>

      <Navbar />

      {/* 1. HERO CAPSULE (The Split Cinema Layout) */}
      <div style={{
        display: 'flex',
        minHeight: '95vh', /* Zdna chwya hna bach i-hze l-khat l-kbir */
        width: '100%',
        backgroundColor: '#FBFBFA',
        position: 'relative'
      }}>
        {/* Left Side: Fixed Manifesto (Sticky Look) */}
        <div 
          className="animate-slide-up"
          style={{
          width: '45%',
          padding: '80px 5% 80px 8%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRight: '1px solid #F0F0F0'
        }}>
          {/* Kberna l-letterSpacing w l-size chwya */}
          <span style={{
            fontSize: '12px',
            letterSpacing: '12px',
            textTransform: 'uppercase',
            color: '#9E7755',
            fontWeight: '600',
            marginBottom: '40px',
            display: 'block'
          }}>
            LUMA ARCHIVES
          </span>
          
          {/* T-kber mn 56px l 68px */}
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '68px',
            fontWeight: '300',
            color: '#1A1A1A',
            margin: '0 0 32px 0',
            lineHeight: '1.2',
            letterSpacing: '-1.5px'
          }}>
            L’art de la silhouette discrète.
          </h1>
          
          {/* T-kber mn 13px l 16px w zdna f l-maxWidth */}
          <p style={{
            fontSize: '16px',
            color: '#666666', /* Rednah dark chwya bach i-ban wa7ed m3a l-kber */
            lineHeight: '2',
            fontWeight: '300',
            maxWidth: '440px',
            marginBottom: '56px',
            letterSpacing: '0.3px'
          }}>
            Des collections intemporelles qui ne cherchent pas à se faire remarquer, mais dont on se souvient. Pensé pour le Maroc d'aujourd'hui.
          </p>

          <div>
            {/* Kberna l-paddings w l-fontSize dial l-bouton */}
            <Link to="/catalog" style={{
              display: 'inline-block',
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              padding: '22px 64px',
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={e => e.target.style.backgroundColor = '#9E7755'}
            onMouseLeave={e => e.target.style.backgroundColor = '#1A1A1A'}>
              Découvrir L'Édition
            </Link>
          </div>
        </div>

        {/* Right Side: Massive High-Contrast Image */}
        <div 
          className="animate-blur-in"
          style={{ width: '55%', position: 'relative', height: '95vh' }}>
          <img 
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&auto=format&fit=crop&q=90" 
            alt="Luma Editorial Haute Couture"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      </div>

      {/* 2. THE GALLERY CATEGORIES (Ultra Clean & Dynamic) */}
      <div style={{ padding: '160px 8%' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'baseline',
          marginBottom: '80px',
          borderBottom: '1px solid #1A1A1A',
          paddingBottom: '24px'
        }}>
          {/* T-kber mn 32px l 40px */}
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '40px', fontWeight: '300', margin: 0 }}>
            Les Lignes Émiliennes
          </h2>
          {/* T-kber mn 11px l 13px */}
          <span style={{ fontSize: '13px', letterSpacing: '3px', color: '#999999', textTransform: 'uppercase' }}>
            [ Sélection Automne-Hiver ]
          </span>
        </div>

        {/* Asymmetric Luxury Blocks */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '80px',
          alignItems: 'start'
        }}>
          
          {/* Block 01: Femme */}
          <div className="hover-lift">
            <div style={{ overflow: 'hidden', backgroundColor: '#F9F9F9', position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=900&auto=format&fit=crop&q=90" 
                alt="Femme Luxury Outerwear" 
                style={{ width: '100%', height: '750px', objectFit: 'cover', transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                {/* T-kber mn 22px l 28px */}
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: '300', margin: '0 0 12px 0' }}>01 / La Ligne Féminine</h3>
                {/* T-kber mn 13px l 15px */}
                <p style={{ fontSize: '15px', color: '#777777', fontWeight: '300', margin: 0 }}>Matières d'origine italienne, drapés impeccables.</p>
              </div>
              {/* T-kber mn 11px l 13px */}
              <Link to="/catalog?gender=women" style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '3px', color: '#1A1A1A', textDecoration: 'none', borderBottom: '1px solid #1A1A1A', paddingBottom: '6px' }}>Voir</Link>
            </div>
          </div>

          {/* Block 02: Enfants */}
          <div className="hover-lift" style={{ marginTop: '120px' }}>
            <div style={{ overflow: 'hidden', backgroundColor: '#F9F9F9' }}>
              <img 
                src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop&q=90" 
                alt="Enfant Minimal Wear" 
                style={{ width: '100%', height: '550px', objectFit: 'cover', transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ marginTop: '32px' }}>
              {/* T-kber mn 20px l 26px */}
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: '300', margin: '0 0 12px 0' }}>02 / L'Enfant Épuré</h3>
              {/* T-kber mn 13px l 15px */}
              <p style={{ fontSize: '15px', color: '#777777', fontWeight: '300', marginBottom: '28px' }}>Fibres douces et naturelles adaptées aux mouvements.</p>
              {/* T-kber mn 11px l 13px */}
              <Link to="/catalog?gender=kids" style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '3px', color: '#1A1A1A', textDecoration: 'none', borderBottom: '1px solid #1A1A1A', paddingBottom: '6px' }}>Explorer</Link>
            </div>
          </div>

        </div>
      </div>

      {/* 3. THE LUXURY MANIFESTO HERO BANNER (Pure Visual Impact) */}
      <div style={{
        height: '75vh', /* Zdna chwya f l-irtifa3 */
        width: '100%',
        backgroundColor: '#1A1A1A',
        backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        backgroundBlendMode: 'multiply',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFFFFF'
      }}>
        <div style={{ padding: '0 24px' }}>
          {/* T-kber l-fontSize l 13px */}
          <p style={{ fontSize: '13px', letterSpacing: '6px', textTransform: 'uppercase', color: '#9E7755', fontWeight: '600', marginBottom: '24px' }}>
            NOTRE ENGAGEMENT
          </p>
          {/* T-kber mn 40px l 52px bach t-ji 3amra w 9wya */}
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '52px', fontWeight: '300', maxWidth: '950px', margin: '0 auto', lineHeight: '1.4', letterSpacing: '1px' }}>
            Fabriquer moins, mais concevoir avec une perfection absolue.
          </h2>
        </div>
      </div>

      {/* 4. BRAND MAISON COUTURE VALUES (Museum Exhibit Style) */}
      <div style={{ backgroundColor: '#FDFDFD' }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '160px 8%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '100px',
          boxSizing: 'border-box'
        }}>
          {[
            { tag: '[ 01 ]', title: 'Atelier Privé', desc: 'Une confection haut de gamme qui respecte les lignes du corps et l’allure chic marocaine contemporaine.' },
            { tag: '[ 02 ]', title: 'Textiles Certifiés', desc: 'Nous sourçons exclusivement des tissus nobles : coton pur, lin lavé et mailles de cachemire éco-responsables.' },
            { tag: '[ 03 ]', title: 'Maison Concierge', desc: 'Une expérience d’achat haut de gamme avec une livraison signature sous 48 heures et des retours gérés à votre domicile.' },
          ].map((item, i) => (
            <div key={i} className="hover-lift" style={{ display: 'flex', flexDirection: 'column', padding: '20px', borderRadius: '8px', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FCFCFA'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
              {/* T-kber l-tag l 14px */}
              <span style={{ fontSize: '14px', color: '#9E7755', fontWeight: '500', fontFamily: 'monospace', marginBottom: '28px', display: 'block' }}>{item.tag}</span>
              {/* T-kber mn 11px l 14px */}
              <h4 style={{ 
                fontWeight: '600', 
                color: '#1A1A1A', 
                marginBottom: '18px', 
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '4px'
              }}>
                {item.title}
              </h4>
              {/* T-kber mn 13px l 15px */}
              <p style={{ color: '#555555', fontSize: '15px', margin: 0, lineHeight: '1.9', fontWeight: '300' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />

    </div>
  )
}