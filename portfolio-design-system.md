# TechCraft Portfolio Design System

## 🎨 Design Philosophy
A modern, energetic design system that balances professionalism with creative tech/gaming aesthetics. The system emphasizes clarity, performance, and subtle interactive elements that demonstrate technical capability without overwhelming the content.

---

## 🎯 Core Principles
1. **Clean First, Fun Second** - Professional clarity with personality touches
2. **Performance Focused** - Smooth animations, optimized interactions
3. **Accessible** - WCAG AA compliant with proper contrast ratios
4. **Responsive** - Mobile-first approach with fluid typography
5. **Subtle Gamification** - Achievement badges, progress bars, skill trees

---

## 🌈 Color Palette

### Primary Colors
```css
--primary-500: #6366F1;  /* Indigo - Main brand color */
--primary-400: #818CF8;  /* Lighter for hover states */
--primary-600: #4F46E5;  /* Darker for active states */
```

### Accent Colors
```css
--accent-cyan: #06B6D4;     /* Cyan - CTAs, highlights */
--accent-purple: #A855F7;   /* Purple - Creative elements */
--accent-emerald: #10B981;  /* Emerald - Success states */
--accent-amber: #F59E0B;    /* Amber - Warnings, attention */
```

### Neutral Colors
```css
--neutral-50: #FAFAFA;   /* Off-white backgrounds */
--neutral-100: #F4F4F5;  /* Light gray backgrounds */
--neutral-200: #E4E4E7;  /* Borders, dividers */
--neutral-300: #D4D4D8;  /* Disabled states */
--neutral-400: #A1A1AA;  /* Placeholder text */
--neutral-500: #71717A;  /* Secondary text */
--neutral-600: #52525B;  /* Body text */
--neutral-700: #3F3F46;  /* Headings */
--neutral-800: #27272A;  /* Dark backgrounds */
--neutral-900: #18181B;  /* Darkest elements */
```

### Gradient Combinations
```css
--gradient-primary: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);
--gradient-accent: linear-gradient(135deg, #06B6D4 0%, #10B981 100%);
--gradient-glow: linear-gradient(135deg, #F59E0B 0%, #EC4899 100%);
--gradient-dark: linear-gradient(135deg, #27272A 0%, #18181B 100%);
```

---

## 📝 Typography

### Font Stack
```css
--font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
```

### Type Scale (Fluid Typography)
```css
--text-xs: clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.3vw, 1rem);
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
--text-3xl: clamp(2rem, 1.5rem + 2vw, 3rem);
--text-4xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);
```

### Font Weights
```css
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## 🧩 Component Styles

### Buttons

#### Primary Button
```tsx
// Primary Button Component
const PrimaryButton = ({ children, onClick, size = 'md' }) => {
  return (
    <button
      onClick={onClick}
      className="
        relative px-6 py-3
        bg-gradient-to-r from-primary-500 to-primary-600
        text-white font-semibold rounded-lg
        transform transition-all duration-200
        hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25
        active:scale-95
        before:absolute before:inset-0 before:rounded-lg
        before:bg-white before:opacity-0 before:transition-opacity
        hover:before:opacity-10
        group overflow-hidden
      "
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
    </button>
  );
};
```

#### Ghost Button
```tsx
const GhostButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        px-6 py-3
        border-2 border-neutral-200 dark:border-neutral-700
        text-neutral-700 dark:text-neutral-300
        font-semibold rounded-lg
        transition-all duration-200
        hover:border-primary-500 hover:text-primary-500
        hover:shadow-md hover:shadow-primary-500/10
        active:scale-95
      "
    >
      {children}
    </button>
  );
};
```

### Cards

#### Project Card
```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  imageUrl,
  githubUrl,
  liveUrl
}) => {
  return (
    <div className="
      group relative
      bg-white dark:bg-neutral-800
      rounded-xl overflow-hidden
      border border-neutral-200 dark:border-neutral-700
      transition-all duration-300
      hover:shadow-2xl hover:shadow-primary-500/10
      hover:scale-[1.02]
    ">
      {/* Image Container with Overlay */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-500/10 to-accent-cyan/10">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {githubUrl && (
            <a href={githubUrl} className="p-2 bg-black/70 backdrop-blur-sm rounded-lg hover:bg-black/90 transition-colors">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
              </svg>
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} className="p-2 bg-primary-500/90 backdrop-blur-sm rounded-lg hover:bg-primary-600 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="
                px-3 py-1 text-xs font-medium
                bg-gradient-to-r from-primary-500/10 to-accent-cyan/10
                text-primary-600 dark:text-primary-400
                rounded-full border border-primary-500/20
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
```

### Navigation

#### Modern Nav Bar
```tsx
const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`
      fixed top-0 w-full z-50 transition-all duration-300
      ${isScrolled
        ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg shadow-lg'
        : 'bg-transparent'
      }
    `}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-cyan rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">JD</span>
            </div>
            <span className="font-bold text-xl text-neutral-800 dark:text-white">
              DevName
            </span>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="
                  relative text-neutral-600 dark:text-neutral-300
                  font-medium transition-colors hover:text-primary-500
                  after:absolute after:bottom-0 after:left-0 after:w-0
                  after:h-0.5 after:bg-primary-500 after:transition-all
                  hover:after:w-full
                "
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button className="
            px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-cyan
            text-white font-semibold rounded-lg
            transition-all duration-200 hover:shadow-lg hover:scale-105
          ">
            Download CV
          </button>
        </div>
      </div>
    </nav>
  );
};
```

### Skills Section with Gaming Elements

#### Skill Bar Component
```tsx
interface SkillBarProps {
  skill: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, level, icon, color }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="group relative">
      <div className="flex items-center mb-2">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mr-3`}>
          {icon}
        </div>
        <span className="font-semibold text-neutral-700 dark:text-neutral-300">
          {skill}
        </span>
        <span className="ml-auto text-sm text-neutral-500 dark:text-neutral-400">
          Lv. {level}
        </span>
      </div>

      {/* XP Bar */}
      <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
          style={{
            width: animated ? `${level}%` : '0%',
            transitionDelay: '200ms'
          }}
        >
          {/* Animated Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
        </div>
      </div>

      {/* Hover Tooltip */}
      <div className="
        absolute -top-12 left-1/2 transform -translate-x-1/2
        px-3 py-1 bg-neutral-800 text-white text-xs rounded-lg
        opacity-0 group-hover:opacity-100 transition-opacity
        pointer-events-none whitespace-nowrap
      ">
        {level}/100 XP
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-neutral-800 rotate-45" />
      </div>
    </div>
  );
};
```

