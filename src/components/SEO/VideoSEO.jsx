import { Helmet } from 'react-helmet-async';
import { formatViews, timeAgo } from '../../utils/format';

const VideoSEO = ({ video }) => {
  const siteName = 'XPornHot BR';
  const fullTitle = `${video.title} - ${siteName}`;
  const videoUrl = window.location.href;
  const duration = video.duration || '0:00';
  const views = formatViews(video.views);
  const uploadDate = video.added;
  const thumbnailUrl = video.thumb.src;
  const thumbnailSelected = video.thumb_selected;

  // Gera descrição rica para SEO
  const description = `Assista ${video.title} gratuitamente em HD. Este vídeo já tem ${views} visualizações e foi adicionado ${timeAgo(uploadDate)}. Conteúdo adulto de qualidade e sem propagandas.`;

  // Gera tags baseadas no título e categorias
  const generateTags = () => {
    const titleWords = video.title
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 3)
      .slice(0, 10);

    const commonTags = [
      'videos adultos',
      'porno brasileiro',
      'videos porno gratis',
      'conteudo nacional',
      'porno hd'
    ];

    return [...new Set([...titleWords, ...commonTags])];
  };

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={generateTags().join(', ')} />
      <link rel="canonical" href={videoUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="video.other" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={videoUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={thumbnailUrl} />
      <meta property="og:image:width" content={video.thumb.width} />
      <meta property="og:image:height" content={video.thumb.height} />
      <meta property="og:video" content={video.embed} />
      <meta property="og:video:type" content="text/html" />
      <meta property="og:video:width" content="1280" />
      <meta property="og:video:height" content="720" />

      {/* Twitter */}
      <meta name="twitter:card" content="player" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={thumbnailUrl} />
      <meta name="twitter:player" content={video.embed} />
      <meta name="twitter:player:width" content="1280" />
      <meta name="twitter:player:height" content="720" />

      {/* Video Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: video.title,
          description: description,
          uploadDate: uploadDate,
          thumbnailUrl: [thumbnailUrl, thumbnailSelected],
          contentUrl: video.embed,
          embedUrl: video.embed,
          duration: duration,
          interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: { '@type': 'WatchAction' },
            userInteractionCount: video.views
          },
          potentialAction: {
            '@type': 'WatchAction',
            target: videoUrl
          },
          publisher: {
            '@type': 'Organization',
            name: siteName,
            logo: {
              '@type': 'ImageObject',
              url: 'https://xpornhot.com.br/logo.png'
            }
          },
          isFamilyFriendly: false,
          contentRating: 'adult',
          genre: 'adult',
          keywords: generateTags().join(','),
          thumbnail: {
            '@type': 'ImageObject',
            contentUrl: thumbnailUrl,
            width: video.thumb.width,
            height: video.thumb.height
          },
          video: {
            '@type': 'VideoObject',
            contentUrl: video.embed,
            description: description,
            duration: duration,
            thumbnailUrl: thumbnailUrl,
            uploadDate: uploadDate,
            name: video.title
          }
        })}
      </script>

      {/* Video Sitemap Tags */}
      <meta name="video:duration" content={duration} />
      <meta name="video:release_date" content={uploadDate} />
      <meta name="video:tag" content={generateTags().join(',')} />
      <meta name="video:category" content="adult" />
      <meta name="video:family_friendly" content="false" />
      <meta name="video:requires_subscription" content="false" />
      <meta name="video:live" content="false" />

      {/* Image SEO */}
      <meta name="image" content={thumbnailUrl} />
      <meta itemprop="image" content={thumbnailUrl} />
      <meta name="thumbnail" content={thumbnailUrl} />
      
      {/* Additional Video Meta */}
      <meta name="video_title" content={video.title} />
      <meta name="video_description" content={description} />
      <meta name="video:duration" content={duration} />
      <meta name="video:views" content={video.views} />
      <meta name="video:quality" content="HD" />
    </Helmet>
  );
};

export default VideoSEO; 