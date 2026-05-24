import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Link } from 'react-router-dom';

export default function About() {
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

      {/* Hero Header Section */}
      <div style={{
        minHeight: '60vh',
        width: '100%',
        backgroundColor: '#1C1C1C',
        backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundBlendMode: 'multiply',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFFFFF',
        position: 'relative',
        padding: '120px 24px 80px 24px',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '900px', animation: 'fadeInUp 1s ease-out' }}>
          <p style={{ 
            fontSize: '11px', 
            letterSpacing: '8px', 
            textTransform: 'uppercase', 
            color: '#C8956C', 
            fontWeight: '600', 
            marginBottom: '24px' 
          }}>
            L'HERITAGE LUMA
          </p>
          <h1 style={{ 
            fontFamily: 'Georgia, serif', 
            fontSize: '56px', 
            fontWeight: '300', 
            margin: '0 0 32px 0', 
            lineHeight: '1.2', 
            letterSpacing: '1px' 
          }}>
            L'essence du luxe discret.
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#E0E0E0',
            lineHeight: '1.8',
            fontWeight: '300',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Une signature haute couture marocaine née de la passion pour les lignes architecturales et les matières d'exception.
          </p>
        </div>
      </div>

      {/* Story Section 1: The Manifesto */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '140px 8%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '100px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ 
              fontSize: '11px', 
              letterSpacing: '4px', 
              textTransform: 'uppercase', 
              color: '#C8956C', 
              fontWeight: '600', 
              marginBottom: '24px',
              display: 'block'
            }}>
              NOTRE PHILOSOPHIE
            </span>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '38px',
              fontWeight: '300',
              color: '#1A1A1A',
              margin: '0 0 36px 0',
              lineHeight: '1.3'
            }}>
              Façonner l'intemporel dans un monde éphémère.
            </h2>
            <div style={{ spaceY: '24px' }}>
              <p style={{ fontSize: '15px', color: '#555555', lineHeight: '2', fontWeight: '300', marginBottom: '24px' }}>
                Fondée en 2026, la maison **LUMA** est née d'un désir profond de célébrer la couture avec sobriété. Nous croyons que la véritable élégance ne cherche pas à capter l'attention par le bruit, mais par la perfection millimétrée de sa silhouette, la noblesse brute de son textile, et l'art discret du détail invisible.
              </p>
              <p style={{ fontSize: '15px', color: '#555555', lineHeight: '2', fontWeight: '300' }}>
                Pensées pour l'homme, la femme et l'enfant d'aujourd'hui au Maroc et dans le monde, nos créations se déploient comme une garde-robe architecturale, alliant le minimalisme contemporain aux savoir-faire séculaires de nos artisans locaux. Chaque pièce porte en elle l'histoire d'un temps ralenti.
              </p>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ overflow: 'hidden', backgroundColor: '#F9F9F9', borderRadius: '4px' }}>
              <img 
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&auto=format&fit=crop&q=90" 
                alt="Luma Atelier Craftsmanship" 
                style={{ width: '100%', height: '550px', objectFit: 'cover', display: 'block', transition: 'transform 1.4s ease' }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              backgroundColor: '#FAF9F6',
              padding: '30px 40px',
              border: '1px solid #EAEAEA',
              maxWidth: '240px',
              display: 'none', // hidden on small, flex on larger
            }} className="md:block">
              <span style={{ fontSize: '28px', fontFamily: 'Georgia, serif', fontWeight: '300', color: '#C8956C', display: 'block', marginBottom: '8px' }}>100%</span>
              <span style={{ fontSize: '11px', tracking: '2px', textTransform: 'uppercase', color: '#777777', fontWeight: '500' }}>Artisanal & Fait Main</span>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section 2: Split Layout / Noble Materials */}
      <div style={{ backgroundColor: '#FAF9F6', padding: '140px 8%' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr',
            gap: '100px',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ overflow: 'hidden', backgroundColor: '#F9F9F9', borderRadius: '4px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=90" 
                  alt="Noble Fabrics Luma" 
                  style={{ width: '100%', height: '550px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>

            <div>
              <span style={{ 
                fontSize: '11px', 
                letterSpacing: '4px', 
                textTransform: 'uppercase', 
                color: '#C8956C', 
                fontWeight: '600', 
                marginBottom: '24px',
                display: 'block'
              }}>
                MATIÈRES SÉLECTIONNÉES
              </span>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '38px',
                fontWeight: '300',
                color: '#1A1A1A',
                margin: '0 0 36px 0',
                lineHeight: '1.3'
              }}>
                Un engagement absolu envers la pureté des fibres.
              </h2>
              <p style={{ fontSize: '15px', color: '#555555', lineHeight: '2', fontWeight: '300', marginBottom: '32px' }}>
                Nous croyons qu'un vêtement haut de gamme commence d'abord par son toucher. C'est pourquoi la maison LUMA source exclusivement des textiles certifiés d'une noblesse absolue. Du pur coton biologique, du lin lavé de première qualité, de la soie naturelle d'ateliers et de la laine mérinos ou cachemire fine d'origine italienne.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#1A1A1A', marginBottom: '12px' }}>Lin & Soie</h4>
                  <p style={{ fontSize: '13px', color: '#777777', lineHeight: '1.7', fontWeight: '300', margin: 0 }}>Des matières naturelles légères w respirantes, parfaitement tissées pour un confort royal.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#1A1A1A', marginBottom: '12px' }}>Laine & Cachemire</h4>
                  <p style={{ fontSize: '13px', color: '#777777', lineHeight: '1.7', fontWeight: '300', margin: 0 }}>Des mailles d'hiver d'une douceur inégalée pour envelopper le corps de chaleur.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Values (Grid Layout) */}
      <div style={{ padding: '140px 8%', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C8956C', fontWeight: '600', display: 'block', marginBottom: '16px' }}>NOS ENGAGEMENTS</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: '300', color: '#1A1A1A', margin: 0 }}>Les Piliers de la Maison</h2>
        </div>

        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px'
        }}>
          {[
            { 
              num: '01', 
              title: 'Ateliers Éthiques', 
              desc: 'Toutes nos créations sont confectionnées en séries limitées dans nos ateliers marocains ou italiens partenaires, garantissant des conditions de travail dignes w équitables.' 
            },
            { 
              num: '02', 
              title: 'Zéro Surproduction', 
              desc: 'Nous produisons uniquement ce que nous vendons. Grâce à notre modèle de collections capsules et de commandes exclusives, nous éliminons tout gaspillage de tissu.' 
            },
            { 
              num: '03', 
              title: 'Qualité Transgénérationnelle', 
              desc: 'Un vêtement LUMA est conçu pour durer des décennies. Nous soignons chaque couture pour qu\'il se transmette de génération en génération comme un précieux héritage.' 
            }
          ].map((val, i) => (
            <div key={i} style={{
              padding: '40px 30px',
              border: '1px solid #F0F0F0',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              backgroundColor: '#FCFCFA'
            }}>
              <span style={{ fontSize: '32px', fontFamily: 'Georgia, serif', color: '#C8956C', fontWeight: '300', display: 'block', marginBottom: '24px' }}>{val.num}</span>
              <h3 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '3px', color: '#1A1A1A', marginBottom: '16px' }}>{val.title}</h3>
              <p style={{ fontSize: '14px', color: '#666666', lineHeight: '1.8', fontWeight: '300', margin: 0 }}>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        backgroundColor: '#1A1A1A',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: '120px 24px',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: '300', marginBottom: '24px' }}>Entrez dans l'univers Luma</h2>
          <p style={{ fontSize: '14px', color: '#A0A0A0', lineHeight: '1.8', fontWeight: '300', marginBottom: '40px' }}>Explorez nos collections de robes d'exception, de manteaux en cachemire et de vêtements épurés pour enfants.</p>
          <Link to="/catalog" style={{
            display: 'inline-block',
            backgroundColor: '#FFFFFF',
            color: '#1A1A1A',
            padding: '18px 48px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => { e.target.style.backgroundColor = '#C8956C'; e.target.style.color = '#FFFFFF'; }}
          onMouseLeave={e => { e.target.style.backgroundColor = '#FFFFFF'; e.target.style.color = '#1A1A1A'; }}>
            Parcourir les Collections
          </Link>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
