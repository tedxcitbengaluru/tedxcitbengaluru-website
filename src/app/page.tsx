import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import Sidebar from '@/components/sections/social-sidebar';
import AboutPreview from '@/components/sections/about-preview';
import EventsPreview from '@/components/sections/events-preview';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Sidebar />
      <main className="relative">
        <Hero />
        <AboutPreview />
        <EventsPreview />
      </main>
      <Footer />
    </div>
  );
}