### Hero Section

```tsx
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-cyan/10">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="mb-6">
          <span className="
            inline-block px-4 py-2
            bg-gradient-to-r from-primary-500/10 to-accent-cyan/10
            border border-primary-500/20 rounded-full
            text-primary-600 dark:text-primary-400 font-medium text-sm
            animate-pulse
          ">
            🚀 Available for hire
          </span>
        </div>

        <h1 className="
          text-5xl md:text-7xl font-bold mb-6
          bg-gradient-to-r from-primary-500 via-accent-purple to-accent-cyan
          bg-clip-text text-transparent
          animate-gradient bg-[length:200%_auto]
        ">
          Hi, I'm Jane Doe
        </h1>

        <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
          A passionate <span className="text-primary-500 font-semibold">Full-Stack Developer</span> crafting
          exceptional digital experiences with modern web technologies
        </p>

        <div className="flex gap-4 justify-center">
          <PrimaryButton>View Projects</PrimaryButton>
          <GhostButton>Download Resume</GhostButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
```

---

## 🎮 Interactive Elements

### Achievement Badges
```tsx
interface AchievementProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

const AchievementBadge: React.FC<AchievementProps> = ({
  title,
  description,
  icon,
  unlocked
}) => {
  return (
    <div className={`
      relative p-4 rounded-xl border-2 transition-all duration-300
      ${unlocked
        ? 'border-amber-500 bg-gradient-to-br from-amber-500/10 to-orange-500/10'
        : 'border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 opacity-50'
      }
    `}>
      <div className="flex items-center space-x-3">
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center
          ${unlocked
            ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white'
            : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500'
          }
        `}>
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-neutral-800 dark:text-white">
            {title}
          </h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </div>
      {unlocked && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};
```

---

## 🎯 Animations & Utilities

### CSS Animations
```css
/* globals.css */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-shine {
  animation: shine 3s ease-in-out infinite;
}

.animate-gradient {
  animation: gradient 3s ease infinite;
}
```

### Tailwind Config Extensions
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
        },
        accent: {
          cyan: '#06B6D4',
          purple: '#A855F7',
          emerald: '#10B981',
          amber: '#F59E0B',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shine': 'shine 3s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
};
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 1024px;  /* Large devices */
--breakpoint-xl: 1280px;  /* Extra large devices */
--breakpoint-2xl: 1536px; /* 2X large devices */
```

---

## 🌟 Usage Tips

1. **Performance**: Use `transform` and `opacity` for animations instead of layout properties
2. **Accessibility**: Ensure all interactive elements have proper focus states and ARIA labels
3. **Dark Mode**: Implement with CSS variables or Tailwind's dark mode classes
4. **Loading States**: Add skeleton screens and progressive loading for better UX
5. **Micro-interactions**: Add subtle hover effects and transitions to enhance engagement

---

## 🚀 Quick Start Implementation

```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">
        {children}
      </body>
    </html>
  );
}
```

This design system provides a solid foundation for a modern, engaging portfolio that stands out while maintaining professional appeal. The tech/gaming elements are subtle enough to add personality without overwhelming the content, perfect for impressing hiring managers at major tech companies.