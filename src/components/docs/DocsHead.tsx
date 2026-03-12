import { Helmet } from "react-helmet-async";

interface DocsHeadProps {
  title: string;
  description: string;
  path: string; // e.g. "/docs/technical"
  jsonLd?: object | object[];
}

const DocsHead = ({ title, description, path, jsonLd }: DocsHeadProps) => {
  const fullTitle = `${title} | seQRets Docs`;
  const url = `https://seqrets.app${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="seQRets" />
      <link rel="canonical" href={url} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(
            Array.isArray(jsonLd)
              ? jsonLd.map((item) => ({ "@context": "https://schema.org", ...item }))
              : { "@context": "https://schema.org", ...jsonLd },
          )}
        </script>
      )}
    </Helmet>
  );
};

export default DocsHead;
