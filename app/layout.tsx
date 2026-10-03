import type { Metadata } from 'next';
import ScrollToTop from '@/components/ScrollToTop';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Arturo Solo LLC — Workflow Assessment',
    template: '%s | Arturo Solo LLC',
  },
  description:
    'Bring one stuck workflow. $1,500. Seven business days. A decision-ready Implementation Brief for small organizations where leaders wear many hats.',
  keywords: [
    'workflow assessment',
    'process automation',
    'small business operations',
    'Implementation Brief',
    'Arturo Solo',
  ],
  authors: [{ name: 'Arthur Turnbull', url: 'https://arturosolo.com' }],
  creator: 'Arturo Solo LLC',
  publisher: 'Arturo Solo LLC',
  metadataBase: new URL('https://arturosolo.com'),
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arturosolo.com',
    siteName: 'Arturo Solo LLC',
    title: 'Arturo Solo LLC — Workflow Assessment',
    description:
      'Bring one stuck workflow. $1,500. Seven business days. A decision-ready Implementation Brief for small organizations where leaders wear many hats.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arturo Solo LLC — Workflow Assessment',
    description:
      'Bring one stuck workflow. $1,500. Seven business days. A decision-ready Implementation Brief for small organizations where leaders wear many hats.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@700,400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-display">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
