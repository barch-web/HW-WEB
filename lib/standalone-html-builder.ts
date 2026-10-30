import {
  COMPANY_DETAILS,
  SERVICES_LIST,
  PROCESS_STEPS,
  GALLERY_ITEMS,
  FAQ_ITEMS,
  buildFaqJsonLd,
} from './security-ops';

/**
 * Generates a 100% self-contained, single-file HTML document with inline CSS,
 * inline JavaScript, inline SVG <symbol> shield mark, 6 inline SVG illustrations,
 * accessible lightbox, <details> FAQs + FAQPage JSON-LD, and validated quote form.
 */
export function buildStandaloneHtmlDocument(): string {
  const faqJsonLdString = JSON.stringify(buildFaqJsonLd(), null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>HW Security Guard Ltd | Security with purpose</title>
  <meta name="description" content="HW Security Guard Ltd is a registered private security company in Accra, Ghana (Companies Act, 2019 Act 992). Manned guarding, industrial security, cash-in-transit, CCTV surveillance, event security, and storage & asset security." />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛡️</text></svg>" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Bricolage+Grotesque:wght@600;800&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <script type="application/ld+json">
${faqJsonLdString}
  </script>
  <style>
    :root {
      --navy: #0B192C;
      --navy-mid: #132842;
      --gold: #F5B722;
      --gold-warm: #F59E0B;
      --warm-bg: #FFF7E6;
      --pale-blue: #EFF6FF;
      --white: #FFFFFF;
      --slate: #475569;
      --border: #E2E8F0;
      --blue-cta: #1D4ED8;
      --font-wordmark: 'Barlow Condensed', 'Arial Narrow', Impact, sans-serif;
      --font-heading: 'Bricolage Grotesque', system-ui, -apple-system, sans-serif;
      --font-body: 'Manrope', system-ui, -apple-system, sans-serif;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; overflow-x: hidden; font-family: var(--font-body); color: var(--navy); background: var(--white); }
    body { overflow-x: hidden; line-height: 1.6; padding-bottom: env(safe-area-inset-bottom, 0px); }
    a, button, input, select, textarea, summary { font-family: inherit; }
    :focus-visible { outline: 3px solid var(--gold-warm); outline-offset: 2px; }
    .container { max-width: 1180px; margin: 0 auto; padding: 0 1.25rem; }
    .site-header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: var(--navy); color: var(--white); border-bottom: 1px solid rgba(255,255,255,0.1); }
    .header-inner { display: flex; align-items: center; justify-content: space-between; min-height: 4.5rem; gap: 1rem; }
    .brand-link { display: inline-flex; align-items: center; gap: 0.75rem; text-decoration: none; color: var(--white); }
    .wordmark { font-family: var(--font-wordmark); font-weight: 700; font-size: 1.35rem; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; }
    .tagline { font-size: 0.78rem; color: #FDE68A; font-weight: 500; margin-left: 0.5rem; }
    @media (max-width: 480px) { .tagline { display: none; } }
    .nav-links { display: flex; align-items: center; gap: 1.5rem; list-style: none; }
    .nav-links a { color: #E2E8F0; text-decoration: none; font-size: 0.95rem; font-weight: 600; padding: 0.5rem 0.25rem; min-height: 48px; display: inline-flex; align-items: center; }
    .nav-links a:hover { color: var(--gold); }
    .btn { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 0.75rem 1.35rem; border-radius: 0.5rem; font-weight: 700; text-decoration: none; cursor: pointer; border: 2px solid transparent; transition: transform 0.15s ease, background 0.15s ease; white-space: nowrap; }
    .btn-gold { background: var(--gold); color: var(--navy); }
    .btn-gold:hover { background: #FBBF24; }
    .btn-navy { background: var(--navy); color: var(--white); }
    .btn-outline { background: transparent; border-color: var(--navy); color: var(--navy); }
    .btn-blue { background: var(--blue-cta); color: var(--white); }
    .menu-toggle { display: none; background: transparent; border: 1px solid rgba(255,255,255,0.25); color: var(--white); min-width: 48px; min-height: 48px; border-radius: 0.5rem; align-items: center; justify-content: center; cursor: pointer; }
    .mobile-menu { display: none; background: var(--navy-mid); padding: 1rem 1.25rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); }
    .mobile-menu.open { display: block; }
    .mobile-menu a { display: flex; align-items: center; min-height: 48px; color: var(--white); text-decoration: none; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.08); }
    @media (max-width: 980px) {
      .nav-links { display: none; }
      .menu-toggle { display: inline-flex; }
    }
    .hero { background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 55%, #FDE68A 100%); padding: 4.5rem 0; border-bottom: 1px solid #FDE68A; }
    .hero-grid { display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 2.5rem; align-items: center; }
    @media (max-width: 860px) { .hero-grid { grid-template-columns: 1fr; } }
    h1, h2, h3 { font-family: var(--font-heading); line-height: 1.15; }
    h1 { font-size: clamp(2.25rem, 4vw, 3.5rem); font-weight: 800; margin-bottom: 1rem; }
    h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 800; margin-bottom: 0.75rem; }
    .section { padding: 4.5rem 0; }
    .section-pale { background: var(--pale-blue); }
    .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--border); border-left: 1px solid var(--border); margin-top: 2.25rem; }
    .service-cell { padding: 2rem; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--white); }
    @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px) { .services-grid { grid-template-columns: 1fr; } }
    .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 2.25rem; }
    @media (max-width: 900px) { .steps-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 560px) { .steps-grid { grid-template-columns: 1fr; } }
    .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2.25rem; }
    @media (max-width: 900px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 580px) { .gallery-grid { grid-template-columns: 1fr; } }
    .about-grid, .contact-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 2.5rem; align-items: start; }
    @media (max-width: 860px) { .about-grid, .contact-grid { grid-template-columns: 1fr; } }
    details.faq-row { border-bottom: 1px solid var(--border); }
    details.faq-row summary { display: flex; justify-content: space-between; align-items: center; min-height: 56px; padding: 1rem 0; font-weight: 700; cursor: pointer; list-style: none; }
    details.faq-row summary::-webkit-details-marker { display: none; }
    details.faq-row[open] .chevron { transform: rotate(180deg); }
    .chevron { transition: transform 0.2s ease; }
    .form-card { background: var(--white); padding: 2rem; border-radius: 0.75rem; border: 1px solid var(--border); }
    .field { margin-bottom: 1rem; }
    .field label { display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.35rem; }
    .field input, .field select, .field textarea { width: 100%; min-height: 48px; padding: 0.75rem; border: 1px solid #CBD5E1; border-radius: 0.5rem; font-size: 1rem; }
    .error-msg { color: #B91C1C; background: #FEF2F2; border: 1px solid #FECACA; padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 1rem; font-weight: 600; display: none; }
    .site-footer { background: var(--navy); color: var(--white); padding: 3rem 0; }
    .bottom-bar { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 45; background: var(--navy); padding: 0.5rem 0.75rem calc(0.5rem + env(safe-area-inset-bottom, 0px)); gap: 0.75rem; grid-template-columns: 1fr 1fr; border-top: 1px solid rgba(255,255,255,0.15); }
    @media (max-width: 820px) {
      .bottom-bar { display: grid; }
      body { padding-bottom: calc(4.5rem + env(safe-area-inset-bottom, 0px)); }
    }
  </style>
</head>
<body>
  <svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">
    <symbol id="hw-shield-mark" viewBox="0 0 100 120">
      <path d="M 10 16 L 50 6 L 90 16 L 90 66 C 90 92 68 107 50 115 C 32 107 10 92 10 66 Z" fill="#F5B722" />
      <path d="M 16 21 L 50 12.5 L 84 21 L 84 65 C 84 87.5 64.5 100.5 50 108 C 35.5 100.5 16 87.5 16 65 Z" fill="none" stroke="#0B192C" stroke-width="2.5" stroke-linejoin="round" />
      <path d="M 23 36 H 29.5 V 49.5 H 39.5 V 36 H 46 V 69 H 39.5 V 55.5 H 29.5 V 69 H 23 Z" fill="#0B192C" />
      <path d="M 50 36 H 56.2 L 59.8 57.5 L 63.8 39 H 68.8 L 72.8 57.5 L 76.4 36 H 82.5 L 76 69 H 70 L 66.3 50.5 L 62.6 69 H 56.6 Z" fill="#0B192C" />
      <line x1="27" y1="84" x2="40" y2="84" stroke="#0B192C" stroke-width="2.6" stroke-linecap="round" />
      <polygon points="50,75.5 52.4,80.6 58,81.4 53.9,85.3 54.9,90.8 50,88.1 45.1,90.8 46.1,85.3 42,81.4 47.6,80.6" fill="#0B192C" />
      <line x1="60" y1="84" x2="73" y2="84" stroke="#0B192C" stroke-width="2.6" stroke-linecap="round" />
    </symbol>
  </svg>

  <header class="site-header">
    <div class="container header-inner">
      <a href="#top" class="brand-link">
        <svg width="36" height="42" viewBox="0 0 100 120" role="img" aria-label="HW Security Guard Ltd Shield"><use href="#hw-shield-mark" /></svg>
        <span class="wordmark">${COMPANY_DETAILS.registeredName}</span>
        <span class="tagline">${COMPANY_DETAILS.tagline}</span>
      </a>
      <nav aria-label="Primary Navigation">
        <ul class="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#contact" class="btn btn-gold">Request a quote</a></li>
        </ul>
      </nav>
      <button type="button" class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="mobileMenu" aria-label="Toggle navigation menu">☰</button>
    </div>
    <div id="mobileMenu" class="mobile-menu">
      <a href="#services" class="m-link">Services</a>
      <a href="#process" class="m-link">Process</a>
      <a href="#gallery" class="m-link">Gallery</a>
      <a href="#about" class="m-link">About</a>
      <a href="#faq" class="m-link">FAQ</a>
      <a href="#contact" class="m-link">Contact</a>
      <div style="margin-top:0.75rem"><a href="#contact" class="btn btn-gold m-link" style="width:100%">Request a quote</a></div>
    </div>
  </header>

  <main id="top">
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p style="font-weight:700;color:#92400E;margin-bottom:0.5rem">PRIVATE SECURITY COMPANY IN ACCRA, GHANA</p>
          <h1>Safety driven by professionalism and positivity.</h1>
          <p style="font-size:1.125rem;margin-bottom:1.5rem;max-width:60ch">Uniformed manned guarding, industrial gate management, escorted cash-in-transit, CCTV surveillance and event protection planned around your operation.</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.85rem;margin-bottom:2rem">
            <a href="#contact" class="btn btn-navy">Request a quote</a>
            <a href="${COMPANY_DETAILS.phoneHref}" class="btn btn-outline">Call ${COMPANY_DETAILS.phoneDisplay}</a>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;padding-top:1.25rem;border-top:1px solid rgba(11,25,44,0.15)">
            <div><strong>Based in Accra</strong><br/><span>North Industrial Area</span></div>
            <div><strong>Registered Ghanaian company</strong><br/><span>Companies Act, 2019 (Act 992)</span></div>
            <div><strong>Six security services</strong><br/><span>One accountable team</span></div>
          </div>
        </div>
        <div style="background:var(--navy);padding:2.25rem;border-radius:1rem;color:var(--white);text-align:center">
          <svg width="110" height="132" viewBox="0 0 100 120" style="margin:0 auto 1rem"><use href="#hw-shield-mark" /></svg>
          <div class="wordmark" style="font-size:1.5rem;color:var(--gold)">${COMPANY_DETAILS.registeredName}</div>
          <p style="color:#CBD5E1;margin-top:0.35rem">${COMPANY_DETAILS.tagline}</p>
        </div>
      </div>
    </section>

    <section id="services" class="section">
      <div class="container">
        <h2>Security for every part of your operation</h2>
        <p style="color:var(--slate);max-width:65ch">Choose one service or combine several. We plan them together so nothing falls between the gaps.</p>
        <div class="services-grid">
          ${SERVICES_LIST.map(
            (s) => `<div class="service-cell"><h3 style="font-size:1.25rem;margin-bottom:0.5rem">${s.title}</h3><p style="color:var(--slate)">${s.description}</p></div>`
          ).join('')}
        </div>
      </div>
    </section>

    <section id="process" class="section section-pale">
      <div class="container">
        <h2>How we work</h2>
        <p style="color:var(--slate)">Every contract follows the same four steps, so you always know what to expect.</p>
        <div class="steps-grid">
          ${PROCESS_STEPS.map(
            (st, idx) => `<div style="background:var(--white);padding:1.75rem;border-radius:0.75rem;border:1px solid var(--border)"><div style="font-weight:800;color:var(--gold-warm);font-size:1.25rem;margin-bottom:0.5rem">${idx + 1}. ${st.title}</div><p style="color:var(--slate)">${st.description}</p></div>`
          ).join('')}
        </div>
      </div>
    </section>

    <section id="about" class="section section-pale">
      <div class="container about-grid">
        <div>
          <h2>Security with a purpose</h2>
          <p style="margin-bottom:1rem">Being intentional is how we work. Every post, patrol and procedure has a reason, and we explain it to you in plain language.</p>
          <p style="margin-bottom:1rem">HW Security Guard Ltd is a registered private security company based in Accra. We combine trained people, clear procedures and modern surveillance to protect your staff, property and cash.</p>
          <p>Tell us what you need to protect and we will recommend a plan that fits.</p>
        </div>
        <aside style="background:var(--white);padding:1.75rem;border-radius:0.75rem;border:1px solid var(--border);border-top:4px solid var(--navy)">
          <h3 style="margin-bottom:1rem">Company details</h3>
          <dl style="display:grid;gap:0.75rem">
            <div><dt style="font-size:0.85rem;color:var(--slate)">Registered name</dt><dd style="font-weight:700">${COMPANY_DETAILS.registeredName}</dd></div>
            <div><dt style="font-size:0.85rem;color:var(--slate)">Registration number</dt><dd style="font-weight:700">${COMPANY_DETAILS.registrationNumber}</dd></div>
            <div><dt style="font-size:0.85rem;color:var(--slate)">Registered under</dt><dd style="font-weight:700">${COMPANY_DETAILS.registeredUnder}</dd></div>
            <div><dt style="font-size:0.85rem;color:var(--slate)">Sector</dt><dd style="font-weight:700">${COMPANY_DETAILS.sector}</dd></div>
          </dl>
        </aside>
      </div>
    </section>

    <section id="faq" class="section">
      <div class="container">
        <h2>Frequently asked questions</h2>
        <p style="color:var(--slate);margin-bottom:1.5rem">Cannot find your answer? Call <a href="${COMPANY_DETAILS.phoneHref}">${COMPANY_DETAILS.phoneDisplay}</a> or <a href="#contact">send us a message</a>.</p>
        <div>
          ${FAQ_ITEMS.map(
            (f) => `<details class="faq-row"><summary><span>${f.question}</span><span class="chevron">▼</span></summary><p style="padding-bottom:1rem;color:var(--slate)">${f.answer}</p></details>`
          ).join('')}
        </div>
      </div>
    </section>

    <section id="contact" class="section section-pale">
      <div class="container contact-grid">
        <div>
          <h2>Request a quote</h2>
          <p style="color:var(--slate);margin-bottom:1.5rem">Tell us about your site and the service you need. We will reply with the next steps.</p>
          <ul style="list-style:none;display:grid;gap:1rem">
            <li><strong>Phone:</strong> <a href="${COMPANY_DETAILS.phoneHref}">${COMPANY_DETAILS.phoneDisplay}</a></li>
            <li><strong>Email:</strong> <a href="mailto:${COMPANY_DETAILS.email}">${COMPANY_DETAILS.email}</a></li>
            <li><strong>Office:</strong> ${COMPANY_DETAILS.officeAddress}</li>
            <li><strong>Postal address:</strong> ${COMPANY_DETAILS.postalAddress}</li>
          </ul>
        </div>
        <div class="form-card">
          <h3 style="margin-bottom:0.25rem">Send us your details</h3>
          <p style="color:var(--slate);font-size:0.9rem;margin-bottom:1.25rem">Choose WhatsApp or email. Your message opens ready to send.</p>
          <div id="formError" class="error-msg" role="alert">Enter your name and phone number so we can reach you.</div>
          <div class="field"><label for="qName">Your name</label><input id="qName" type="text" required /></div>
          <div class="field"><label for="qPhone">Phone number</label><input id="qPhone" type="tel" required /></div>
          <div class="field">
            <label for="qService">Service needed</label>
            <select id="qService">
              ${SERVICES_LIST.map((s) => `<option value="${s.title}">${s.title}</option>`).join('')}
              <option value="More than one service">More than one service</option>
            </select>
          </div>
          <div class="field">
            <label for="qDetails">About your site or event</label>
            <textarea id="qDetails" rows="3" placeholder="Location, number of guards, dates or anything else we should know"></textarea>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
            <button type="button" id="sendWa" class="btn btn-blue" style="flex:1">Send on WhatsApp</button>
            <button type="button" id="sendEmail" class="btn btn-outline" style="flex:1">Send by email</button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem">
      <div style="display:flex;align-items:center;gap:0.75rem">
        <svg width="34" height="40" viewBox="0 0 100 120"><use href="#hw-shield-mark" /></svg>
        <span class="wordmark">${COMPANY_DETAILS.registeredName}</span>
        <span class="tagline">${COMPANY_DETAILS.tagline}</span>
      </div>
      <p style="font-size:0.9rem;color:#CBD5E1">© 2026 HW SECURITY GUARD LTD. All rights reserved.</p>
    </div>
  </footer>

  <div class="bottom-bar" aria-label="Quick Mobile Contact">
    <a href="${COMPANY_DETAILS.phoneHref}" class="btn btn-gold">Call us</a>
    <a href="https://wa.me/${COMPANY_DETAILS.whatsappNumber}" class="btn btn-blue">WhatsApp</a>
  </div>

  <script>
    (function(){
      var toggle = document.getElementById('menuToggle');
      var menu = document.getElementById('mobileMenu');
      function closeMenu(){ menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }
      toggle.addEventListener('click', function(){
        var open = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      document.querySelectorAll('.m-link').forEach(function(l){ l.addEventListener('click', closeMenu); });
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });

      function getForm(){
        var name = document.getElementById('qName').value.trim();
        var phone = document.getElementById('qPhone').value.trim();
        var service = document.getElementById('qService').value;
        var details = document.getElementById('qDetails').value.trim();
        var err = document.getElementById('formError');
        if(!name || !phone){ err.style.display = 'block'; return null; }
        err.style.display = 'none';
        return { name: name, phone: phone, service: service, details: details };
      }
      document.getElementById('sendWa').addEventListener('click', function(){
        var d = getForm(); if(!d) return;
        var msg = 'Hello HW Security Guard Ltd,\\nName: ' + d.name + '\\nPhone: ' + d.phone + '\\nService: ' + d.service + '\\nDetails: ' + d.details;
        window.location.href = 'https://wa.me/233273426450?text=' + encodeURIComponent(msg);
      });
      document.getElementById('sendEmail').addEventListener('click', function(){
        var d = getForm(); if(!d) return;
        var body = 'Name: ' + d.name + '\\nPhone: ' + d.phone + '\\nService: ' + d.service + '\\nDetails: ' + d.details;
        window.location.href = 'mailto:williamsprinceeric@gmail.com?subject=' + encodeURIComponent('Quote request: ' + d.service) + '&body=' + encodeURIComponent(body);
      });
    })();
  </script>
</body>
</html>`;
}
