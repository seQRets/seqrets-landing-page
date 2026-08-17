import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import PageHead from "@/components/PageHead";
import { PreviewPage } from "@/components/preview/PreviewChrome";
import { getPostBySlug, categoryLabels } from "@/lib/blog";

/* ------------------------------------------------------------------ *
 * /blog/:slug — tenth interior page moved onto the redesign.
 *
 * One template for all 25 posts; the prose itself lives in blog.ts and
 * is not touched here. Content is still split on a blank line and every
 * piece rendered as a paragraph, exactly as before — the posts carry no
 * headings or other structure for a richer renderer to pick up.
 *
 * Chrome and theming come from PreviewPage. The category badge follows
 * /blog and /features in dropping the per-category accent colour: those
 * are fixed mid-lightness hues from index.css that ignore the theme, and
 * the badge already prints the category in words.
 *
 * Two Tailwind traps to avoid, both silent: an arbitrary box-shadow
 * wrapping a CSS var parses as a shadow COLOUR and computes to none, and
 * an opacity modifier on a var() colour computes to transparent.
 * ------------------------------------------------------------------ */

const backLink =
  "inline-flex items-center gap-2 text-[14px] text-[var(--ink3)] transition-colors hover:text-[var(--ink)]";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (!post) {
    return (
      <PreviewPage>
        <PageHead title="Post Not Found" description="" path="/blog" />
        <section className="px-6 pb-24 pt-20 text-center md:pt-28">
          <h1 className="font-display text-[32px] font-bold tracking-[-0.03em] md:text-[40px]">
            Post not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-[1.7] text-[var(--ink2)]">
            The blog post you&rsquo;re looking for doesn&rsquo;t exist.
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--gold)] px-6 py-3.5 font-display text-[14px] font-semibold text-[var(--gold-ink)] transition-transform hover:scale-[1.02]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to the blog
          </Link>
        </section>
      </PreviewPage>
    );
  }

  const paragraphs = post.content.split("\n\n");

  return (
    <PreviewPage>
      <PageHead
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />

      {/* ── Article header ──────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-10 pt-14 md:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[380px] w-[46%] opacity-[.55]"
          style={{
            background:
              "radial-gradient(60% 55% at 70% 30%, var(--goldsoft), transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-[42rem]"
        >
          <Link to="/blog" className={backLink}>
            <ArrowLeft className="h-3.5 w-3.5" />
            All posts
          </Link>

          {/*
            The badge sits in its own block: a vertical margin on the
            inline-flex span itself would grow the line box instead of
            spacing it off the back link above.
          */}
          <div className="mt-8">
            <span className="inline-flex rounded-full bg-[var(--gold-fill)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--gold)]">
              {categoryLabels[post.category]}
            </span>
          </div>

          <h1 className="mt-4 font-display text-[28px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[34px] md:text-[40px]">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-[13px] text-[var(--ink3)]">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} min read
            </span>
          </div>
        </motion.div>
      </section>

      {/* ── Article body ────────────────────────────────────── */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-[42rem]">
          <div className="space-y-6 border-t border-[var(--line)] pt-10">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[16.5px] leading-[1.8] text-[var(--ink)] md:text-[17.5px]"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-14 border-t border-[var(--line)] pt-8">
            <Link to="/blog" className={backLink}>
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to all posts
            </Link>
          </div>
        </div>
      </section>
    </PreviewPage>
  );
};

export default BlogPostPage;
