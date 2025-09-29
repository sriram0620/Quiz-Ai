import { HeroSection } from "@/components/landing-page/hero-section"
import { FeatureSection } from "@/components/landing-page/feature-section"
import { TestimonialSection } from "@/components/landing-page/testimonial-section"
import { OutreachSection } from "@/components/landing-page/outreach-section"
import { InsightsSection } from "@/components/landing-page/insights-section"
import { WorkflowSection } from "@/components/landing-page/workflow-section"
import { TestimonialsGrid } from "@/components/landing-page/testimonials-grid"
import { CTASection } from "@/components/landing-page/cta-section"
import { Footer } from "@/components/landing-page/footer"
import { Navbar } from "@/components/landing-page/navbar"
import { FloatingCTA } from "@/components/landing-page/floating-cta"
import { BackToTop } from "@/components/landing-page/back-to-top"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden scroll-smooth">
      <div id="home" className="bg-gradient-to-r from-rose-500 via-violet-500 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animated-gradient relative">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/10 to-violet-600/10 rounded-full filter blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/10 to-blue-500/10 rounded-full filter blur-[100px] animate-pulse delay-1000"></div>
        </div>
        <Navbar />
        <HeroSection />

        <div className="relative z-10 pb-20">
          <div className="max-w-6xl mx-auto text-center px-4">
            <div className="bg-background/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-4xl font-bold text-white mb-6">AI-Powered Knowledge Quiz Experience</h2>
              <p className="text-white/90 mb-8 text-xl leading-relaxed max-w-4xl mx-auto">
                Challenge yourself with our intelligent quiz system that adapts to your interests and provides
                personalized feedback
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Choose Topic</h3>
                  <p className="text-white/80 text-sm">Select from Wellness, Tech Trends, and more</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">AI Generation</h3>
                  <p className="text-white/80 text-sm">AI creates 5 unique MCQs with smart options</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Interactive Quiz</h3>
                  <p className="text-white/80 text-sm">Navigate questions with progress tracking</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">4</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Smart Feedback</h3>
                  <p className="text-white/80 text-sm">Get personalized AI-generated insights</p>
                </div>
              </div>

              <Link href="/quiz">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 text-lg">
                  Start Your AI Quiz Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div id="features">
        <FeatureSection />
      </div>
      <div id="testimonials">
        <TestimonialSection />
      </div>
      <div id="outreach">
        <OutreachSection />
      </div>
      <div id="insights">
        <InsightsSection />
      </div>
      <div id="workflow">
        <WorkflowSection />
      </div>
      <div id="about">
        <TestimonialsGrid />
      </div>
      <div id="contact">
        <CTASection />
      </div>
      <Footer />
      <FloatingCTA />
      <BackToTop />
    </div>
  )
}
