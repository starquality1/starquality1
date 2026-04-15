import './globals.css';

export const metadata = {
  title: 'Esther Speaks: Get Into Tech Companion',
  description: 'A step-by-step career system for people breaking into tech. Role matching, CV translation, JD analysis, and readiness checking.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
