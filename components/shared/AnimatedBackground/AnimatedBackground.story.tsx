import { AnimatedBackground } from './AnimatedBackground';

export default {
  title: 'Shared/AnimatedBackground',
  component: AnimatedBackground,
};

export const Default = () => (
  <div style={{ position: 'relative', height: '600px', border: '1px solid #ccc' }}>
    <AnimatedBackground />
    <div style={{ position: 'relative', zIndex: 1, padding: '40px', textAlign: 'center' }}>
      <h1>Default Animation</h1>
      <p>2 clouds, 30px dot spacing, speed 3</p>
    </div>
  </div>
);

export const HighSpeed = () => (
  <div style={{ position: 'relative', height: '600px', border: '1px solid #ccc' }}>
    <AnimatedBackground cloudSpeed={8} />
    <div style={{ position: 'relative', zIndex: 1, padding: '40px', textAlign: 'center' }}>
      <h1>High Speed</h1>
      <p>Clouds move faster (speed 8)</p>
    </div>
  </div>
);

export const LowSpeed = () => (
  <div style={{ position: 'relative', height: '600px', border: '1px solid #ccc' }}>
    <AnimatedBackground cloudSpeed={1} />
    <div style={{ position: 'relative', zIndex: 1, padding: '40px', textAlign: 'center' }}>
      <h1>Low Speed</h1>
      <p>Clouds move slowly (speed 1)</p>
    </div>
  </div>
);

export const ManyClouds = () => (
  <div style={{ position: 'relative', height: '600px', border: '1px solid #ccc' }}>
    <AnimatedBackground cloudCount={4} />
    <div style={{ position: 'relative', zIndex: 1, padding: '40px', textAlign: 'center' }}>
      <h1>Many Clouds</h1>
      <p>4 clouds for more color</p>
    </div>
  </div>
);

export const SingleCloud = () => (
  <div style={{ position: 'relative', height: '600px', border: '1px solid #ccc' }}>
    <AnimatedBackground cloudCount={1} />
    <div style={{ position: 'relative', zIndex: 1, padding: '40px', textAlign: 'center' }}>
      <h1>Single Cloud</h1>
      <p>Minimal, subdued effect</p>
    </div>
  </div>
);

export const LargerDots = () => (
  <div style={{ position: 'relative', height: '600px', border: '1px solid #ccc' }}>
    <AnimatedBackground dotRadius={3} dotSpacing={40} />
    <div style={{ position: 'relative', zIndex: 1, padding: '40px', textAlign: 'center' }}>
      <h1>Larger Dots</h1>
      <p>Bigger dots with more spacing</p>
    </div>
  </div>
);

export const SmallerDots = () => (
  <div style={{ position: 'relative', height: '600px', border: '1px solid #ccc' }}>
    <AnimatedBackground dotRadius={1} dotSpacing={20} />
    <div style={{ position: 'relative', zIndex: 1, padding: '40px', textAlign: 'center' }}>
      <h1>Smaller Dots</h1>
      <p>Tiny dots with less spacing</p>
    </div>
  </div>
);

export const MouseAttraction = () => (
  <div style={{ position: 'relative', height: '600px', border: '1px solid #ccc' }}>
    <AnimatedBackground mouseAttraction />
    <div style={{ position: 'relative', zIndex: 1, padding: '40px', textAlign: 'center' }}>
      <h1>Mouse Attraction</h1>
      <p>Move your mouse around - clouds follow!</p>
    </div>
  </div>
);

export const StrongMouseAttraction = () => (
  <div style={{ position: 'relative', height: '600px', border: '1px solid #ccc' }}>
    <AnimatedBackground mouseAttraction mouseAttractionStrength={0.002} />
    <div style={{ position: 'relative', zIndex: 1, padding: '40px', textAlign: 'center' }}>
      <h1>Strong Mouse Attraction</h1>
      <p>Clouds follow mouse more aggressively</p>
    </div>
  </div>
);

export const WithContent = () => (
  <div style={{ position: 'relative', height: '800px', border: '1px solid #ccc' }}>
    <AnimatedBackground />
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '60px 40px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: '48px', marginBottom: '24px' }}>Animated Background</h1>
      <p style={{ fontSize: '20px', marginBottom: '24px' }}>
        This component creates a beautiful animated background using canvas. The dots change color
        as colored "clouds" pass over them.
      </p>
      <p style={{ fontSize: '20px', marginBottom: '24px' }}>
        It's perfect for hero sections, landing pages, or any area where you want to add visual
        interest without distracting from the content.
      </p>
      <button
        type="button"
        style={{
          padding: '16px 32px',
          fontSize: '18px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Get Started
      </button>
    </div>
  </div>
);

export const Energetic = () => (
  <div style={{ position: 'relative', height: '600px', border: '1px solid #ccc' }}>
    <AnimatedBackground cloudCount={3} cloudSpeed={6} dotSpacing={25} mouseAttraction />
    <div style={{ position: 'relative', zIndex: 1, padding: '40px', textAlign: 'center' }}>
      <h1>Energetic</h1>
      <p>More clouds, faster speed, interactive</p>
    </div>
  </div>
);

export const Subtle = () => (
  <div style={{ position: 'relative', height: '600px', border: '1px solid #ccc' }}>
    <AnimatedBackground cloudCount={1} cloudSpeed={1.5} dotSpacing={40} />
    <div style={{ position: 'relative', zIndex: 1, padding: '40px', textAlign: 'center' }}>
      <h1>Subtle</h1>
      <p>Minimal, calm effect for text-heavy pages</p>
    </div>
  </div>
);

export const FullScreen = () => (
  <div style={{ position: 'fixed', inset: 0 }}>
    <AnimatedBackground />
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '40px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ fontSize: '64px', marginBottom: '24px' }}>Full Screen</h1>
      <p style={{ fontSize: '24px' }}>Background fills entire viewport</p>
    </div>
  </div>
);
