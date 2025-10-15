"use client"
import { useRouter } from "next/navigation"

export default function Footer() {
  const router = useRouter()

  return (
    <footer className="relative w-full bg-black text-white overflow-hidden">
      {/* Top accent line using design system red */}
      <div className="w-full h-[2px] bg-red" style={{ background: 'var(--color-red)' }} />

      {/* Main CTA Section */}
      <section className="section">
        <div className="container">
          <div className="footer-cta-content">
            {/* Heading with proper typography scale */}
            <h2 className="text-heading-1 animate-fade-in-up" style={{ marginBottom: 'var(--space-xl)' }}>
              Ready to spread ideas? Join the exclusive <span className="text-red">TEDxCITBengaluru</span> team.
            </h2>

            {/* CTA Button */}
            <div className="animate-fade-in-up flex justify-center" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <button
                onClick={() => router.push("/joinus")}
                className="btn btn-primary"
                aria-label="Join the TEDxCITBengaluru team"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full border-t border-gray-800" />

      {/* Copyright Section */}
      <div className="py-12">
        <div className="container">
          <p className="text-caption text-center text-gray-400">
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-white">TEDxCITBengaluru</span>.
            This independent TEDx event is operated under license from TED.
          </p>
        </div>
      </div>
    </footer>
  )
}