import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Bricolage_Grotesque, Manrope } from 'next/font/google';
import './globals.css';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B192C',
};

export const metadata: Metadata = {
  title: 'HW Security Guard Ltd | Security with purpose',
  description:
    'HW Security Guard Ltd is a registered private security company based in Accra, Ghana (Companies Act, 2019 Act 992). Manned guarding, industrial security, cash-in-transit, CCTV surveillance, event security, and storage & asset security.',
  icons: {
    icon: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛡️</text></svg>`,
  },
  openGraph: {
    title: 'HW Security Guard Ltd | Security with purpose',
    description:
      'Registered private security company in Accra, Ghana. Uniformed guards, industrial security, cash-in-transit, CCTV installations, event security, and storage protection.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HW Security Guard Ltd | Security with purpose',
    description:
      'Registered private security company in Accra, Ghana. Uniformed guards, industrial security, cash-in-transit, CCTV installations, event security, and storage protection.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${bricolageGrotesque.variable} ${manrope.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#FFFDF9] text-[#0B192C] antialiased selection:bg-[#F59E0B]/25 selection:text-[#0B192C]"
      >
        {children}
      </body>
    </html>
  );
}
