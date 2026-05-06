// Dev-only showcase — all review section variants
// Remove this page before shipping to production (delete app/dev/ folder)

import ReviewsMarquee        from "@/components/reviews/ReviewsMarquee";
import ReviewsCarousel       from "@/components/reviews/ReviewsCarousel";
import ReviewsGrid           from "@/components/reviews/ReviewsGrid";
import ReviewsHorizontal     from "@/components/reviews/ReviewsHorizontal";
import ReviewsMirrorDiagonal from "@/components/reviews/ReviewsMirrorDiagonal";
import ReviewsBento          from "@/components/reviews/ReviewsBento";
import ReviewsFocus          from "@/components/reviews/ReviewsFocus";

function Block({ label, file, children }: { label: string; file: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 flex-wrap px-6" style={{ maxWidth: 960, margin: "0 auto", width: "100%" }}>
        <h2 className="text-lg font-semibold" style={{ color: "var(--text-heading)" }}>{label}</h2>
        <code className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "var(--bg-soft)", color: "var(--accent)" }}>
          {file}
        </code>
      </div>
      <div className="overflow-hidden rounded-xl border mx-6" style={{ borderColor: "var(--border)" }}>
        {children}
      </div>
    </div>
  );
}

export default function ReviewsShowcasePage() {
  return (
    <main className="min-h-screen py-20" style={{ backgroundColor: "var(--bg-base)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        <div className="mb-16">
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--text-muted)" }}>Dev preview</p>
          <h1 className="text-4xl font-bold mb-3" style={{ color: "var(--text-heading)" }}>Review Sections</h1>
          <p className="text-base" style={{ color: "var(--text-body)" }}>
            7 variants — import whichever one fits the page.
            Each file has its own <code className="text-sm px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--bg-soft)", color: "var(--accent)" }}>const c</code> config at the top for colours and a <code className="text-sm px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--bg-soft)", color: "var(--accent)" }}>reviewsData</code> array for copy.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-20">

        <Block label="Marquee — diagonal vertical scroll, editorial title left" file="ReviewsMarquee.tsx">
          <ReviewsMarquee />
        </Block>

        <Block label="Mirror Diagonal — reverse diagonal, scrolls down, editorial title right" file="ReviewsMirrorDiagonal.tsx">
          <ReviewsMirrorDiagonal />
        </Block>

        <Block label="Bento — asymmetric grid, featured card + stats strip" file="ReviewsBento.tsx">
          <ReviewsBento />
        </Block>

        <Block label="Focus — auto-cycling featured review, sidebar name list" file="ReviewsFocus.tsx">
          <ReviewsFocus />
        </Block>

        <Block label="Carousel — Swiper autoplay, scale on inactive" file="ReviewsCarousel.tsx">
          <ReviewsCarousel />
        </Block>

        <Block label="Grid — responsive auto-fill, stagger on scroll" file="ReviewsGrid.tsx">
          <ReviewsGrid />
        </Block>

        <Block label="Horizontal — 2-row infinite scroll, pauses on hover" file="ReviewsHorizontal.tsx">
          <ReviewsHorizontal />
        </Block>

      </div>

      <p className="mt-20 text-xs text-center" style={{ color: "var(--text-faint)" }}>
        Delete <code>app/dev/</code> before shipping to production.
      </p>
    </main>
  );
}
