import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { projects } from '@/data/projects';

export const runtime = 'edge';

/**
 * Dynamic Project OG Image Generation
 *
 * Generates custom Open Graph images for each project page with:
 * - Project title
 * - Outcome metric
 * - Tech stack badges
 * - Branded styling
 *
 * Access at: /api/og/project/[slug]
 * Example: /api/og/project/learning-platform
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Find the project
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
      // Return a generic "Project Not Found" image
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0A0A0B',
              color: '#FAFAFA',
              fontSize: '48px',
            }}
          >
            Project Not Found
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // Limit tech stack to first 5 items for display
    const displayTechStack = project.techStack.slice(0, 5);
    const hasMoreTech = project.techStack.length > 5;

    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0A0A0B',
            padding: '60px 80px',
            fontFamily: 'Inter, system-ui, sans-serif',
            position: 'relative',
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

          {/* Header - Author name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: '24px',
                color: '#D4D4D8',
                fontWeight: 500,
              }}
            >
              Dave Donnelly
            </div>
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: '#71717A',
              }}
            />
            <div
              style={{
                fontSize: '24px',
                color: '#71717A',
                fontWeight: 500,
              }}
            >
              Case Study
            </div>
          </div>

          {/* Main content area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              flex: 1,
              zIndex: 1,
            }}
          >
            {/* Project title */}
            <div
              style={{
                fontSize: '64px',
                fontWeight: 700,
                color: '#FAFAFA',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                maxWidth: '1000px',
              }}
            >
              {project.title}
            </div>

            {/* Outcome metric - highlighted */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '4px',
                  height: '48px',
                  backgroundColor: '#6366F1',
                  borderRadius: '2px',
                }}
              />
              <div
                style={{
                  fontSize: '28px',
                  color: '#A3A5F3',
                  lineHeight: 1.4,
                  fontWeight: 600,
                  maxWidth: '900px',
                }}
              >
                {project.outcome}
              </div>
            </div>

            {/* Tech stack badges */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginTop: 'auto',
              }}
            >
              {displayTechStack.map((tech) => (
                <div
                  key={tech}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 20px',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(163, 165, 243, 0.2)',
                    borderRadius: '6px',
                    fontSize: '20px',
                    color: '#C5C7F7',
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </div>
              ))}
              {hasMoreTech && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 20px',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(163, 165, 243, 0.2)',
                    borderRadius: '6px',
                    fontSize: '20px',
                    color: '#71717A',
                    fontWeight: 500,
                  }}
                >
                  +{project.techStack.length - 5} more
                </div>
              )}
            </div>
          </div>

          {/* Footer - domain */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: '40px',
              gap: '16px',
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: '22px',
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
    console.error('Error generating project OG image:', error);

    // Fallback image
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
            fontSize: '48px',
            fontWeight: 700,
          }}
        >
          <div>Dave Donnelly</div>
          <div style={{ fontSize: '32px', color: '#A3A5F3', marginTop: '20px' }}>Project</div>
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
