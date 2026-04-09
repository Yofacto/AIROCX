import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

function MainWebsite() {
  const [characters, setCharacters] = useState([]);
  const [showcaseItems, setShowcaseItems] = useState([]);
  const [merchItems, setMerchItems] = useState([]);
  const [selectedChar, setSelectedChar] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [showcaseFilter, setShowcaseFilter] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchData();
    setupScrollAnimations();
  }, []);

  const fetchData = async () => {
    try {
      const [charsRes, showcaseRes, merchRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/characters`),
        fetch(`${BACKEND_URL}/api/showcase`),
        fetch(`${BACKEND_URL}/api/merch`)
      ]);
      setCharacters(await charsRes.json());
      setShowcaseItems(await showcaseRes.json());
      setMerchItems(await merchRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const setupScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);
  };

  const addToCart = (name) => {
    setCartCount(cartCount + 1);
    showNotification(`${name} added to cart!`);
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 2500);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const name = e.target.contactName.value;
    showNotification(`Thanks ${name}! Your message has been sent. We'll reply within 24 hours.`);
    e.target.reset();
  };

  const filteredShowcase = showcaseFilter === 'all' 
    ? showcaseItems 
    : showcaseItems.filter(i => i.cat === showcaseFilter);

  return (
    <div className="main-website">
      {/* NAV */}
      <nav>
        <div className="nav-logo">AIROCX</div>
        <div className="nav-links">
          <a href="#characters">Characters</a>
          <a href="#showcase">Content</a>
          <a href="#merch">Store</a>
          <a href="#contact">Contact</a>
          <a href="/admin" style={{color: '#c9ff53'}}>Admin</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            <span>WHERE</span>
            <span>STORIES</span>
            <span>COME</span>
            <span className="outline">ALIVE</span>
          </h1>
          <p className="hero-tagline">
            An original animation universe with unforgettable characters, vibrant worlds, 
            and stories that spark imagination across every screen.
          </p>
        </div>
        <div className="hero-right">
          <div className="hero-character">
            <div className="char-placeholder">
              <div className="glow-orb one"></div>
              <div className="glow-orb two"></div>
              <div className="char-body" dangerouslySetInnerHTML={{
                __html: characters[0]?.svg || '<div></div>'
              }}></div>
            </div>
          </div>
        </div>

        {/* PARALLAX CAROUSEL */}
        <div className="hero-carousel-wrap">
          <div className="parallax-layer back" data-speed="0.5">
            <div className="carousel-track scroll-right">
              {[...Array(14)].map((_, i) => characters.map((ch, idx) => (
                <div key={`back-${i}-${idx}`} className="carousel-char" 
                     style={{background: ch.color}}>
                  <div dangerouslySetInnerHTML={{__html: ch.svg}}></div>
                  <span className="char-label">{ch.name}</span>
                </div>
              )))}
            </div>
          </div>
          <div className="parallax-layer mid" data-speed="1">
            <div className="carousel-track scroll-left">
              {[...Array(12)].map((_, i) => characters.map((ch, idx) => (
                <div key={`mid-${i}-${idx}`} className="carousel-char" 
                     style={{background: ch.color}}>
                  <div dangerouslySetInnerHTML={{__html: ch.svg}}></div>
                  <span className="char-label">{ch.name}</span>
                </div>
              )))}
            </div>
          </div>
          <div className="parallax-layer front" data-speed="1.5">
            <div className="carousel-track scroll-right">
              {[...Array(10)].map((_, i) => characters.map((ch, idx) => (
                <div key={`front-${i}-${idx}`} className="carousel-char" 
                     style={{background: ch.color}}>
                  <div dangerouslySetInnerHTML={{__html: ch.svg}}></div>
                  <span className="char-label">{ch.name}</span>
                </div>
              )))}
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...Array(20)].map((_, i) => (
            <span key={i}>ANIMATION • CHARACTERS • STORIES • WORLDS • IMAGINATION •&nbsp;</span>
          ))}
        </div>
      </div>

      {/* CHARACTERS */}
      <section id="characters" className="section-chars">
        <div className="section-header reveal">
          <div className="section-eyebrow">Meet the Cast</div>
          <h2 className="section-title">
            Key <span className="accent-text">Characters</span>
          </h2>
          <p className="section-desc">
            Each character in the AIROCX universe carries a unique personality, backstory, 
            and visual identity — designed to resonate across cultures and generations.
          </p>
        </div>

        <div className="char-grid">
          {characters.map((char, idx) => (
            <div key={char._id} className="char-card reveal" 
                 style={{transitionDelay: `${idx * 0.1}s`}}
                 onClick={() => setSelectedChar(char)}>
              <div className="char-img">
                <div className="char-img-inner" style={{background: char.color}}>
                  {char.image ? (
                    <img src={char.image} alt={char.name} className="char-photo" />
                  ) : (
                    <div dangerouslySetInnerHTML={{__html: char.svg}}></div>
                  )}
                </div>
              </div>
              <div className="char-info">
                <h3>{char.name}</h3>
                <p>{char.role}</p>
              </div>
              <div className="char-desc">{char.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CHARACTER MODAL */}
      {selectedChar && (
        <div className="modal-overlay active" onClick={() => setSelectedChar(null)}>
          <div className="modal-box char-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedChar(null)}>✕</button>
            <div className="char-modal-content">
              <div className="char-modal-img" style={{background: selectedChar.color}}>
                {selectedChar.image ? (
                  <img src={selectedChar.image} alt={selectedChar.name} className="char-photo" />
                ) : (
                  <div dangerouslySetInnerHTML={{__html: selectedChar.svg}}></div>
                )}
              </div>
              <div className="char-modal-info">
                <h2>{selectedChar.name}</h2>
                <div className="char-role">{selectedChar.role}</div>
                <p className="char-bio">{selectedChar.bio}</p>
                <div className="char-stats">
                  <div className="stat-item">
                    <div className="stat-label">Episodes</div>
                    <div className="stat-value">{selectedChar.episodes}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Fans</div>
                    <div className="stat-value">{selectedChar.fans}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Power</div>
                    <div className="stat-value">{selectedChar.power}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHOWCASE */}
      <section id="showcase" className="section-showcase">
        <div className="section-header reveal">
          <div className="section-eyebrow">— Episodes — Fan Art — Power</div>
          <h2 className="section-title">Content Universe</h2>
          <p className="section-desc">Explore Our World</p>
        </div>

        <div className="showcase-tabs reveal">
          <button className={`tab-btn ${showcaseFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setShowcaseFilter('all')}>All</button>
          <button className={`tab-btn ${showcaseFilter === 'video' ? 'active' : ''}`}
                  onClick={() => setShowcaseFilter('video')}>Videos</button>
          <button className={`tab-btn ${showcaseFilter === 'image' ? 'active' : ''}`}
                  onClick={() => setShowcaseFilter('image')}>Images</button>
          <button className={`tab-btn ${showcaseFilter === 'bts' ? 'active' : ''}`}
                  onClick={() => setShowcaseFilter('bts')}>Behind the Scenes</button>
        </div>

        <div className="showcase-grid">
          {filteredShowcase.map((item, idx) => (
            <div key={item._id} 
                 className={`showcase-item reveal ${item.large ? 'large' : ''}`}
                 style={{transitionDelay: `${idx * 0.05}s`}}
                 onClick={() => item.type === 'video' && setVideoId(item.ytId)}>
              {item.image ? (
                <img src={item.image} alt={item.title} className="showcase-photo" />
              ) : (
                <div className="showcase-thumb" style={{
                  width: '100%', height: '100%', background: item.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '48px', color: 'rgba(255,255,255,0.2)'
                }}>
                  {item.type === 'video' ? '▶' : '◆'}
                </div>
              )}
              <div className="showcase-overlay">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
              {item.type === 'video' && (
                <div className="play-icon">
                  <svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19"/></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO MODAL */}
      {videoId && (
        <div className="modal-overlay active" onClick={() => setVideoId(null)}>
          <div className="modal-box video-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setVideoId(null)}>✕</button>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* MERCH */}
      <section id="merch" className="section-merch">
        <div className="section-header reveal">
          <div className="section-eyebrow">Official Store</div>
          <h2 className="section-title">Wear the Universe</h2>
          <a href="#" className="view-all-link">View All Products →</a>
        </div>

        <div className="merch-grid">
          {merchItems.map((item, idx) => (
            <div key={item._id} className="merch-card reveal" 
                 style={{transitionDelay: `${idx * 0.05}s`}}>
              <div className="merch-img">
                <div className="merch-img-inner" style={{
                  background: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '64px'
                }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="merch-photo" />
                  ) : item.emoji}
                </div>
              </div>
              <div className="merch-details">
                <div className="merch-cat">{item.cat}</div>
                <div className="merch-name">{item.name}</div>
                <div className="merch-price-row">
                  <span className="merch-price">${item.price.toFixed(2)}</span>
                  <button className="merch-btn" onClick={() => addToCart(item.name)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section className="section-partnerships">
        <div className="section-header reveal">
          <div className="section-eyebrow">Corporate Partnerships</div>
          <h2 className="section-title">Partnered with Visionaries</h2>
          <p className="section-desc">
            We collaborate with forward-thinking brands to bring our characters and stories 
            into the real world — from licensing to co-branded experiences.
          </p>
        </div>

        <div className="partner-logos reveal">
          {['NEXON', 'CRUX', 'VYRAL', 'KINDR', 'HELIO', 'PLUMA'].map(name => (
            <div key={name} className="partner-logo">{name}</div>
          ))}
        </div>

        <div className="partnership-cards">
          <div className="partnership-card reveal">
            <div className="partnership-icon">🎬</div>
            <h3>Licensing & Distribution</h3>
            <p>
              Bring AIROCX characters to your platform with flexible licensing for streaming, 
              broadcast, and digital distribution worldwide.
            </p>
          </div>
          <div className="partnership-card reveal">
            <div className="partnership-icon">🛍️</div>
            <h3>Co-Branded Products</h3>
            <p>
              From toys to fashion, we create co-branded merchandise lines that resonate 
              with audiences and drive retail engagement.
            </p>
          </div>
          <div className="partnership-card reveal">
            <div className="partnership-icon">🎮</div>
            <h3>Interactive Experiences</h3>
            <p>
              Partner with us to develop games, AR filters, theme park attractions, 
              and immersive digital experiences for your audience.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="contact-inner">
          <div className="contact-left">
            <div className="section-eyebrow reveal">Get in Touch</div>
            <h2 className="section-title reveal">
              Let's Build <span className="accent-text">Something Epic</span>
            </h2>
            <p className="contact-desc reveal">
              Whether you're a brand exploring a partnership, a creator seeking collaboration, 
              or a fan with a story to share — we'd love to hear from you.
            </p>

            <div className="contact-details reveal">
              <div className="contact-detail-item">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-detail-label">Studio</div>
                  <div className="contact-detail-value">42 Nebula Lane, Los Angeles, CA 90028</div>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <div className="contact-detail-label">Email</div>
                  <div className="contact-detail-value">hello@airocx.studio</div>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-icon">📞</div>
                <div>
                  <div className="contact-detail-label">Phone</div>
                  <div className="contact-detail-value">+1 (323) 555-AIROCX</div>
                </div>
              </div>
            </div>

            <div className="contact-socials reveal">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">YouTube</a>
              <a href="#" className="social-link">TikTok</a>
              <a href="#" className="social-link">X / Twitter</a>
            </div>
          </div>

          <div className="contact-right">
            <form className="contact-form reveal" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-input" id="contactName" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-input form-select" required>
                  <option>Choose a topic</option>
                  <option>Partnership Inquiry</option>
                  <option>Licensing & Distribution</option>
                  <option>Merchandising</option>
                  <option>Press & Media</option>
                  <option>Careers</option>
                  <option>Fan Mail</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input form-textarea" required></textarea>
              </div>
              <button type="submit" className="btn-primary contact-submit">
                Send Message <span className="submit-arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box reveal">
          <h2>Ready to Join the AIROCX Universe?</h2>
          <p>
            Whether you're a brand seeking a creative partnership or a fan who wants to dive deeper 
            — we'd love to hear from you.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary">Partner With Us</button>
            <button className="btn-outline">Explore Careers</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">AIROCX</div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
        </div>
        <div className="footer-copy">© 2025 AIROCX Studios. All rights reserved.</div>
      </footer>

      {/* CART BADGE */}
      <div className="cart-badge" style={{
        position: 'fixed', top: '24px', right: '48px', zIndex: 1000,
        background: 'var(--accent)', color: 'var(--bg)',
        width: '44px', height: '44px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: '700', fontSize: '16px',
        boxShadow: '0 4px 20px rgba(201,255,83,0.4)',
        mixBlendMode: 'normal'
      }}>
        {cartCount}
      </div>

      {/* NOTIFICATION */}
      {notification && (
        <div className="notification show">{notification}</div>
      )}
    </div>
  );
}

export default MainWebsite;
