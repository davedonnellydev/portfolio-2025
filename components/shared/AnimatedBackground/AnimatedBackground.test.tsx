import { render } from '@/test-utils';
import { AnimatedBackground } from './AnimatedBackground';

// Mock Mantine color scheme hook
jest.mock('@mantine/core', () => ({
  ...jest.requireActual('@mantine/core'),
  useMantineColorScheme: jest.fn(() => ({
    colorScheme: 'light',
    setColorScheme: jest.fn(),
  })),
}));

describe('AnimatedBackground', () => {
  // Mock canvas context
  let mockGetContext: jest.Mock;
  let mockClearRect: jest.Mock;
  let mockBeginPath: jest.Mock;
  let mockArc: jest.Mock;
  let mockFill: jest.Mock;

  beforeEach(() => {
    // Mock canvas 2D context
    mockClearRect = jest.fn();
    mockBeginPath = jest.fn();
    mockArc = jest.fn();
    mockFill = jest.fn();

    mockGetContext = jest.fn(() => ({
      clearRect: mockClearRect,
      beginPath: mockBeginPath,
      arc: mockArc,
      fill: mockFill,
      fillStyle: '',
    }));

    // Mock HTMLCanvasElement
    HTMLCanvasElement.prototype.getContext = mockGetContext as any;

    // Mock window.matchMedia for reduced motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Mock requestAnimationFrame to not execute callback (prevent infinite loop)
    global.requestAnimationFrame = jest.fn(() => 1);

    // Mock cancelAnimationFrame
    global.cancelAnimationFrame = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders a canvas element', () => {
      render(<AnimatedBackground />);

      const canvas = document.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('has aria-hidden="true" for accessibility', () => {
      render(<AnimatedBackground />);

      const canvas = document.querySelector('canvas');
      expect(canvas).toHaveAttribute('aria-hidden', 'true');
    });

    it('gets 2D rendering context', () => {
      render(<AnimatedBackground />);

      expect(mockGetContext).toHaveBeenCalledWith('2d');
    });
  });

  describe('Canvas Setup', () => {
    it('sets canvas width to window width', () => {
      // Mock window dimensions
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(<AnimatedBackground />);

      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      expect(canvas.width).toBe(1024);
    });

    it('sets canvas height to window height', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(<AnimatedBackground />);

      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      expect(canvas.height).toBe(768);
    });
  });

  describe('Animation', () => {
    it('starts animation on mount', () => {
      render(<AnimatedBackground />);

      expect(global.requestAnimationFrame).toHaveBeenCalled();
    });

    it('clears canvas during animation', () => {
      render(<AnimatedBackground />);

      expect(mockClearRect).toHaveBeenCalled();
    });

    it('draws dots during animation', () => {
      render(<AnimatedBackground />);

      // Should create dots and draw them
      expect(mockBeginPath).toHaveBeenCalled();
      expect(mockArc).toHaveBeenCalled();
      expect(mockFill).toHaveBeenCalled();
    });
  });

  describe('Props', () => {
    it('accepts custom dot spacing', () => {
      const { container } = render(<AnimatedBackground dotSpacing={50} />);
      expect(container).toBeInTheDocument();
    });

    it('accepts custom dot radius', () => {
      const { container } = render(<AnimatedBackground dotRadius={3} />);
      expect(container).toBeInTheDocument();
    });

    it('accepts custom cloud speed', () => {
      const { container } = render(<AnimatedBackground cloudSpeed={5} />);
      expect(container).toBeInTheDocument();
    });

    it('accepts custom cloud count', () => {
      const { container } = render(<AnimatedBackground cloudCount={3} />);
      expect(container).toBeInTheDocument();
    });

    it('accepts mouse attraction enabled', () => {
      const { container } = render(<AnimatedBackground mouseAttraction />);
      expect(container).toBeInTheDocument();
    });

    it('accepts custom mouse attraction strength', () => {
      const { container } = render(
        <AnimatedBackground mouseAttraction mouseAttractionStrength={0.001} />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Reduced Motion', () => {
    it('respects prefers-reduced-motion preference', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<AnimatedBackground />);

      // Animation should still start but with reduced motion behavior
      expect(global.requestAnimationFrame).toHaveBeenCalled();
    });
  });

  describe('Cleanup', () => {
    it('cancels animation frame on unmount', () => {
      const { unmount } = render(<AnimatedBackground />);

      unmount();

      expect(global.cancelAnimationFrame).toHaveBeenCalled();
    });

    it('removes resize event listener on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const { unmount } = render(<AnimatedBackground />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });

    it('removes mouse event listener on unmount when mouseAttraction is enabled', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const { unmount } = render(<AnimatedBackground mouseAttraction />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Mouse Attraction', () => {
    it('adds mousemove listener when mouseAttraction is enabled', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

      render(<AnimatedBackground mouseAttraction />);

      expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

      addEventListenerSpy.mockRestore();
    });

    it('does not add mousemove listener when mouseAttraction is disabled', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

      render(<AnimatedBackground mouseAttraction={false} />);

      // Should have resize listener but not mousemove
      const mouseMoveCalls = addEventListenerSpy.mock.calls.filter(
        (call) => call[0] === 'mousemove'
      );
      expect(mouseMoveCalls).toHaveLength(0);

      addEventListenerSpy.mockRestore();
    });
  });

  describe('Window Resize', () => {
    it('adds resize event listener on mount', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

      render(<AnimatedBackground />);

      expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

      addEventListenerSpy.mockRestore();
    });
  });

  describe('Dark Mode Support', () => {
    it('adapts to dark color scheme', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useMantineColorScheme } = require('@mantine/core');
      useMantineColorScheme.mockImplementation(() => ({
        colorScheme: 'dark',
        setColorScheme: jest.fn(),
      }));

      render(<AnimatedBackground />);

      // Component should render without errors in dark mode
      expect(document.querySelector('canvas')).toBeInTheDocument();
    });

    it('adapts to light color scheme', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useMantineColorScheme } = require('@mantine/core');
      useMantineColorScheme.mockImplementation(() => ({
        colorScheme: 'light',
        setColorScheme: jest.fn(),
      }));

      render(<AnimatedBackground />);

      // Component should render without errors in light mode
      expect(document.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles missing canvas context gracefully', () => {
      // Mock getContext to return null
      HTMLCanvasElement.prototype.getContext = jest.fn(() => null) as any;

      // Should not throw error
      expect(() => {
        render(<AnimatedBackground />);
      }).not.toThrow();
    });

    it('handles zero cloud count', () => {
      const { container } = render(<AnimatedBackground cloudCount={0} />);
      expect(container).toBeInTheDocument();
    });

    it('handles very small canvas', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 100,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 100,
      });

      const { container } = render(<AnimatedBackground />);
      expect(container).toBeInTheDocument();
    });
  });
});
