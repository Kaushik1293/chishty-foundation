import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Chishty Foundation",
  description: "Privacy Policy for Chishty Foundation (chishtyfoundation.org).",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF8] pt-36 pb-24 font-satoshi">
      <div className="container mx-auto px-5 md:px-8 max-w-4xl">
        <div className="mb-12 text-center md:text-left">
          <span className="font-satoshi text-xs tracking-[0.2em] font-semibold text-dark-yellow uppercase">
            Legal
          </span>
          <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-green mt-2 mb-4">
            Privacy Policy
          </h1>
          <p className="text-dark-green/60 text-sm">
            Effective date: <span className="italic">[to be set at launch]</span>
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F1E3D7] shadow-sm space-y-8 text-dark-green/85 text-base sm:text-lg leading-relaxed">
          <p>
            Chishty Foundation (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates{" "}
            <strong className="text-dark-green">chishtyfoundation.org</strong>.
            This policy explains what we collect and how we use it.
          </p>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              What We Collect
            </h2>
            <p>
              The name, email address, phone number and message you submit
              through our contact, volunteer or donation forms; and standard
              technical data such as browser type, device and pages visited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Why We Collect It
            </h2>
            <p>
              To reply to your enquiry, process and acknowledge a donation,
              coordinate volunteering, and send updates where you have asked
              for them.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Sharing
            </h2>
            <p>
              We do not sell, rent or trade personal information. We share it
              only with payment processors handling a donation you have made,
              and where the law requires it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Donations
            </h2>
            <p>
              Payments are processed by our payment gateway. We do not store card
              or bank details on our servers at any point.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Cookies
            </h2>
            <p>
              We use essential cookies to run the site and anonymous analytics to
              understand traffic. You can disable cookies in your browser.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Your Rights
            </h2>
            <p>
              Write to{" "}
              <a
                href="mailto:chairman@chishtyfoundation.org"
                className="text-dark-yellow underline font-medium hover:text-dark-green transition-colors"
              >
                chairman@chishtyfoundation.org
              </a>{" "}
              to ask for a copy of your data, correct it, or have it deleted. We
              will respond within 30 days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Retention
            </h2>
            <p>
              We keep enquiry and donation records only as long as needed for our
              records and any legal obligation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Children
            </h2>
            <p>
              The site is not directed at children under 13 and we do not
              knowingly collect their data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Changes
            </h2>
            <p>
              Any update is posted on this page with a revised effective date.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#F1E3D7]">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Contact
            </h2>
            <p>
              Chishty Foundation, Chishty Manzil Sufi Khanqah, Jhalra Street,
              Dargah Sharif, Ajmer Sharif 305001, Rajasthan, India —{" "}
              <a
                href="mailto:chairman@chishtyfoundation.org"
                className="text-dark-yellow underline font-medium hover:text-dark-green transition-colors"
              >
                chairman@chishtyfoundation.org
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
