'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  faArrowUpRightFromSquare,
  faChevronDown,
  faMoon,
  faSunBright,
} from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ActionIcon,
  Burger,
  Divider,
  Drawer,
  Group,
  Stack,
  Text,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
  dropdown?: DropdownItem[];
}

const navLinks: NavLink[] = [
  {
    href: '/',
    label: 'Home',
    dropdown: [
      { label: 'Featured Projects', href: '/#featured-projects' },
      { label: 'Why Hire Me', href: '/#why-hire-me' },
      { label: 'About Me', href: '/#micro-bio' },
    ],
  },
  { href: '/projects', label: 'Projects' },
  {
    href: '/about',
    label: 'About',
    dropdown: [
      { label: 'Mission', href: '/about#mission' },
      { label: 'Background', href: '/about#background' },
      { label: 'Certificates', href: '/about#certificates' },
    ],
  },
  { href: 'https://blog.davedonnelly.dev', label: 'Blog', external: true },
];

export function Navbar() {
  const pathname = usePathname();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [isHydrated, setIsHydrated] = useState(false);
  const [mobileMenuOpen, { close, toggle }] = useDisclosure(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Prevent hydration mismatch by only showing dynamic content after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    close();
    setExpandedMobileItem(null);
  }, [pathname, close]);

  // Handle escape key to close desktop dropdowns
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  const isDark = colorScheme === 'dark';

  const handleMouseEnter = (href: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(href);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute('href');
    if (target) {
      if (target.startsWith('/#')) {
        // Same page scroll
        if (pathname === '/') {
          const id = target.substring(2);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          // Navigate to home then scroll
          window.location.href = target;
        }
      } else if (target.includes('#')) {
        // Different page with anchor
        window.location.href = target;
      }
    }
    setOpenDropdown(null);
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (href.startsWith('/#')) {
        // Same page scroll
        if (pathname === '/') {
          const id = href.substring(2);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          // Navigate to home then scroll
          window.location.href = href;
        }
      } else if (href.includes('#')) {
        // Different page with anchor
        window.location.href = href;
      }
      setOpenDropdown(null);
    }
  };

  const handleMobileDropdownClick = (href: string) => {
    if (href.startsWith('/#')) {
      // Same page scroll
      if (pathname === '/') {
        const id = href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home then scroll
        window.location.href = href;
      }
    } else if (href.includes('#')) {
      // Different page with anchor
      window.location.href = href;
    }
    close();
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={classes.desktopNav} aria-label="Main navigation">
        <Group gap="md">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            const hasDropdown = link.dropdown && link.dropdown.length > 0;

            return link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                <Group gap="xs">
                  <Text size="sm" fw={500}>
                    {link.label}
                  </Text>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    style={{ width: '12px', height: '12px' }}
                    aria-hidden="true"
                  />
                </Group>
                <span className="sr-only">(opens in new window)</span>
              </a>
            ) : (
              <div
                key={link.href}
                className={classes.navItem}
                onMouseEnter={() => hasDropdown && handleMouseEnter(link.href)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={link.href}
                  className={`${classes.link} ${classes.pill} ${isActive ? classes.active : ''}`}
                >
                  <Group gap={4}>
                    <Text size="sm" fw={500}>
                      {link.label}
                    </Text>
                    {hasDropdown && (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`${classes.chevron} ${openDropdown === link.href ? classes.chevronOpen : ''}`}
                        style={{ width: '10px', height: '10px' }}
                      />
                    )}
                  </Group>
                </Link>

                {/* Dropdown Menu */}
                {hasDropdown && openDropdown === link.href && (
                  <div className={classes.dropdown} role="menu">
                    {link.dropdown!.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={handleDropdownClick}
                        onKeyDown={(e) => handleDropdownKeyDown(e, item.href)}
                        className={classes.dropdownItem}
                        role="menuitem"
                        tabIndex={0}
                      >
                        <Text size="sm">{item.label}</Text>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Tooltip
            label={
              isHydrated
                ? isDark
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
                : 'Toggle color scheme'
            }
            position="bottom"
            withArrow
            zIndex={1003}
          >
            <ActionIcon
              onClick={toggleColorScheme}
              variant="subtle"
              size="lg"
              aria-label={
                isHydrated
                  ? isDark
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
                  : 'Toggle color scheme'
              }
              className={classes.colorSchemeToggle}
            >
              {isHydrated ? (
                <FontAwesomeIcon
                  icon={isDark ? faSunBright : faMoon}
                  style={{ width: '18px', height: '18px' }}
                />
              ) : (
                <FontAwesomeIcon icon={faMoon} style={{ width: '18px', height: '18px' }} />
              )}
            </ActionIcon>
          </Tooltip>
        </Group>
      </nav>

      {/* Mobile Navigation */}
      <nav className={classes.mobileNav} aria-label="Mobile navigation">
        <Group gap="sm">
          <Tooltip label="Toggle color scheme" position="bottom" withArrow zIndex={1003}>
            <ActionIcon
              onClick={toggleColorScheme}
              variant="subtle"
              size="lg"
              aria-label={
                isHydrated
                  ? isDark
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
                  : 'Toggle color scheme'
              }
              className={classes.colorSchemeToggle}
            >
              {isHydrated ? (
                <FontAwesomeIcon
                  icon={isDark ? faSunBright : faMoon}
                  style={{ width: '18px', height: '18px' }}
                />
              ) : (
                <FontAwesomeIcon icon={faMoon} style={{ width: '18px', height: '18px' }} />
              )}
            </ActionIcon>
          </Tooltip>

          <Burger
            opened={mobileMenuOpen}
            onClick={toggle}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            size="md"
            className={classes.burger}
          />
        </Group>
      </nav>

      {/* Mobile Menu Drawer */}
      <Drawer
        opened={mobileMenuOpen}
        onClose={close}
        position="right"
        size="100%"
        padding="xl"
        className={classes.drawer}
        classNames={{
          content: classes.drawerContent,
          body: classes.drawerBody,
        }}
        withCloseButton={false}
        trapFocus
        lockScroll
      >
        <Stack gap="md" className={classes.mobileMenuContent}>
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            const hasDropdown = link.dropdown && link.dropdown.length > 0;
            const isExpanded = expandedMobileItem === link.href;

            return link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.mobileMenuItem}
                onClick={close}
              >
                <Group gap="xs" justify="space-between" style={{ width: '100%' }}>
                  <Text size="xl" fw={500}>
                    {link.label}
                  </Text>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    style={{ width: '16px', height: '16px' }}
                  />
                </Group>
              </a>
            ) : (
              <div key={link.href}>
                <div
                  className={`${classes.mobileMenuItem} ${isActive ? classes.mobileMenuItemActive : ''}`}
                >
                  {hasDropdown ? (
                    <button
                      type="button"
                      onClick={() => setExpandedMobileItem(isExpanded ? null : link.href)}
                      className={classes.mobileMenuButton}
                      aria-expanded={isExpanded}
                    >
                      <Text size="xl" fw={500}>
                        {link.label}
                      </Text>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`${classes.mobileChevron} ${isExpanded ? classes.mobileChevronOpen : ''}`}
                        style={{ width: '14px', height: '14px' }}
                      />
                    </button>
                  ) : (
                    <Link href={link.href} onClick={close} className={classes.mobileMenuLink}>
                      <Text size="xl" fw={500}>
                        {link.label}
                      </Text>
                    </Link>
                  )}
                </div>

                {/* Mobile Dropdown */}
                {hasDropdown && isExpanded && (
                  <Stack gap="xs" className={classes.mobileDropdown}>
                    {link.dropdown!.map((item) => (
                      <button
                        type="button"
                        key={item.href}
                        onClick={() => handleMobileDropdownClick(item.href)}
                        className={classes.mobileDropdownItem}
                      >
                        <Text size="lg">{item.label}</Text>
                      </button>
                    ))}
                  </Stack>
                )}
              </div>
            );
          })}

          <Divider my="md" />

          {/* Additional mobile menu items if needed */}
          <Text size="xs" c="gray.7" ta="center">
            © {new Date().getFullYear()} Dave Donnelly
          </Text>
        </Stack>
      </Drawer>
    </>
  );
}
