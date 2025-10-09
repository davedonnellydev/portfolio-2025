'use client';

import { useEffect, useState } from 'react';
import { faChevronDown, faListTree } from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Menu, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import styles from './TableOfContents.module.css';

export interface TOCSection {
  id: string;
  label: string;
  icon?: any;
}

interface TableOfContentsProps {
  sections: TOCSection[];
  isSticky?: boolean;
}

export function TableOfContents({ sections, isSticky = false }: TableOfContentsProps) {
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isVerySmall = useMediaQuery('(max-width: 480px)');

  // Close menu when sticky state changes to force repositioning
  useEffect(() => {
    if (opened) {
      setOpened(false);
    }
  }, [isSticky]);

  const handleSectionClick = (sectionId: string) => {
    setOpened(false);
    const element = document.getElementById(sectionId);
    if (element) {
      // Account for sticky nav bar and potentially visible header
      const headerOffset = 150; // Increased to account for both navbar and header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Adjust position and width based on screen size
  const menuPosition = isMobile ? 'bottom-start' : 'bottom-end';
  const menuWidth = isVerySmall ? 'calc(100vw - 2rem)' : isMobile ? 240 : 280;

  return (
    <div className={styles.tocContainer}>
      <Menu
        key={`toc-menu-${isSticky ? 'sticky' : 'normal'}`}
        opened={opened}
        onChange={setOpened}
        position={menuPosition}
        offset={12}
        width={menuWidth}
        shadow="lg"
        transitionProps={{ transition: 'pop-top-right' }}
        trigger={isMobile ? 'click' : 'hover'}
        openDelay={100}
        closeDelay={200}
        withinPortal
        zIndex={1001}
        keepMounted={false}
        middlewares={{
          flip: true,
          shift: { padding: 16 },
        }}
        portalProps={{
          target: typeof document !== 'undefined' ? document.body : undefined,
        }}
      >
        <Menu.Target>
          <Button
            variant="light"
            color="primary"
            size="sm"
            leftSection={<FontAwesomeIcon icon={faListTree} />}
            className={styles.tocButton}
          >
            <FontAwesomeIcon icon={faChevronDown} className={styles.chevron} />
          </Button>
        </Menu.Target>

        <Menu.Dropdown className={styles.dropdown}>
          <Menu.Label className={styles.dropdownLabel}>Jump to section</Menu.Label>
          {sections.map((section) => (
            <Menu.Item
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={styles.menuItem}
              leftSection={
                section.icon && (
                  <FontAwesomeIcon icon={section.icon} className={styles.sectionIcon} />
                )
              }
            >
              <Text size="sm">{section.label}</Text>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
