import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    alert('Merci pour votre inscription !')
  }

  return (
    <footer style={{ 
      backgroundColor: '#1A1A1A', 
      color: '#FFFFFF', 
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      padding: '100px 40px 40px 40px', /* Kberna padding chwya bch i-tnafass l-footer */
      marginTop: 'auto',
      borderTop: '1px solid #222222'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '50px', /* Zdna f l-gap */
        marginBottom: '80px'
      }}>
        
        {/* COL 1: BRAND LOGO & ABOUT */}
        <div>
          {/* T-kber l-Logo mn 24px l 32px */}
          <Link to="/" style={{
            fontSize: '32px',
            fontWeight: '900',
            color: '#FFFFFF',
            textDecoration: 'none',
            letterSpacing: '8px',
            display: 'block',
            marginBottom: '24px'
          }}>
            LUMA
          </Link>
          {/* T-kber mn 13px l 15px o rje3 clear ktr f l-9raya */}
          <p style={{ 
            fontSize: '15px', 
            color: '#A0A0A0', 
            lineHeight: '1.8', 
            letterSpacing: '0.5px',
            margin: 0 
          }}>
            Une marque de mode contemporaine engagée dans le minimalisme, l'élégance et la durabilité pour toute la famille.
          </p>
        </div>

        {/* COL 2: SHOP LINKS */}
        <div>
          {/* T-kber mn 12px l 15px */}
          <h4 style={{ 
            fontSize: '15px', 
            fontWeight: '600', 
            textTransform: 'uppercase', 
            letterSpacing: '3px', 
            color: '#9E7755', 
            marginBottom: '28px' 
          }}>
            Boutique
          </h4>
          {/* Les liens t-kbro mn 13px l 15px */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Link to="/catalog?gender=women" style={{ fontSize: '15px', color: '#CCCCCC', textDecoration: 'none', transition: '0.2s' }} onMouseEnter={e => e.target.style.color = '#FFFFFF'} onMouseLeave={e => e.target.style.color = '#CCCCCC'}>Femme</Link>
            <Link to="/catalog?gender=kids" style={{ fontSize: '15px', color: '#CCCCCC', textDecoration: 'none', transition: '0.2s' }} onMouseEnter={e => e.target.style.color = '#FFFFFF'} onMouseLeave={e => e.target.style.color = '#CCCCCC'}>Enfants</Link>
            <Link to="/evenements" style={{ fontSize: '15px', color: '#CCCCCC', textDecoration: 'none', transition: '0.2s' }} onMouseEnter={e => e.target.style.color = '#FFFFFF'} onMouseLeave={e => e.target.style.color = '#CCCCCC'}>Événements</Link>
            <Link to="/a-propos" style={{ fontSize: '15px', color: '#CCCCCC', textDecoration: 'none', transition: '0.2s' }} onMouseEnter={e => e.target.style.color = '#FFFFFF'} onMouseLeave={e => e.target.style.color = '#CCCCCC'}>À Propos</Link>
            <Link to="/catalog?solde=true" style={{ fontSize: '15px', color: '#D9534F', textDecoration: 'none', fontWeight: '500' }}>Soldes</Link>
          </div>
        </div>

        {/* COL 3: ASSISTANCE */}
        <div>
          {/* T-kber mn 12px l 15px */}
          <h4 style={{ 
            fontSize: '15px', 
            fontWeight: '600', 
            textTransform: 'uppercase', 
            letterSpacing: '3px', 
            color: '#9E7755', 
            marginBottom: '28px' 
          }}>
            Assistance
          </h4>
          {/* Les liens t-kbro mn 13px l 15px */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Link to="/contact" style={{ fontSize: '15px', color: '#CCCCCC', textDecoration: 'none', transition: '0.2s' }} onMouseEnter={e => e.target.style.color = '#FFFFFF'} onMouseLeave={e => e.target.style.color = '#CCCCCC'}>Contactez-nous</Link>
            <Link to="/shipping" style={{ fontSize: '15px', color: '#CCCCCC', textDecoration: 'none', transition: '0.2s' }} onMouseEnter={e => e.target.style.color = '#FFFFFF'} onMouseLeave={e => e.target.style.color = '#CCCCCC'}>Livraison & Retours</Link>
            <Link to="/faq" style={{ fontSize: '15px', color: '#CCCCCC', textDecoration: 'none', transition: '0.2s' }} onMouseEnter={e => e.target.style.color = '#FFFFFF'} onMouseLeave={e => e.target.style.color = '#CCCCCC'}>FAQ</Link>
          </div>
        </div>

        {/* COL 4: NEWSLETTER */}
        <div>
          {/* T-kber mn 12px l 15px */}
          <h4 style={{ 
            fontSize: '15px', 
            fontWeight: '600', 
            textTransform: 'uppercase', 
            letterSpacing: '3px', 
            color: '#9E7755', 
            marginBottom: '28px' 
          }}>
            Newsletter
          </h4>
          {/* T-kber mn 13px l 15px */}
          <p style={{ fontSize: '15px', color: '#A0A0A0', marginBottom: '20px', lineHeight: '1.6' }}>
            Abonnez-vous pour recevoir nos nouveautés et offres exclusives.
          </p>
          <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', borderBottom: '1px solid #666666', paddingBottom: '8px' }}>
            {/* T-kber l-placeholder text l 13px */}
            <input 
              type="email" 
              placeholder="VOTRE ADRESSE EMAIL" 
              required
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '13px',
                letterSpacing: '1px',
                width: '100%',
                outline: 'none',
                padding: '6px 0'
              }}
            />
            {/* T-kber l-bouton l 14px bch i-ban wa7ed m3a l-input */}
            <button type="submit" style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              padding: '0 10px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.target.style.color = '#9E7755'}
            onMouseLeave={e => e.target.style.color = '#FFFFFF'}>
              OK
            </button>
          </form>
        </div>

      </div>

      {/* BOTTOM BAR: COPYRIGHT & SOCIALS */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        borderTop: '1px solid #222222',
        paddingTop: '40px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* Copyright t-kber mn 11px l 13px */}
        <p style={{ fontSize: '13px', color: '#777777', margin: 0, letterSpacing: '0.5px' }}>
          &copy; {currentYear} LUMA. Tous droits réservés. Designed with Style.
        </p>

        {/* Social Icons (Kberna l-SVGs chwya mn 18 l 22) */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#777777', transition: '0.2s' }} onMouseEnter={e => e.target.style.color = '#9E7755'} onMouseLeave={e => e.target.style.color = '#777777'}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#777777', transition: '0.2s' }} onMouseEnter={e => e.target.style.color = '#9E7755'} onMouseLeave={e => e.target.style.color = '#777777'}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          {/* TikTok */}
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" style={{ color: '#777777', transition: '0.2s' }} onMouseEnter={e => e.target.style.color = '#9E7755'} onMouseLeave={e => e.target.style.color = '#777777'}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
          </a>
        </div>
      </div>
    </footer>
  )
}