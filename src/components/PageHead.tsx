import { Helmet } from "react-helmet-async";

interface PageHeadProps {
  title: string;
  description: string;
  path: string; // e.g. "/shop", "/security"
}

/**
 * Per-page meta tags for main (non-docs) pages.
 * Overrides the defaults in index.html so social shares
 * show the correct title/description for each route.
 */
const PageHead = ({ title, description, path }: PageHeadProps) => {
  const fullTitle = `${title} | seQRets`;
  const url = `https://seqrets.app${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default PageHead;
