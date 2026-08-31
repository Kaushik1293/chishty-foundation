import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Chishty Foundation",
  description: "Terms and Conditions for Chishty Foundation (chishtyfoundation.org).",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF8] pt-36 pb-24 font-satoshi">
      <div className="container mx-auto px-5 md:px-8 max-w-4xl">
        <div className="mb-12 text-center md:text-left">
          <span className="font-satoshi text-xs tracking-[0.2em] font-semibold text-dark-yellow uppercase">
            Legal
          </span>
          <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-green mt-2 mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-dark-green/60 text-sm">
            Effective date: <span className="italic">[to be set at launch]</span>
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F1E3D7] shadow-sm space-y-8 text-dark-green/85 text-base sm:text-lg leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Using This Site
            </h2>
            <p>
              By browsing{" "}
              <strong className="text-dark-green">chishtyfoundation.org</strong>{" "}
              you accept these terms. If you do not accept them, please do not
              use the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Our Content
            </h2>
            <p>
              All text, photographs, logos and design on this site belong to
              Chishty Foundation unless stated otherwise, and may not be
              reproduced commercially without written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Donations
            </h2>
            <p>
              Donations are voluntary and are applied to the Foundation&apos;s
              charitable programmes. Because funds are committed to service work
              on receipt, donations are generally non-refundable; if you have
              made an error, write to us within 7 days and we will consider the
              matter.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Tax Exemption
            </h2>
            <p>
              <span className="italic">
                [Insert 80G registration number and validity, or pending confirmation].
              </span>{" "}
              No tax benefit should be assumed unless a valid receipt has been
              issued.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Accuracy
            </h2>
            <p>
              We work to keep the site accurate and current, but we do not warrant
              that every detail, date or figure is free of error. Event dates that
              depend on the lunar calendar are indicative.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              External Links
            </h2>
            <p>
              Links to other sites are provided for convenience. We are not
              responsible for their content or their privacy practices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Volunteering
            </h2>
            <p>
              Volunteer applications are subject to selection and to the
              Foundation&apos;s own guidelines. Submitting a form does not create
              an entitlement or an employment relationship.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Limitation
            </h2>
            <p>
              To the extent permitted by law, we are not liable for indirect or
              consequential loss arising from use of this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Governing Law
            </h2>
            <p>
              These terms are governed by the laws of India, with jurisdiction in
              the courts of Ajmer, Rajasthan.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#F1E3D7]">
            <h2 className="font-cormorant text-2xl font-bold text-dark-green">
              Contact
            </h2>
            <p>
              For any questions regarding these terms, write to:{" "}
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
