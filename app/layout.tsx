import type { Metadata } from 'next';
import ScrollToTop from '@/components/ScrollToTop';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Arturo Solo LLC — Workflow assessment and custom AI builds',
    template: '%s | Arturo Solo LLC',
  },
  description:
    'When the work no longer fits the tools, Arturo Solo maps the workflow, compares the options, and scopes the right next step for small organizations.',
  keywords: [
    'workflow assessment',
    'process automation',
    'small business operations',
    'custom software',
    'custom AI',
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
    title: 'Arturo Solo LLC — Workflow assessment and custom AI builds',
    description:
      'When the work no longer fits the tools, Arturo Solo maps the workflow, compares the options, and scopes the right next step for small organizations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arturo Solo LLC — Workflow assessment and custom AI builds',
    description:
      'When the work no longer fits the tools, Arturo Solo maps the workflow, compares the options, and scopes the right next step for small organizations.',
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
    <html lang="en">
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
