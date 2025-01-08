import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'video.movie',
  publishedAt,
  duration,
  tags = []
}) => {
  const siteName = 'X Videos BR';
  const fullTitle = title ? `${title} - ${siteName}` : siteName;
  const defaultDescription = 'Assista aos melhores vídeos';
  const defaultImage = '/default-thumb.jpg';

  const safeDescription = description || defaultDescription;
  const safeImage = image || defaultImage;
  const safeUrl = url || window.location.href;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={safeDescription} />
      <link rel="canonical" href={safeUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:image" content={safeImage} />
      <meta property="og:url" content={safeUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={safeImage} />

      {/* Video specific meta tags */}
      {publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {duration && (
        <meta property="video:duration" content={duration} />
      )}

      {/* Keywords from tags */}
      {tags.length > 0 && (
        <meta name="keywords" content={tags.join(', ')} />
      )}

      {/* Structured Data / Schema.org */}
      {title && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: title,
            description: safeDescription,
            thumbnailUrl: safeImage,
            uploadDate: publishedAt,
            duration: duration,
            url: safeUrl,
            ...(tags.length > 0 && { keywords: tags.join(', ') })
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO; 