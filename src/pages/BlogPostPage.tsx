import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PageHead from "@/components/PageHead";
import { getPostBySlug, categoryLabels, type BlogCategory } from "@/lib/blog";

const categoryColors: Record<BlogCategory, { badge: string; text: string }> = {
  crypto: { badge: "bg-accent-crypto/15", text: "text-accent-crypto" },
  smart: { badge: "bg-accent-smart/15", text: "text-accent-smart" },
  inherit: { badge: "bg-accent-inherit/15", text: "text-accent-inherit" },
  ai: { badge: "bg-accent-ai/15", text: "text-accent-ai" },
};

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
      <div className="min-h-screen bg-background">
        <PageHead title="Post Not Found" description="" path="/blog" />
        <Navbar />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Post Not Found
            </h1>
            <p className="text-muted-foreground/70 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const colors = categoryColors[post.category];
  const paragraphs = post.content.split("\n\n");

  return (
    <div className="min-h-screen bg-background">
      <PageHead
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />
      <Navbar />

      <main>
        {/* Article header */}
        <section className="pt-28 md:pt-36 pb-8 md:pb-12">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Posts
            </Link>

            {/* Category badge */}
            <div className="mb-4">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${colors.badge} ${colors.text}`}
              >
                {categoryLabels[post.category]}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-5 text-sm text-muted-foreground/50">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} min read
              </span>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <div className="space-y-6">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg text-muted-foreground/80 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Post footer */}
            <div className="mt-16 pt-8 border-t border-border/15">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to all posts
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
