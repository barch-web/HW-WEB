'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  COMPANY_DETAILS,
  PROCESS_STEPS,
  FAQ_ITEMS,
  INITIAL_SITE_CONTENT,
  SiteContentState,
  validateQuoteForm,
  buildWhatsAppQuoteUrl,
  buildMailtoQuoteUrl,
  buildFaqJsonLd,
} from '@/lib/security-ops';
import { HwSvgSymbolDefs, HwShieldMark } from '@/components/HwBrandSvg';
import { ServiceLineIcon } from '@/components/GalleryIllustrations';
import { AdminPanelModal } from '@/components/AdminPanelModal';

export default function HwSecurityGuardApp() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [isSavingContent, setIsSavingContent] = useState(false);

  // Dynamic Site Content (Services & Gallery Photos managed by Admin Panel)
  const [siteContent, setSiteContent] =
    useState<SiteContentState>(INITIAL_SITE_CONTENT);

  // Quote Form State
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteService, setQuoteService] = useState<string>('Manned Guarding');
  const [quoteDetails, setQuoteDetails] = useState('');
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [preparedDispatch, setPreparedDispatch] = useState<{
    channel: 'WhatsApp' | 'Email';
    href: string;
    summary: string;
  } | null>(null);

  // Fetch persisted services & gallery photos on mount
  useEffect(() => {
    let active = true;
    fetch('/api/site-content')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (
          active &&
          data &&
          Array.isArray(data.services) &&
          Array.isArray(data.gallery)
        ) {
          setSiteContent(data);
        }
      })
      .catch(() => {
        // Fallback to initial site content
      });
    return () => {
      active = false;
    };
  }, []);

  const handleUpdateSiteContent = useCallback(
    async (action: string, payload: Record<string, unknown>) => {
      setIsSavingContent(true);
      try {
        const res = await fetch('/api/site-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, payload }),
        });
        if (res.ok) {
          const updated = await res.json();
          if (
            updated &&
            Array.isArray(updated.services) &&
            Array.isArray(updated.gallery)
          ) {
            setSiteContent(updated);
          }
        }
      } catch {
        // Keep current state on transient failure
      } finally {
        setIsSavingContent(false);
      }
    },
    []
  );

  const activeServices = siteContent.services;
  const activeGallery = siteContent.gallery;

  // Keyboard listener for Escape (closes mobile dropdown, lightbox, or admin modal) and Arrow keys (lightbox)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else if (adminPanelOpen) {
          setAdminPanelOpen(false);
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      } else if (lightboxIndex !== null && activeGallery.length > 0) {
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % activeGallery.length : null
          );
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + activeGallery.length) % activeGallery.length
              : null
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, mobileMenuOpen, adminPanelOpen, activeGallery.length]);

  const handleQuoteAction = async (channel: 'WhatsApp' | 'Email') => {
    const validation = validateQuoteForm({
      name: quoteName,
      phone: quotePhone,
      service: quoteService,
      details: quoteDetails,
    });

    if (!validation.valid) {
      setQuoteError(validation.error);
      setPreparedDispatch(null);
      return;
    }

    setQuoteError(null);
    const input = {
      name: quoteName,
      phone: quotePhone,
      service: quoteService,
      details: quoteDetails,
    };

    const targetHref =
      channel === 'WhatsApp'
        ? buildWhatsAppQuoteUrl(input)
        : buildMailtoQuoteUrl(input);

    setPreparedDispatch({
      channel,
      href: targetHref,
      summary: `Quote request ready for ${quoteName.trim()} (${quoteService})`,
    });

    // Silently persist quote request in the background via API / Supabase
    try {
      await fetch('/api/operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_quote',
          payload: {
            client_name: quoteName.trim(),
            phone: quotePhone.trim(),
            service_needed: quoteService,
            site_details:
              quoteDetails.trim() || 'Requested via website quote form.',
            channel,
          },
        }),
      });
    } catch {
      // Ignore background persistence errors
    }
  };

  const faqJsonLd = buildFaqJsonLd();

  return (
    <div className="page-bottom-spacer min-h-screen bg-[#FFFDF9] text-[#0B192C]">
      {/* Reusable SVG <symbol id="hw-shield-mark"> definition */}
      <HwSvgSymbolDefs />

      {/* FAQPage JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Fixed (Non-Scrollable) Navy Header */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-[#0B192C] text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 overflow-hidden px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Zone 1: Brand mark + wordmark + small tagline (hidden on small phones) */}
          <a
            href="#top"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center gap-3 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B722] shrink-0"
          >
            <HwShieldMark className="h-11 w-9 shrink-0" />
            <div className="flex items-baseline gap-2.5">
              <span className="font-wordmark text-xl font-bold tracking-wider text-white sm:text-2xl whitespace-nowrap">
                HW SECURITY GUARD LTD
              </span>
              <span className="hidden sm:inline-block text-xs font-medium tracking-wide text-amber-300 whitespace-nowrap">
                Security with purpose
              </span>
            </div>
          </a>

          {/* Zone 2: Desktop Menu (Visible above 980px) */}
          <nav
            aria-label="Primary Navigation"
            className="desktop-nav-only hidden items-center gap-6"
          >
            {[
              { href: '#services', label: 'Services' },
              { href: '#process', label: 'Process' },
              { href: '#gallery', label: 'Gallery' },
              { href: '#about', label: 'About' },
              { href: '#faq', label: 'FAQ' },
              { href: '#contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-[48px] items-center text-sm font-semibold text-slate-200 transition-colors hover:text-[#F5B722] whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary CTA ("Request a quote") + Hamburger Button below 980px */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="desktop-nav-only hidden min-h-[48px] items-center justify-center rounded-lg bg-[#F5B722] px-5 py-2.5 text-sm font-bold text-[#0B192C] transition-colors hover:bg-amber-400 whitespace-nowrap shrink-0"
            >
              Request a quote
            </a>

            <button
              type="button"
              aria-label={
                mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-dropdown"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="mobile-menu-toggle inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border border-white/25 bg-[#132842] text-white transition-colors hover:border-[#F5B722] hover:text-[#F5B722] cursor-pointer"
            >
              {mobileMenuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Hamburger Dropdown Menu (Below 980px) */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-dropdown"
            role="region"
            aria-label="Mobile Navigation Menu"
            className="mobile-dropdown-panel border-t border-white/15 bg-[#10223A] px-4 pt-2 pb-5 sm:px-6"
          >
            <nav className="flex flex-col divide-y divide-white/10">
              {[
                { href: '#services', label: 'Services' },
                { href: '#process', label: 'Process' },
                { href: '#gallery', label: 'Gallery' },
                { href: '#about', label: 'About' },
                { href: '#faq', label: 'FAQ' },
                { href: '#contact', label: 'Contact' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[48px] items-center text-base font-semibold text-white hover:text-[#F5B722]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-lg bg-[#F5B722] px-5 py-2.5 text-center text-sm font-bold text-[#0B192C]"
              >
                Request a quote
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAdminPanelOpen(true);
                }}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-lg border border-white/25 bg-[#0B192C] px-5 py-2.5 text-center text-sm font-bold text-amber-300 cursor-pointer"
              >
                Admin Panel
              </button>
            </div>
          </div>
        )}
      </header>

      <main id="top" className="pt-[76px]">
        {/* 1. HERO SECTION (Bright and warm color background) */}
        <section
          aria-labelledby="hero-heading"
          className="border-b border-amber-200 bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] py-14 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-xs font-bold tracking-wider text-amber-950 uppercase">
                  HW SECURITY GUARD LTD · SECURITY WITH PURPOSE
                </p>
                <h1
                  id="hero-heading"
                  className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-[#0B192C] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]"
                >
                  Safety driven by professionalism and positivity.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-800 sm:text-lg">
                  We combine trained uniformed guards, clear shift procedures and modern surveillance so every post, patrol and handover on your site has a clear purpose.
                </p>

                {/* Hero CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#0B192C] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-[#162B47] whitespace-nowrap shrink-0"
                  >
                    Request a quote
                  </a>
                  <a
                    href={COMPANY_DETAILS.phoneHref}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-lg border-2 border-[#0B192C] bg-white/80 px-6 py-3 text-base font-bold text-[#0B192C] transition-colors hover:bg-white whitespace-nowrap shrink-0"
                  >
                    Call 027 342 6450
                  </a>
                </div>
              </div>

              {/* Navy Emblem Panel featuring the reused <symbol> Logo Mark on a Navy Background */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-slate-800 bg-[#0B192C] p-8 text-white shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <HwShieldMark
                      className="h-28 w-24"
                      title="HW Security Guard Ltd Official Shield Emblem"
                    />
                    <p className="mt-4 font-wordmark text-2xl font-bold tracking-wider text-[#F5B722]">
                      HW SECURITY GUARD LTD
                    </p>
                    <p className="mt-1 text-sm font-medium text-amber-200">
                      Security with purpose
                    </p>
                    <div className="mt-6 w-full border-t border-white/15 pt-5 text-left text-xs text-slate-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Head Office</span>
                        <span className="font-semibold text-white">
                          North Industrial Area, Accra
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Digital Address</span>
                        <span className="font-semibold text-amber-300 tabular-nums">
                          GA-099-2945
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Direct Control Line</span>
                        <span className="font-semibold text-white tabular-nums">
                          027 342 6450
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Three Required Hero Trust Facts in Full-Width Strip Below Split */}
            <div className="mt-12 grid grid-cols-1 gap-4 border-t border-amber-900/15 pt-8 sm:grid-cols-3">
              <div className="rounded-xl bg-white/85 p-5 border border-amber-300/80">
                <p className="font-heading text-base font-extrabold text-[#0B192C]">
                  Based in Accra
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  North Industrial Area
                </p>
              </div>

              <div className="rounded-xl bg-white/85 p-5 border border-amber-300/80">
                <p className="font-heading text-base font-extrabold text-[#0B192C]">
                  Registered Ghanaian company
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  Companies Act, 2019 (Act 992)
                </p>
              </div>

              <div className="rounded-xl bg-white/85 p-5 border border-amber-300/80">
                <p className="font-heading text-base font-extrabold text-[#0B192C]">
                  Six security services
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  One accountable team
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SERVICES SECTION */}
        <section
          id="services"
          aria-labelledby="services-heading"
          className="bg-white py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2
                  id="services-heading"
                  className="font-heading text-3xl font-extrabold tracking-tight text-[#0B192C] sm:text-4xl"
                >
                  Security for every part of your operation
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                  Choose one service or combine several. We plan them together so nothing falls between the gaps.
                </p>
              </div>
            </div>

            {/* 3-column grid (2 on tablet, 1 on phone) with shared divider lines */}
            <div className="mt-10 grid grid-cols-1 border-t border-l border-slate-200 md:grid-cols-2 lg:grid-cols-3">
              {activeServices.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col justify-between border-r border-b border-slate-200 bg-white p-7 transition-colors hover:bg-amber-50/35"
                >
                  <div>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300 bg-[#FEF3C7] text-[#0B192C]">
                      <ServiceLineIcon
                        serviceId={service.iconId || service.id}
                      />
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-bold text-[#0B192C]">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-2">
                    <a
                      href="#contact"
                      onClick={() => setQuoteService(service.title)}
                      className="inline-flex min-h-[44px] items-center text-xs font-bold text-[#0B192C] underline decoration-[#F5B722] decoration-2 underline-offset-4 hover:text-amber-700"
                    >
                      Request {service.title} quote →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. HOW WE WORK SECTION (Pale blue background) */}
        <section
          id="process"
          aria-labelledby="process-heading"
          className="border-y border-blue-100 bg-[#EFF6FF] py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2
                id="process-heading"
                className="font-heading text-3xl font-extrabold tracking-tight text-[#0B192C] sm:text-4xl"
              >
                How we work
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">
                Every contract follows the same four steps, so you always know what to expect.
              </p>
            </div>

            <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="flex flex-col justify-between rounded-xl border border-blue-200 bg-white p-6"
                >
                  <div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B192C] font-heading text-base font-extrabold text-[#F5B722] tabular-nums">
                      {index + 1}
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-bold text-[#0B192C]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. GALLERY SECTION (Real Photographs) */}
        <section
          id="gallery"
          aria-labelledby="gallery-heading"
          className="bg-white py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2
                id="gallery-heading"
                className="font-heading text-3xl font-extrabold tracking-tight text-[#0B192C] sm:text-4xl"
              >
                Gallery
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                A look at the places and situations we protect. Tap any picture to enlarge it.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeGallery.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Enlarge picture: ${item.title} — ${item.caption}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition-transform duration-150 hover:-translate-y-0.5 hover:border-[#0B192C] cursor-pointer"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B192C]">
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#0B192C] group-hover:text-amber-700">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {item.caption}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center text-xs font-bold text-[#0B192C]">
                      Tap to enlarge picture →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 6. ABOUT SECTION (Pale blue background) */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="border-y border-blue-100 bg-[#EFF6FF] py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2
                  id="about-heading"
                  className="font-heading text-3xl font-extrabold tracking-tight text-[#0B192C] sm:text-4xl"
                >
                  Security with a purpose
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                  <p>
                    Being intentional is how we work. Every post, patrol and procedure has a reason, and we explain it to you in plain language.
                  </p>
                  <p>
                    HW Security Guard Ltd is a registered private security company based in Accra. We combine trained people, clear procedures and modern surveillance to protect your staff, property and cash.
                  </p>
                  <p>
                    Tell us what you need to protect and we will recommend a plan that fits.
                  </p>
                </div>
              </div>

              {/* Company details panel with a top border */}
              <aside
                aria-label="Company details"
                className="lg:col-span-5 rounded-xl border border-slate-200 border-t-4 border-t-[#0B192C] bg-white p-7"
              >
                <h3 className="font-heading text-xl font-bold text-[#0B192C]">
                  Company details
                </h3>
                <dl className="mt-5 divide-y divide-slate-200">
                  <div className="py-3 first:pt-0">
                    <dt className="text-xs font-semibold text-slate-500">
                      Registered name
                    </dt>
                    <dd className="mt-1 font-heading text-base font-bold text-[#0B192C]">
                      {COMPANY_DETAILS.registeredName}
                    </dd>
                  </div>
                  <div className="py-3">
                    <dt className="text-xs font-semibold text-slate-500">
                      Registration number
                    </dt>
                    <dd className="mt-1 font-mono text-base font-bold text-[#0B192C] tabular-nums">
                      {COMPANY_DETAILS.registrationNumber}
                    </dd>
                  </div>
                  <div className="py-3">
                    <dt className="text-xs font-semibold text-slate-500">
                      Registered under
                    </dt>
                    <dd className="mt-1 text-base font-bold text-[#0B192C]">
                      {COMPANY_DETAILS.registeredUnder}
                    </dd>
                  </div>
                  <div className="py-3 last:pb-0">
                    <dt className="text-xs font-semibold text-slate-500">
                      Sector
                    </dt>
                    <dd className="mt-1 text-base font-bold text-[#0B192C]">
                      {COMPANY_DETAILS.sector}
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        {/* 7. FAQ SECTION */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="bg-white py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2
                  id="faq-heading"
                  className="font-heading text-3xl font-extrabold tracking-tight text-[#0B192C] sm:text-4xl"
                >
                  Frequently asked questions
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Cannot find your answer? Call{' '}
                  <a
                    href={COMPANY_DETAILS.phoneHref}
                    className="font-bold text-[#0B192C] underline decoration-[#F5B722] decoration-2 underline-offset-4 hover:text-amber-700"
                  >
                    027 342 6450
                  </a>{' '}
                  or{' '}
                  <a
                    href="#contact"
                    className="font-bold text-[#0B192C] underline decoration-[#F5B722] decoration-2 underline-offset-4 hover:text-amber-700"
                  >
                    send us a message
                  </a>
                  .
                </p>
              </div>

              <div className="lg:col-span-8 divide-y divide-slate-200 border-t border-b border-slate-200">
                {FAQ_ITEMS.map((item) => (
                  <details key={item.question} className="group py-1">
                    <summary className="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 py-3 text-left font-heading text-base font-bold text-[#0B192C] hover:text-amber-800 sm:text-lg">
                      <span>{item.question}</span>
                      <span
                        aria-hidden="true"
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#0B192C] transition-transform duration-200 group-open:rotate-180"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-4 w-4"
                        >
                          <path
                            d="M5 7.5L10 12.5L15 7.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="pb-5 pr-8 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. CONTACT SECTION (Pale blue background) */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="border-t border-blue-100 bg-[#EFF6FF] py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
              {/* Left Column: Heading, Intro & Contact List with Icons */}
              <div className="lg:col-span-5">
                <h2
                  id="contact-heading"
                  className="font-heading text-3xl font-extrabold tracking-tight text-[#0B192C] sm:text-4xl"
                >
                  Request a quote
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">
                  Tell us about your site and the service you need. We will reply with the next steps.
                </p>

                <ul className="mt-8 space-y-5">
                  <li className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0B192C] text-[#F5B722]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path
                          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-500">Phone</p>
                      <a
                        href={COMPANY_DETAILS.phoneHref}
                        className="text-base font-bold text-[#0B192C] hover:underline tabular-nums"
                      >
                        {COMPANY_DETAILS.phoneDisplay}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0B192C] text-[#F5B722]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path
                          d="M22 6l-10 7L2 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-500">Email</p>
                      <a
                        href={`mailto:${COMPANY_DETAILS.email}`}
                        className="text-base font-bold text-[#0B192C] hover:underline break-all"
                      >
                        {COMPANY_DETAILS.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0B192C] text-[#F5B722]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path
                          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-500">Office</p>
                      <p className="text-sm font-semibold text-[#0B192C] sm:text-base">
                        {COMPANY_DETAILS.officeAddress}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0B192C] text-[#F5B722]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path
                          d="M3 9l9-6 9 6v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-500">
                        Postal address
                      </p>
                      <p className="text-sm font-semibold text-[#0B192C] sm:text-base">
                        {COMPANY_DETAILS.postalAddress}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Right Column: White Card "Send us your details" */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                  <h3 className="font-heading text-2xl font-bold text-[#0B192C]">
                    Send us your details
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Choose WhatsApp or email. Your message opens ready to send.
                  </p>

                  {quoteError && (
                    <div
                      role="alert"
                      className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3.5 text-sm font-bold text-red-800"
                    >
                      {quoteError}
                    </div>
                  )}

                  {preparedDispatch && (
                    <div
                      role="status"
                      className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-950"
                    >
                      <p className="font-bold">
                        ✓ {preparedDispatch.summary}
                      </p>
                      <p className="mt-1 text-xs text-emerald-800">
                        Click below to launch your prefilled {preparedDispatch.channel} message:
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <a
                          href={preparedDispatch.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#0B192C] px-4 py-2 text-xs font-bold text-[#F5B722]"
                        >
                          Open {preparedDispatch.channel} Message Now →
                        </a>
                      </div>
                    </div>
                  )}

                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mt-6 space-y-4"
                    noValidate
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="quote-name"
                          className="block text-sm font-bold text-[#0B192C]"
                        >
                          Your name
                        </label>
                        <input
                          id="quote-name"
                          type="text"
                          required
                          value={quoteName}
                          onChange={(e) => {
                            setQuoteName(e.target.value);
                            if (quoteError) setQuoteError(null);
                          }}
                          placeholder="Full name or company contact"
                          className="mt-1.5 w-full min-h-[48px] rounded-lg border border-slate-300 px-3.5 py-2.5 text-base text-[#0B192C]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="quote-phone"
                          className="block text-sm font-bold text-[#0B192C]"
                        >
                          Phone number
                        </label>
                        <input
                          id="quote-phone"
                          type="tel"
                          required
                          value={quotePhone}
                          onChange={(e) => {
                            setQuotePhone(e.target.value);
                            if (quoteError) setQuoteError(null);
                          }}
                          placeholder="e.g. 024 123 4567"
                          className="mt-1.5 w-full min-h-[48px] rounded-lg border border-slate-300 px-3.5 py-2.5 text-base text-[#0B192C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="quote-service"
                        className="block text-sm font-bold text-[#0B192C]"
                      >
                        Service needed
                      </label>
                      <select
                        id="quote-service"
                        value={quoteService}
                        onChange={(e) => setQuoteService(e.target.value)}
                        className="mt-1.5 w-full min-h-[48px] rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-[#0B192C]"
                      >
                        {activeServices.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="More than one service">
                          More than one service
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="quote-details"
                        className="block text-sm font-bold text-[#0B192C]"
                      >
                        About your site or event
                      </label>
                      <textarea
                        id="quote-details"
                        rows={4}
                        value={quoteDetails}
                        onChange={(e) => setQuoteDetails(e.target.value)}
                        placeholder="Location, number of guards, dates or anything else we should know"
                        className="mt-1.5 w-full rounded-lg border border-slate-300 p-3.5 text-base text-[#0B192C]"
                      />
                    </div>

                    <div className="pt-2 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => handleQuoteAction('WhatsApp')}
                        className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-lg bg-[#1D4ED8] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-blue-800 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Send on WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuoteAction('Email')}
                        className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-lg border-2 border-[#0B192C] bg-white px-6 py-3 text-base font-bold text-[#0B192C] transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Send by email
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. FOOTER (Navy background with reused SVG shield mark, wordmark, tagline, copyright & Admin Panel access) */}
      <footer className="border-t border-white/10 bg-[#0B192C] py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-3.5">
            <HwShieldMark className="h-11 w-9 shrink-0" />
            <div>
              <span className="font-wordmark text-xl font-bold tracking-wider text-white">
                HW SECURITY GUARD LTD
              </span>
              <p className="text-xs font-medium text-amber-300">
                Security with purpose
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm text-slate-300">
              © 2026 HW SECURITY GUARD LTD. All rights reserved.
            </p>
            <button
              type="button"
              onClick={() => setAdminPanelOpen(true)}
              className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-white/25 bg-[#132842] px-3.5 py-1.5 text-xs font-bold text-amber-300 transition-colors hover:border-[#F5B722] hover:bg-slate-800 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Admin Panel
            </button>
          </div>
        </div>
      </footer>

      {/* Fixed Bottom Bar on Screens 820px or Narrower ("Call us" and "WhatsApp") */}
      <div
        role="region"
        aria-label="Mobile Quick Contact Bar"
        className="mobile-bottom-cta-bar fixed right-0 bottom-0 left-0 z-40 hidden grid-cols-2 gap-3 border-t border-white/15 bg-[#0B192C] px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]"
      >
        <a
          href={COMPANY_DETAILS.phoneHref}
          className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#F5B722] px-4 py-2.5 text-sm font-bold text-[#0B192C]"
        >
          Call us
        </a>
        <a
          href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#1D4ED8] px-4 py-2.5 text-sm font-bold text-white"
        >
          WhatsApp
        </a>
      </div>

      {/* Full-Screen Dark Lightbox Modal for Gallery Pictures */}
      {lightboxIndex !== null && activeGallery[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged gallery picture: ${activeGallery[lightboxIndex].title}`}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-[#0B192C] text-white shadow-2xl"
          >
            {/* Top Bar inside Lightbox */}
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-3.5">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  {activeGallery[lightboxIndex].title}
                </h3>
                <p className="text-xs text-slate-300 tabular-nums">
                  Picture {lightboxIndex + 1} of {activeGallery.length}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close lightbox"
                onClick={() => setLightboxIndex(null)}
                className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Enlarged Real Photograph */}
            <div className="bg-[#081220] p-4 sm:p-6">
              <img
                src={activeGallery[lightboxIndex].imageUrl}
                alt={activeGallery[lightboxIndex].imageAlt}
                referrerPolicy="no-referrer"
                className="mx-auto max-h-[62vh] w-full rounded-lg object-cover"
              />
            </div>

            {/* Caption + Previous / Next Controls */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 px-5 py-4 sm:flex-row">
              <p className="text-sm text-slate-200">
                {activeGallery[lightboxIndex].caption}
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  aria-label="Previous picture"
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex - 1 + activeGallery.length) %
                        activeGallery.length
                    )
                  }
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-white/25 bg-[#132842] px-4 py-2 text-sm font-bold text-white hover:bg-slate-800 cursor-pointer"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  aria-label="Next picture"
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex + 1) % activeGallery.length
                    )
                  }
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#F5B722] px-4 py-2 text-sm font-bold text-[#0B192C] hover:bg-amber-400 cursor-pointer"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel Modal for Updating Services & Gallery Photos */}
      {adminPanelOpen && (
        <AdminPanelModal
          siteContent={siteContent}
          onUpdateContent={handleUpdateSiteContent}
          onClose={() => setAdminPanelOpen(false)}
          isSaving={isSavingContent}
        />
      )}
    </div>
  );
}
