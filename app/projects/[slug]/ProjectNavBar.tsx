'use client';

import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { useHeaderVisibility } from '@/lib/hooks';
import { BackToProjectsButton } from './BackToProjectsButton';
import { TableOfContents, TOCSection } from './TableOfContents';
import styles from './ProjectNavBar.module.css';

interface ProjectNavBarProps {
  sections: TOCSection[];
}

export function ProjectNavBar({ sections }: ProjectNavBarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { isVisible: isHeaderVisible } = useHeaderVisibility();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Get the hero section height (approximately where we want to stick)
      // We'll stick after scrolling past 400px (hero image + some content)
      const scrollThreshold = 400;
      setIsSticky(currentScrollY > scrollThreshold);
    };

    // Initialize on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we should show below header
  const shouldPositionBelowHeader = isSticky && isHeaderVisible && scrollY > 50;

  return (
    <div
      className={`${styles.navBarWrapper} ${isSticky ? styles.sticky : ''} ${
        shouldPositionBelowHeader ? styles.belowHeader : ''
      }`}
    >
      <Container size="lg" className={styles.navBarContainer}>
        <div className={styles.navBar}>
          <BackToProjectsButton />
          <TableOfContents sections={sections} isSticky={isSticky} />
        </div>
      </Container>
    </div>
  );
}
