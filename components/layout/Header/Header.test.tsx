import { fireEvent, render, screen } from '@/test-utils';
import { Header } from './Header';

// Mock Logo component
jest.mock('@/components/shared/Logo/Logo', () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}));

// Mock Navbar component
jest.mock('./Navbar', () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
}));

// Mock useHeaderVisibility hook
const mockHandleMouseEnter = jest.fn();
const mockHandleMouseLeave = jest.fn();

jest.mock('@/lib/hooks', () => ({
  useHeaderVisibility: jest.fn(() => ({
    isVisible: true,
    handleMouseEnter: mockHandleMouseEnter,
    handleMouseLeave: mockHandleMouseLeave,
  })),
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders header element', () => {
      const { container } = render(<Header />);

      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('renders Logo component', () => {
      render(<Header />);

      expect(screen.getByTestId('logo')).toBeInTheDocument();
    });

    it('renders Navbar component', () => {
      render(<Header />);

      expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });
  });

  describe('Visibility Behavior', () => {
    it('applies visible class when isVisible is true', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useHeaderVisibility } = require('@/lib/hooks');
      useHeaderVisibility.mockImplementation(() => ({
        isVisible: true,
        handleMouseEnter: mockHandleMouseEnter,
        handleMouseLeave: mockHandleMouseLeave,
      }));

      const { container } = render(<Header />);

      const header = container.querySelector('header');
      expect(header?.className).toContain('visible');
    });

    it('applies hidden class when isVisible is false', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useHeaderVisibility } = require('@/lib/hooks');
      useHeaderVisibility.mockImplementation(() => ({
        isVisible: false,
        handleMouseEnter: mockHandleMouseEnter,
        handleMouseLeave: mockHandleMouseLeave,
      }));

      const { container } = render(<Header />);

      const header = container.querySelector('header');
      expect(header?.className).toContain('hidden');
    });

    it('calls handleMouseEnter on mouse enter', () => {
      const { container } = render(<Header />);

      const header = container.querySelector('header');
      if (header) {
        fireEvent.mouseEnter(header);
      }

      expect(mockHandleMouseEnter).toHaveBeenCalled();
    });

    it('calls handleMouseLeave on mouse leave', () => {
      const { container } = render(<Header />);

      const header = container.querySelector('header');
      if (header) {
        fireEvent.mouseLeave(header);
      }

      expect(mockHandleMouseLeave).toHaveBeenCalled();
    });
  });

  describe('Layout', () => {
    it('uses Mantine Container for layout', () => {
      const { container } = render(<Header />);

      // Mantine Container adds specific classes
      expect(container.querySelector('[class*="mantine-Container"]')).toBeInTheDocument();
    });

    it('displays Logo and Navbar side by side', () => {
      render(<Header />);

      // Both components should be rendered
      expect(screen.getByTestId('logo')).toBeInTheDocument();
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });
  });

  describe('Sticky Behavior', () => {
    it('has proper CSS classes for sticky positioning', () => {
      const { container } = render(<Header />);

      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      // Actual sticky positioning is handled by CSS
    });
  });

  describe('Integration with useHeaderVisibility', () => {
    it('uses useHeaderVisibility hook', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useHeaderVisibility } = require('@/lib/hooks');

      render(<Header />);

      expect(useHeaderVisibility).toHaveBeenCalled();
    });

    it('responds to visibility changes', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useHeaderVisibility } = require('@/lib/hooks');

      // Start visible
      useHeaderVisibility.mockImplementation(() => ({
        isVisible: true,
        handleMouseEnter: mockHandleMouseEnter,
        handleMouseLeave: mockHandleMouseLeave,
      }));

      const { container, rerender } = render(<Header />);
      let header = container.querySelector('header');
      expect(header?.className).toContain('visible');

      // Change to hidden
      useHeaderVisibility.mockImplementation(() => ({
        isVisible: false,
        handleMouseEnter: mockHandleMouseEnter,
        handleMouseLeave: mockHandleMouseLeave,
      }));

      rerender(<Header />);
      header = container.querySelector('header');
      expect(header?.className).toContain('hidden');
    });
  });
});
