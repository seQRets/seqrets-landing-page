import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import PageHead from "@/components/PageHead";
import { PreviewPage, rise } from "@/components/preview/PreviewChrome";
import { BLOG_POSTS, categoryLabels } from "@/lib/blog";

/* ------------------------------------------------------------------ *
 * /blog — ninth interior page moved onto the redesign.
 *
 * Chrome and theming come from PreviewPage; this file is content only.
 *
 * The hero photograph is dark and stays dark in both themes, so it is
 * built from the --deep-* tokens — the same fixed surface the landing
 * page's dark band and /features use.
 *
 * Per-category accent colours are gone, as on /features. They are fixed
 * mid-lightness hues from index.css that do not follow the theme. Here
 * they cost nothing to drop: every badge already prints its category
 * ("Security", "Technology", "Inheritance", "AI & Privacy"), so the
 * colour was duplicating a label the reader can simply read.
 *
 * Two Tailwind traps to avoid, both silent: an arbitrary box-shadow
 * wrapping a CSS var parses as a shadow COLOUR and computes to none, and
 * an opacity modifier on a var() colour computes to transparent.
 * ------------------------------------------------------------------ */

const BlogPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Parallax scroll effect */
  const onScroll = useCallback(() => {
    if (!heroRef.current || !bgRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const offset = -rect.top * 0.35;
    bgRef.current.style.transform = `translate3d(0,${offset}px,0)`;
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      onScroll();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onScroll]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <PreviewPage>
      <PageHead
        title="Learn"
        description="Insights on Bitcoin security, seed phrase protection, crypto inheritance, and open-source cryptography from the seQRets team."
        path="/blog"
      />

      {/* ── Hero — a fixed dark band in both themes ─────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[46vh] items-center justify-center overflow-hidden bg-[var(--deep)] md:min-h-[56vh]"
      >
        <div className="pointer-events-none absolute inset-x-0 -bottom-[20%] -top-[20%] will-change-transform">
          <img
            ref={bgRef}
            src="/blog_hero.webp"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(13,11,9,.62), rgba(13,11,9,.55) 45%, rgba(13,11,9,.96))",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl px-6 pt-12 text-center"
        >
          <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--deep-gold)]">
            Learn
          </p>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.1] tracking-[-0.035em] text-[var(--deep-ink)] sm:text-[46px] md:text-[54px]">
            Security &amp; sovereignty
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-[1.7] text-[var(--deep-ink2)]">
            Bitcoin security, crypto inheritance, open-source cryptography, and
            the tools that protect what matters most.
          </p>
        </motion.div>
      </section>

      {/* ── Posts ───────────────────────────────────────────── */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              {...rise}
              transition={{ ...rise.transition, delay: (i % 3) * 0.06 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-6 transition-colors hover:border-[var(--gold-line)] md:p-7"
              >
                <span className="inline-flex self-start rounded-full bg-[var(--gold-fill)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--gold)]">
                  {categoryLabels[post.category]}
                </span>

                <h2 className="mt-4 font-display text-[17px] font-bold leading-snug transition-colors group-hover:text-[var(--gold)]">
                  {post.title}
                </h2>

                <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-[var(--ink2)]">
                  {post.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4">
                  <div className="flex items-center gap-4 text-[12px] text-[var(--ink3)]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min read
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[var(--ink3)] transition-all group-hover:translate-x-1 group-hover:text-[var(--gold)]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PreviewPage>
  );
};

export default BlogPage;
