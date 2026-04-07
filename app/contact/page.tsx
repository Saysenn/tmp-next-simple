import ContactForm from "@/components/forms/ContactForm";
import SubscribeForm from "@/components/forms/SubscribeForm";

export default function Contact() {
  return (
    <main>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="section-hero relative flex items-center justify-center">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            Get in touch
          </p>
          <h1 style={{ color: "var(--text-heading)" }}>
            Contact Us
          </h1>
          <p className="text-lg mt-2" style={{ color: "var(--text-muted)" }}>
            Whether you have an enquiry or want to stay updated, we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ── General enquiry ────────────────────────────────────── */}
      <section id="enquiry" className="section-light py-24 px-4">
        <div className="max-w-xl mx-auto">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "var(--section-accent)" }}
          >
            General enquiry
          </p>
          <h2 className="mb-2" style={{ color: "var(--section-heading)" }}>
            Send us a message
          </h2>
          <p className="mb-10" style={{ color: "var(--section-muted)" }}>
            Have a question or want to work with us? Fill in the form and we&apos;ll be in touch shortly.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* ── Stay updated ───────────────────────────────────────── */}
      <section id="subscribe" className="section-dark py-24 px-4">
        <div className="max-w-xl mx-auto">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "var(--section-accent)" }}
          >
            Stay updated
          </p>
          <h2 className="mb-2" style={{ color: "var(--section-heading)" }}>
            Join our mailing list
          </h2>
          <p className="mb-10" style={{ color: "var(--section-muted)" }}>
            Be the first to hear about news, opportunities, and updates from our team.
          </p>
          <SubscribeForm />
        </div>
      </section>

    </main>
  );
}
