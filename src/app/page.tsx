import Hero from '@/components/sections/hero';
import AboutPreview from '@/components/sections/about-preview';
import EventsPreview from '@/components/sections/events-preview';
import Footer from '@/components/layout/footer';
import RecruitmentFAB from '@/components/sections/recruitment-fab';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <main className="relative">
        <Hero />
        <AboutPreview />
        <EventsPreview />
      </main>
      <Footer />
      <RecruitmentFAB />
    </div>
  );
}
