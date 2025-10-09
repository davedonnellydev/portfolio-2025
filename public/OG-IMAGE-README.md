# Open Graph Image

## Current Status

An SVG template has been created at `og-image.svg` with the portfolio branding.

## Required: Convert to PNG

Social media platforms (Twitter, LinkedIn, Facebook) require OG images in PNG or JPG format, not SVG.

### Option 1: Online Conversion (Easiest)
1. Visit https://cloudconvert.com/svg-to-png
2. Upload `og-image.svg`
3. Set dimensions to 1200×630 pixels
4. Download as `og-image.png`
5. Place in `/public/` directory

### Option 2: Using Figma (Best Quality)
1. Open Figma
2. Create new file with 1200×630px frame
3. Open `og-image.svg` in the frame
4. Export as PNG at 2x resolution (2400×1260)
5. Save as `og-image.png` in `/public/` directory

### Option 3: Command Line (macOS with ImageMagick)
```bash
brew install imagemagick
convert -density 300 -resize 1200x630 og-image.svg og-image.png
```

### Option 4: Command Line (Using rsvg-convert)
```bash
brew install librsvg
rsvg-convert -w 1200 -h 630 og-image.svg > og-image.png
```

## Specifications

- **Dimensions**: 1200×630 pixels (required)
- **Format**: PNG (recommended) or JPG
- **File size**: < 1MB (recommended)
- **Aspect ratio**: 1.91:1

## Testing

After creating `og-image.png`, test social media previews:

1. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

## Custom OG Image

To create a custom design instead of using the template:

1. Use design tools (Figma, Canva, etc.)
2. Follow specifications above
3. Include:
   - Your name
   - Role/title
   - Key tech stack or value proposition
   - Website URL (optional)
   - Brand colors (Primary: #6366F1)

## Automation

For automated generation in CI/CD (future enhancement):
```bash
npm install -D @vercel/og
```

Then create API route: `/app/api/og/route.tsx` with dynamic OG image generation.
