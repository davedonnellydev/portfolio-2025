import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * Default OG Image Generation
 *
 * Generates a branded Open Graph image for the portfolio homepage and pages
 * without specific OG images. Uses Node.js runtime for font loading support
 * and automatic CDN caching.
 *
 * Access at: /api/og
 * Preview at: https://your-domain.com/api/og
 */
export async function GET(request: NextRequest) {
  try {
    // Get optional query parameters for customization
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Dave Donnelly';
    const subtitle = searchParams.get('subtitle') || 'Web Developer';

    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#0A0A0B',
            padding: '80px',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {/* Gradient background accent */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15), transparent 50%)',
              opacity: 0.8,
            }}
          />

          {/* Content container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              zIndex: 1,
            }}
          >
            {/* Main title */}
            <div
              style={{
                fontSize: '72px',
                fontWeight: 700,
                color: '#FAFAFA',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </div>

            {/* Subtitle/role */}
            <div
              style={{
                fontSize: '40px',
                fontWeight: 600,
                color: '#A3A5F3',
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </div>

            {/* Tagline */}
            <div
              style={{
                fontSize: '28px',
                color: '#D4D4D8',
                lineHeight: 1.4,
                marginTop: '12px',
                maxWidth: '900px',
              }}
            >
              Building accessible, performant web applications with modern JavaScript
            </div>
          </div>

          {/* Brand mark / accent element */}
          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              right: '80px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                color: '#71717A',
                fontWeight: 500,
              }}
            >
              davedonnelly.dev
            </div>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#6366F1',
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );

    // Add cache headers for CDN caching (7 days)
    imageResponse.headers.set(
      'Cache-Control',
      'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400'
    );

    return imageResponse;
  } catch (error) {
    console.error('Error generating OG image:', error);

    // Fallback to simple text-based image if font loading fails
    const fallbackResponse = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0A0A0B',
            color: '#FAFAFA',
            fontSize: '60px',
            fontWeight: 700,
          }}
        >
          <div>Dave Donnelly</div>
          <div style={{ fontSize: '36px', color: '#A3A5F3', marginTop: '20px' }}>
            Web Developer
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );

    fallbackResponse.headers.set(
      'Cache-Control',
      'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400'
    );

    return fallbackResponse;
  }
}
