import { Inter, Nunito } from 'next/font/google';
import RegisterModal from './components/modals/RegisterModel';
import ClientOnly from './components/navbar/ClientOnly';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import ToastProvider from './providers/ToasterProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToastProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>

        {children}
      </body>
    </html>
  )
}
