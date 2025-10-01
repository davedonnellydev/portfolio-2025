'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { faArrowUpRightFromSquare } from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Group, Text } from '@mantine/core';
import classes from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: 'https://blog.davedonnelly.dev', label: 'Blog', external: true },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <Group gap="xl">
        {navLinks.map((link) => {
          const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

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
                />
              </Group>
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={`${classes.link} ${isActive ? classes.active : ''}`}
            >
              <Text size="sm" fw={500}>
                {link.label}
              </Text>
            </Link>
          );
        })}
      </Group>
    </nav>
  );
}
