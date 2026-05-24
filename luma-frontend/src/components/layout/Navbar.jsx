import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null)
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isDashboardArea = location.pathname.startsWith('/dashboard') || 
                          location.pathname.startsWith('/orders') || 
                          location.pathname.startsWith('/place-order') || 
                          location.pathname.startsWith('/profile') || 
                          location.pathname.startsWith('/admin');

  const menus = {
    femme: [
      { label: 'Toutes les pièces', path: '/catalog?gender=women' },
      { label: "Robes d'Exception", path: '/catalog?gender=women&category=robes-d-exception' },
      { label: 'Manteaux en Laine', path: '/catalog?gender=women&category=manteaux-en-laine' },
      { label: 'Sacs & Accessoires', path: '/catalog?gender=women&category=sacs-accessoires' },
    ],
    enfants: [
      { label: 'Toutes les pièces', path: '/catalog?gender=kids' },
      { label: 'Costumes Enfant', path: '/catalog?gender=kids&category=costumes-enfant' },
      { label: 'Ensembles Épurés', path: '/catalog?gender=kids&category=ensembles-epures' },
    ],
  }

  return (
    <div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', width: '100%' }}>
      
      {/* MAIN NAVBAR */}
      <nav style={{
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        borderBottom: '1px solid #EAEAEA',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.01)',
        backdropFilter: 'blur(8px)'
      }}
        onMouseLeave={() => setActiveMenu(null)}>
        
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px', /* Sghert l-height hna */
        }}>

          {/* LEFT: LOGO */}
          <Link to="/" style={{
            fontSize: '26px', /* Sghert l-logo */
            fontWeight: '900',
            color: '#000000',
            textDecoration: 'none',
            letterSpacing: '6px',
            display: 'inline-block'
          }}>
            LUMA
          </Link>

          {/* CENTER: NAV LINKS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}> {/* Sghert l-gap hna */}
            
            {!isDashboardArea && (
              <>
                <Link 
                  to="/"
                  onMouseEnter={() => setActiveMenu(null)}
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: location.pathname === '/' ? '#9E7755' : '#000000',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    position: 'relative',
                    padding: '24px 0',
                    transition: 'color 0.2s ease',
                  }}>
                  Accueil
                  {location.pathname === '/' && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: '#9E7755' }} />}
                </Link>

                <div 
                  onMouseEnter={() => setActiveMenu('femme')}
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: activeMenu === 'femme' ? '#9E7755' : '#000000',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    position: 'relative',
                    padding: '24px 0',
                    transition: 'color 0.2s ease',
                  }}>
                  Femme
                  {activeMenu === 'femme' && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: '#9E7755' }} />}
                </div>

                <div 
                  onMouseEnter={() => setActiveMenu('enfants')}
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: activeMenu === 'enfants' ? '#9E7755' : '#000000',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    position: 'relative',
                    padding: '24px 0',
                    transition: 'color 0.2s ease',
                  }}>
                  Enfants
                  {activeMenu === 'enfants' && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: '#9E7755' }} />}
                </div>

                <Link 
                  to="/evenements"
                  onMouseEnter={() => setActiveMenu(null)}
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: location.pathname === '/evenements' ? '#9E7755' : '#000000',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    position: 'relative',
                    padding: '24px 0',
                    transition: 'color 0.2s ease',
                  }}>
                  Événement
                  {location.pathname === '/evenements' && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: '#9E7755' }} />}
                </Link>

                <Link 
                  to="/a-propos"
                  onMouseEnter={() => setActiveMenu(null)}
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: location.pathname === '/a-propos' ? '#9E7755' : '#000000',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    position: 'relative',
                    padding: '24px 0',
                    transition: 'color 0.2s ease',
                  }}>
                  À Propos
                  {location.pathname === '/a-propos' && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: '#9E7755' }} />}
                </Link>

                <Link 
                  to="/contact"
                  onMouseEnter={() => setActiveMenu(null)}
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: location.pathname === '/contact' ? '#9E7755' : '#000000',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    position: 'relative',
                    padding: '24px 0',
                    transition: 'color 0.2s ease',
                  }}>
                  Contact
                  {location.pathname === '/contact' && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: '#9E7755' }} />}
                </Link>

                <Link to="/catalog?solde=true"
                  onMouseEnter={() => setActiveMenu(null)}
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#D9534F',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    padding: '24px 0',
                  }}>
                  Soldes
                </Link>
              </>
            )}
          </div>

          {/* RIGHT: AUTH & CART */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '14px', 
              fontSize: '13px', /* Sghert l-auth font */
              fontWeight: '500', 
              textTransform: 'uppercase', 
              letterSpacing: '1px' 
            }}>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" style={{ color: '#9E7755', textDecoration: 'none', fontWeight: 'bold' }}>
                    Mon Dashboard
                  </Link>
                  <span style={{ color: '#EAEAEA' }}>|</span>
                  <Link to="/orders" style={{ color: '#555555', textDecoration: 'none' }}>
                    Commandes
                  </Link>
                  <span style={{ color: '#EAEAEA' }}>|</span>
                  <Link to="/profile" style={{ color: '#555555', textDecoration: 'none' }}>
                    Mon Profil
                  </Link>
                  <span style={{ color: '#EAEAEA' }}>|</span>
                  <button onClick={handleLogout} style={{ color: '#D9534F', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', padding: 0 }}>
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" style={{ color: '#000000', textDecoration: 'none' }}>
                    Connexion
                  </Link>
                  <span style={{ color: '#EAEAEA' }}>|</span>
                  <Link to="/register" style={{ color: '#555555', textDecoration: 'none' }}>
                    S'inscrire
                  </Link>
                </>
              )}

              {user?.role === 'admin' && (
                <>
                  <span style={{ color: '#EAEAEA' }}>|</span>
                  <Link to="/admin" style={{ color: '#9E7755', textDecoration: 'none', fontWeight: '600' }}>Admin</Link>
                </>
              )}
            </div>

            {isAuthenticated && (
              <div style={{ display: 'flex', alignItems: 'center', borderLeft: '1px solid #EAEAEA', paddingLeft: '16px' }}>
                <Link to="/cart" style={{ textDecoration: 'none', color: '#000000', display: 'flex', alignItems: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </Link>
              </div>
            )}

          </div>
        </div>

        {/* MEGA MENU */}
        {activeMenu && menus[activeMenu] && (
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #EAEAEA',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
            zIndex: 999,
            padding: '40px 0',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{
              maxWidth: '1440px',
              margin: '0 auto',
              padding: '0 40px',
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '60px',
            }}>
              
              <div>
                <p style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#999999',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '20px',
                  borderBottom: '1px solid #F0F0F0',
                  paddingBottom: '6px'
                }}>
                  Catégories
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {menus[activeMenu].map((item, i) => (
                    <Link key={i} to={item.path}
                      onClick={() => setActiveMenu(null)}
                      style={{
                        fontSize: '15px',
                        color: '#333333',
                        textDecoration: 'none',
                        fontWeight: '400',
                        letterSpacing: '0.5px',
                        transition: '0.15s'
                      }}
                      onMouseEnter={e => e.target.style.color = '#9E7755'}
                      onMouseLeave={e => e.target.style.color = '#333333'}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div style={{
                backgroundColor: '#F9F9F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '30px 50px',
                border: '1px solid #F0F0F0'
              }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#9E7755', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '6px' }}>
                    Nouvelle Collection
                  </p>
                  <h2 style={{ fontSize: '24px', fontWeight: '300', color: '#000000', margin: '0 0 18px 0', letterSpacing: '1px' }}>
                    {activeMenu === 'femme' ? 'L’Élégance au Féminin 2026' : 'Mode Enfants 2026'}
                  </h2>
                  <Link to={activeMenu === 'femme' ? '/catalog?gender=women' : '/catalog?gender=kids'}
                    onClick={() => setActiveMenu(null)}
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      padding: '12px 35px',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      textDecoration: 'none',
                      fontWeight: '500',
                      transition: '0.2s'
                    }}
                    onMouseEnter={e => e.target.style.backgroundColor = '#9E7755'}
                    onMouseLeave={e => e.target.style.backgroundColor = '#000000'}>
                    Découvrir
                  </Link>
                </div>
                
                <div style={{ fontSize: '50px', opacity: 0.08, fontWeight: '100' }}>
                  {activeMenu === 'femme' ? '✨' : '🧸'}
                </div>
              </div>

            </div>
          </div>
        )}
      </nav>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}