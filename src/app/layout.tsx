import type { Metadata } from 'next';
import './globals.css';
import KakaoBrowserBlocker from '@/components/KakaoBrowserBlocker';

export const metadata: Metadata = {
  title: 'KCBA 이사회 자료실',
  description: 'KCBA 이사회 회의록 및 공식 자료실입니다.',
  manifest: '/manifest.json',
  themeColor: '#002664',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'KCBA 자료실',
  },
  openGraph: {
    title: 'KCBA 이사회 자료실',
    description: '최신 회의록 및 안건지 자료',
    siteName: 'KCBA Board Minutes',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        <KakaoBrowserBlocker />
        <header className="bg-[#002664] text-white shadow-md sticky top-0 z-50">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-lg font-bold tracking-tight">KCBA 이사회 자료실</h1>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
