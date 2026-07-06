import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Process from '@/components/Process';
import WhyArturo from '@/components/WhyArturo';
import BlogTeaser from '@/components/BlogTeaser';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <Services />
      <Process />
      <WhyArturo />
      <BlogTeaser />
      <Footer />
    </div>
  );
}
