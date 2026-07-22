import type { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Highlight } from '@/components/Highlight';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell me where the work gets stuck. I will reply within one business day and help determine whether the next step is a simpler process, existing software, automation, assessment, or a separately scoped build.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32">
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-24 mb-24">
                <div>
                  <h1 className="heading-lg mb-8">
                    Tell me where the work gets <Highlight>stuck</Highlight>.
                  </h1>
                  <p className="text-xl text-gray-600 mb-12 font-display">
                    You do not need a polished AI idea or a feature list. Send the latest concrete example of the workflow breaking down—the handoff, record, report, reconciliation, or follow-up that keeps failing. I&apos;ll reply personally within one business day and help determine the right next step.
                  </p>

                  <div className="space-y-8 mb-10">
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-black mt-1 shrink-0" />
                      <div>
                        <h2 className="font-bold mb-2">Email</h2>
                        <a
                          href="mailto:start@arturosolo.com"
                          className="text-gray-600 hover:text-black transition-colors"
                        >
                          start@arturosolo.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-black mt-1 shrink-0" />
                      <div>
                        <h2 className="font-bold mb-2">Based in</h2>
                        <p className="text-gray-600">Phoenix, AZ</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-6">
                    <h2 className="text-lg font-bold mb-4">A useful first message covers</h2>
                    <ul className="space-y-3 text-gray-600 text-sm font-display">
                      <li>· What happened in the latest concrete example?</li>
                      <li>· Who does the work, and which tools or records are involved?</li>
                      <li>· What have you already tried, and what still does not fit?</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold mb-8">Start with the workflow</h2>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
