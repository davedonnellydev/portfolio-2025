import { Container } from '@mantine/core';
import styles from './ProjectNavBar.module.css';

/**
 * Server-rendered skeleton that matches ProjectNavBar dimensions
 * Prevents CLS by reserving space before client hydration
 */
export function ProjectNavBarSkeleton() {
  return (
    <div className={styles.navBarWrapper}>
      <Container size="lg" className={styles.navBarContainer}>
        <div className={styles.navBar}>
          <div className={styles.navBarInner}>
            {/* Invisible placeholder content matching actual navbar structure */}
            <div style={{ width: '140px', height: '36px' }} /> {/* BackToProjectsButton */}
            <div style={{ flex: 1 }} /> {/* Spacer */}
            <div style={{ width: '120px', height: '36px' }} /> {/* TableOfContents */}
          </div>
        </div>
      </Container>
    </div>
  );
}
