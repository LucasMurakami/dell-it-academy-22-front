import Header from "@/app/components/landing-page/Header";
import Hero from "@/app/components/landing-page/Hero";
import Features from "@/app/components/landing-page/Features";
import HowItWorks from "@/app/components/landing-page/HowItWorks";
import EventHistory from "@/app/components/landing-page/EventHistory";
import Footer from "@/app/components/landing-page/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <EventHistory />
      <Footer />
    </main>
  );
}