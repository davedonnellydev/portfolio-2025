'use client';

import { Container, Group } from '@mantine/core';
import { useHeaderVisibility } from '@/lib/hooks';
import { Logo } from '@/components/shared/Logo/Logo';
import { Navbar } from './Navbar';
import classes from './Header.module.css';

export function Header() {
  const { isVisible, handleMouseEnter, handleMouseLeave } = useHeaderVisibility();

  return (
    <header
      className={`${classes.header} ${isVisible ? classes.visible : classes.hidden}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Container size="xl">
        <Group justify="space-between" align="center">
          <Logo />
          <Navbar />
        </Group>
      </Container>
    </header>
  );
}