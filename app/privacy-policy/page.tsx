import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Arturo Solo LLC collects, uses, and protects personal information on arturosolo.com and in apps and products we publish.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32">
        <section className="section-padding">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose">
              <p>Last updated: July 13, 2026</p>

              <h2>1. Who we are</h2>
              <p>
                Arturo Solo LLC (&ldquo;we,&rdquo; &ldquo;us&rdquo;) operates arturosolo.com and publishes apps and products under the Arturo Solo LLC name
                (including any iOS apps we distribute).
                For privacy questions, deletion requests, or to revoke consent where applicable, contact{' '}
                <a href="mailto:start@arturosolo.com">start@arturosolo.com</a>.
              </p>

              <h2>2. Scope</h2>
              <p>
                This policy covers (a) the arturosolo.com marketing website, including the contact form, and (b) apps and products we publish
                or may distribute under Arturo Solo LLC, including any iOS apps. When a specific product uses different practices, we will update this
                policy before relying on those practices.
              </p>

              <h2>3. Information we collect</h2>
              <h3 className="text-xl font-bold mt-8 mb-4">Website</h3>
              <p>When you submit the contact form, we collect:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-600 font-display">
                <li>Full name</li>
                <li>Email address</li>
                <li>Company name</li>
                <li>Service interest (Workflow Assessment, Custom AI Build, or not sure)</li>
                <li>Optional message describing your bottleneck or project</li>
              </ul>
              <p>
                We may also process technical data needed to operate the site securely, such as IP address for rate limiting.
              </p>

              <h3 className="text-xl font-bold mt-8 mb-4">Apps and products we publish</h3>
              <p>
                Some apps and products may collect little or no personal information beyond what the operating system provides for core
                functionality. Where an app collects personal or usage data, it does so only as needed for that product&apos;s core features,
                typically after you grant an OS permission prompt, and only for the uses described in this policy (and any in-product notices).
              </p>
              <p>Depending on the product, that may include categories such as:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-600 font-display">
                <li>Account or contact details you provide (for example name or email)</li>
                <li>Content you create or upload in the product</li>
                <li>Device or diagnostics information needed to run, secure, or improve the product</li>
                <li>Purchase or subscription status if you buy through an app store</li>
              </ul>
              <p>
                We do not invent or enable advertising networks or tracking SDKs by default. If a product later uses analytics, crash reporting,
                or other processors, we will disclose them here and bind them to the equal-protection commitment below.
              </p>

              <h2>4. How we collect information</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-600 font-display">
                <li>Directly from you (contact form, in-app forms, account settings)</li>
                <li>Automatically when you use our website or apps (for example security logs, rate limiting, or diagnostics)</li>
                <li>From app platforms (for example Apple) when needed to fulfill purchases or distribute the product</li>
              </ul>

              <h2>5. How we use your information</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-600 font-display">
                <li>Respond to your inquiry personally</li>
                <li>Scope potential AI build engagements</li>
                <li>Send operator notification emails when you submit the website contact form</li>
                <li>Provide, maintain, secure, and improve apps and products we publish</li>
                <li>Comply with legal obligations and enforce our terms</li>
              </ul>
              <p>We do not sell your personal information.</p>

              <h2>6. How we store website contact information</h2>
              <p>
                Website contact submissions are stored in Supabase (managed PostgreSQL) hosted in the United States. Only the operator
                (Arthur Turnbull) can access submitted leads through authenticated admin access. Anonymous visitors cannot read contact submissions.
              </p>
              <p>
                Apps and products may store data on-device, on our servers, or with processors disclosed for that product. Storage location and
                access controls will match the sensitivity of the data and the product&apos;s design.
              </p>

              <h2>7. Retention</h2>
              <p>
                Website contact submissions are retained for up to 24 months, then deleted unless an active engagement requires longer retention.
                App and product data is retained only as long as needed to provide the product, comply with law, or resolve disputes, unless a
                longer period is stated for that product.
              </p>

              <h2>8. Third-party services</h2>
              <p>For the website, we currently use:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-600 font-display">
                <li><strong>Supabase</strong> — contact lead storage</li>
                <li><strong>Vercel</strong> — website hosting</li>
                <li><strong>Resend</strong> — operator email notifications (no marketing lists)</li>
                <li><strong>Upstash</strong> — rate limiting (IP-based, no PII stored beyond rate-limit counters)</li>
              </ul>
              <p>
                When we share user data with a third party (including analytics tools, advertising networks, SDKs, hosting providers, or related
                entities), we share only with parties that provide the same or equal protection of user data as stated in this policy.
              </p>

              <h2>9. Your rights and consent</h2>
              <p>
                You may request access to, correction of, or deletion of your personal information by contacting{' '}
                <a href="mailto:start@arturosolo.com">start@arturosolo.com</a>.
                Where an app or product relies on your consent (including OS permissions), you may revoke consent through device settings and/or by
                emailing the same address; we will honor revocation for processing under our control as required.
              </p>

              <h2>10. Children&apos;s privacy</h2>
              <p>
                Our website, apps, and products are not directed at children under 13. We do not knowingly collect personal information from
                children under 13. If you believe a child has provided personal information, contact us and we will delete it.
              </p>

              <h2>11. Changes</h2>
              <p>
                We may update this policy. The &ldquo;Last updated&rdquo; date at the top reflects the most recent revision. Material changes to
                app or product practices will be reflected here before those practices take effect for App Store distribution.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
