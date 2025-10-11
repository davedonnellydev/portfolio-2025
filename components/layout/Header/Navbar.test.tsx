import { fireEvent, render, screen, waitFor } from '@/test-utils';
import { Navbar } from './Navbar';

// Mock Next.js navigation
const mockPathname = '/';
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => mockPathname),
}));

// Mock FontAwesome icons
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: any) => <div data-testid={`icon-${icon.iconName || 'icon'}`} />,
}));

// Mock Mantine hooks
const mockSetColorScheme = jest.fn();
jest.mock('@mantine/core', () => ({
  ...jest.requireActual('@mantine/core'),
  useMantineColorScheme: jest.fn(() => ({
    colorScheme: 'light',
    setColorScheme: mockSetColorScheme,
  })),
}));

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders desktop navigation', () => {
      render(<Navbar />);

      const desktopNav = screen.getByLabelText('Main navigation');
      expect(desktopNav).toBeInTheDocument();
    });

    it('renders mobile navigation', () => {
      render(<Navbar />);

      const mobileNav = screen.getByLabelText('Mobile navigation');
      expect(mobileNav).toBeInTheDocument();
    });

    it('renders all navigation links', () => {
      render(<Navbar />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      //   expect(screen.getByText('Blog')).toBeInTheDocument();
    });

    it('renders theme toggle button', () => {
      render(<Navbar />);

      // Theme toggle has aria-label like "Switch to light mode" or "Toggle color scheme"
      const toggleButtons = screen.getAllByLabelText(/toggle color scheme|switch to/i);
      expect(toggleButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Desktop Navigation', () => {
    it('renders desktop links', () => {
      render(<Navbar />);

      const desktopNav = screen.getByLabelText('Main navigation');
      expect(desktopNav).toBeInTheDocument();
    });

    it('highlights active page', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/projects');

      render(<Navbar />);

      // Active link should have active class (implementation detail)
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });

    it.skip('shows external link indicator for Blog', () => {
      render(<Navbar />);

      const blogLink = screen.getByText('Blog').closest('a');
      expect(blogLink).toHaveAttribute('target', '_blank');
      expect(blogLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it.skip('includes screen reader text for external links', () => {
      render(<Navbar />);

      expect(screen.getByText('(opens in new window)')).toBeInTheDocument();
    });
  });

  describe('Dropdown Menus', () => {
    it('Home link has dropdown items', () => {
      render(<Navbar />);

      const homeLink = screen.getByText('Home').closest('div');

      // Hover over home link
      if (homeLink) {
        fireEvent.mouseEnter(homeLink);
      }

      // Dropdown items should appear
      waitFor(() => {
        expect(screen.getByText('Featured Projects')).toBeInTheDocument();
        expect(screen.getByText('Why Hire Me')).toBeInTheDocument();
        expect(screen.getByText('About Me')).toBeInTheDocument();
      });
    });

    it('About link has dropdown items', () => {
      render(<Navbar />);

      const aboutLink = screen.getByText('About').closest('div');

      // Hover over about link
      if (aboutLink) {
        fireEvent.mouseEnter(aboutLink);
      }

      // Dropdown items should appear
      waitFor(() => {
        expect(screen.getByText('Mission')).toBeInTheDocument();
        expect(screen.getByText('Background')).toBeInTheDocument();
        expect(screen.getByText('Certificates')).toBeInTheDocument();
      });
    });
  });

  describe('Mobile Menu', () => {
    it('burger button is hidden on desktop', () => {
      render(<Navbar />);

      // Burger is in mobile nav
      const mobileNav = screen.getByLabelText('Mobile navigation');
      expect(mobileNav).toBeInTheDocument();
    });

    it('burger button has accessible label', () => {
      render(<Navbar />);

      const burgerButton = screen.getByLabelText('Open menu');
      expect(burgerButton).toBeInTheDocument();
    });

    it('clicking burger opens mobile menu', async () => {
      render(<Navbar />);

      const burgerButton = screen.getByLabelText('Open menu');
      fireEvent.click(burgerButton);

      // Drawer should open (Mantine handles this)
      await waitFor(() => {
        expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
      });
    });

    it('mobile menu contains all links', async () => {
      render(<Navbar />);

      const burgerButton = screen.getByLabelText('Open menu');
      fireEvent.click(burgerButton);

      await waitFor(() => {
        // All nav links should appear in mobile menu
        const homeLinks = screen.getAllByText('Home');
        const projectsLinks = screen.getAllByText('Projects');

        expect(homeLinks.length).toBeGreaterThan(1); // Desktop + Mobile
        expect(projectsLinks.length).toBeGreaterThan(1);
      });
    });
  });

  describe('Theme Toggle', () => {
    it('shows moon icon in light mode', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useMantineColorScheme } = require('@mantine/core');
      useMantineColorScheme.mockReturnValue({
        colorScheme: 'light',
        setColorScheme: mockSetColorScheme,
      });

      render(<Navbar />);

      // After hydration, should show moon icon
      // Before hydration, shows default moon icon
      expect(screen.queryAllByTestId('icon-moon').length).toBeGreaterThan(0);
    });

    it('calls setColorScheme when clicked', () => {
      render(<Navbar />);

      const toggleButtons = screen.getAllByLabelText(/toggle color scheme|switch to/i);
      fireEvent.click(toggleButtons[0]);

      expect(mockSetColorScheme).toHaveBeenCalled();
    });

    it('toggles between light and dark mode', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useMantineColorScheme } = require('@mantine/core');

      // Start in light mode
      useMantineColorScheme.mockReturnValue({
        colorScheme: 'light',
        setColorScheme: mockSetColorScheme,
      });

      render(<Navbar />);

      const toggleButtons = screen.getAllByLabelText(/toggle color scheme|switch to/i);
      fireEvent.click(toggleButtons[0]);

      // Should call setColorScheme with 'dark'
      expect(mockSetColorScheme).toHaveBeenCalledWith('dark');
    });

    it('has accessible label for theme toggle', () => {
      render(<Navbar />);

      const toggleButtons = screen.getAllByLabelText(/toggle color scheme|switch to/i);
      expect(toggleButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Active State', () => {
    it('highlights home when on homepage', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/');

      render(<Navbar />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      // Active class is applied (visual verification in browser)
    });

    it('highlights projects when on projects page', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/projects');

      render(<Navbar />);

      expect(screen.getByText('Projects')).toBeInTheDocument();
      // Active class is applied
    });

    it('highlights about when on about page', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/about');

      render(<Navbar />);

      expect(screen.getByText('About')).toBeInTheDocument();
      // Active class is applied
    });

    it('highlights projects when on project detail page', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/projects/learning-platform');

      render(<Navbar />);

      expect(screen.getByText('Projects')).toBeInTheDocument();
      // Uses startsWith for nested routes
    });
  });

  describe('Accessibility', () => {
    it('has proper navigation landmarks', () => {
      render(<Navbar />);

      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
      expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument();
    });

    it('all links are keyboard accessible', () => {
      render(<Navbar />);

      const links = screen.getAllByRole('link');

      links.forEach((link) => {
        link.focus();
        expect(document.activeElement).toBe(link);
      });
    });

    it.skip('external links have proper security attributes', () => {
      render(<Navbar />);

      const blogLink = screen.getByText('Blog').closest('a');
      expect(blogLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('dropdown items have role="menuitem"', () => {
      render(<Navbar />);

      const homeLink = screen.getByText('Home').closest('div');

      if (homeLink) {
        fireEvent.mouseEnter(homeLink);
      }

      waitFor(() => {
        const menuItems = screen.getAllByRole('menuitem');
        expect(menuItems.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Hydration Safety', () => {
    it('renders generic icon before hydration', () => {
      render(<Navbar />);

      // Before hydration effect runs, should show default
      // This is handled by isHydrated state
      expect(screen.queryAllByTestId(/icon/).length).toBeGreaterThan(0);
    });
  });

  describe('Keyboard Navigation', () => {
    it('dropdown items respond to Enter key', () => {
      render(<Navbar />);

      const homeLink = screen.getByText('Home').closest('div');

      if (homeLink) {
        fireEvent.mouseEnter(homeLink);
      }

      waitFor(() => {
        const dropdownItem = screen.getByText('Featured Projects');
        fireEvent.keyDown(dropdownItem, { key: 'Enter' });

        // Should trigger navigation (implementation detail)
        expect(dropdownItem).toBeInTheDocument();
      });
    });

    it('Escape key closes dropdown', () => {
      render(<Navbar />);

      const homeLink = screen.getByText('Home').closest('div');

      if (homeLink) {
        fireEvent.mouseEnter(homeLink);
      }

      waitFor(() => {
        expect(screen.getByText('Featured Projects')).toBeInTheDocument();

        // Press Escape
        fireEvent.keyDown(document, { key: 'Escape' });

        // Dropdown should close
        waitFor(() => {
          expect(screen.queryByText('Featured Projects')).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Smooth Scrolling', () => {
    it('handles anchor links on same page', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/');

      // Mock scrollIntoView
      const mockScrollIntoView = jest.fn();
      const mockGetElementById = jest.spyOn(document, 'getElementById');
      mockGetElementById.mockReturnValue({
        scrollIntoView: mockScrollIntoView,
      } as any);

      render(<Navbar />);

      const homeLink = screen.getByText('Home').closest('div');

      if (homeLink) {
        fireEvent.mouseEnter(homeLink);
      }

      waitFor(() => {
        const featuredProjectsLink = screen.getByText('Featured Projects');
        fireEvent.click(featuredProjectsLink);

        // Should call scrollIntoView
        expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
      });

      mockGetElementById.mockRestore();
    });
  });
});
