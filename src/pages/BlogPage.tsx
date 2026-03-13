import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PageHead from "@/components/PageHead";
import { BLOG_POSTS, categoryLabels, type BlogCategory } from "@/lib/blog";

const categoryColors: Record<BlogCategory, { badge: string; text: string }> = {
  crypto: { badge: "bg-accent-crypto/15", text: "text-accent-crypto" },
  smart: { badge: "bg-accent-smart/15", text: "text-accent-smart" },
  inherit: { badge: "bg-accent-inherit/15", text: "text-accent-inherit" },
  ai: { badge: "bg-accent-ai/15", text: "text-accent-ai" },
};

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
    <div className="min-h-screen bg-background">
      <PageHead
        title="Blog"
        description="Insights on Bitcoin security, seed phrase protection, crypto inheritance, and open-source cryptography from the seQRets team."
        path="/blog"
      />
      <Navbar />

      <main>
        {/* Hero */}
        <section
          ref={heroRef}
          className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 -top-[20%] -bottom-[20%] pointer-events-none will-change-transform">
            <img
              ref={bgRef}
              src="/blog_hero.webp"
              alt=""
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          </div>

          <div className="relative container mx-auto px-4 md:px-8 text-center pt-16">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-gradient-silver mb-5">
              Blog
            </p>
            <h1 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight">
              Thoughts on{" "}
              <span className="text-gradient">Security & Sovereignty</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Bitcoin security, crypto inheritance, open-source cryptography, and
              the tools that protect what matters most.
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {BLOG_POSTS.map((post) => {
                const colors = categoryColors[post.category];
                return (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-xl border border-border/20 bg-card/30 overflow-hidden transition-all hover:border-border/40 hover:bg-card/50"
                  >
                    <div className="flex-1 p-6 md:p-8 flex flex-col">
                      {/* Category + meta */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${colors.badge} ${colors.text}`}
                        >
                          {categoryLabels[post.category]}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-gradient transition-all leading-snug">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground/70 leading-relaxed flex-1">
                        {post.excerpt}
                      </p>

                      {/* Footer meta */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/10">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground/50">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3" />
                            {post.readTime} min read
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-all group-hover:text-primary group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
