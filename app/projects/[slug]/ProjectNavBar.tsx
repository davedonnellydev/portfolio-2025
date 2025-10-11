'use client';

import { useEffect, useState } from 'react';
import { faGithub } from '@awesome.me/kit-7f37d33478/icons/classic/brands';
import { faArrowUpRightFromSquare } from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Group } from '@mantine/core';
import { Project } from '@/data/projects';
import { useHeaderVisibility } from '@/lib/hooks';
import { BackToProjectsButton } from './BackToProjectsButton';
import { TableOfContents, TOCSection } from './TableOfContents';
import styles from './ProjectNavBar.module.css';

interface ProjectNavBarProps {
  sections: TOCSection[];
  links: Project['links'];
}

export function ProjectNavBar({ sections, links }: ProjectNavBarProps) {
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
    <>
      {/* Placeholder to prevent CLS when navbar becomes fixed */}
      {isSticky && <div className={styles.navBarPlaceholder} />}

      <div
        className={`${styles.navBarWrapper} ${isSticky ? styles.sticky : ''} ${
          shouldPositionBelowHeader ? styles.belowHeader : ''
        }`}
      >
        <Container size="lg" className={styles.navBarContainer}>
          <div className={styles.navBar}>
            <div className={styles.navBarInner}>
              <BackToProjectsButton />

              {/* Project Links in the Middle */}
              {(links.live || links.repo) && (
                <Group gap="xs" className={styles.projectLinks}>
                  {links.live && (
                    <Button
                      component="a"
                      href={links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="light"
                      color="primary"
                      size="sm"
                      rightSection={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                      className={styles.projectLinkButton}
                    >
                      Live site
                    </Button>
                  )}
                  {links.repo && (
                    <Button
                      component="a"
                      href={links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="light"
                      color="primary"
                      size="sm"
                      leftSection={<FontAwesomeIcon icon={faGithub} />}
                      className={styles.projectLinkButton}
                    >
                      Repo
                    </Button>
                  )}
                </Group>
              )}

              <TableOfContents sections={sections} isSticky={isSticky} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
