'use client';

import { useEffect, useState } from 'react';
import { useScrollDirection } from './useScrollDirection';

/**
 * Hook to manage footer visibility based on scroll behavior
 * @param hideDelay - Milliseconds to wait before auto-hiding footer
 * @returns Object with visibility state and mouse enter/leave handlers
 */
export function useFooterVisibility(hideDelay: number = 3000) {
  const scrollDirection = useScrollDirection();
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if user is at the bottom of the page
      const atBottom = scrollY + windowHeight >= documentHeight - 10; // 10px threshold
      setIsAtBottom(atBottom);

      // Always show footer at bottom of page
      if (atBottom) {
        setIsVisible(true);
        // Clear any pending hide timeout when at bottom
        setHideTimeout((prevTimeout) => {
          if (prevTimeout) {
            clearTimeout(prevTimeout);
          }
          return null;
        });
        return;
      }

      // Show on scroll down, hide on scroll up
      if (scrollDirection === 'down') {
        setIsVisible(true);

        // Set timeout to auto-hide if mouse not inside
        if (!isMouseInside) {
          setHideTimeout((prevTimeout) => {
            if (prevTimeout) {
              clearTimeout(prevTimeout);
            }
            const timeout = setTimeout(() => {
              if (!isMouseInside) {
                setIsVisible(false);
              }
            }, hideDelay);
            return timeout;
          });
        }
      } else if (scrollDirection === 'up') {
        setIsVisible(false);
        // Clear any pending hide timeout when hiding
        setHideTimeout((prevTimeout) => {
          if (prevTimeout) {
            clearTimeout(prevTimeout);
          }
          return null;
        });
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDirection, isMouseInside, hideDelay]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  const handleMouseEnter = () => {
    setIsMouseInside(true);
    setIsVisible(true);
    setHideTimeout((prevTimeout) => {
      if (prevTimeout) {
        clearTimeout(prevTimeout);
      }
      return null;
    });
  };

  const handleMouseLeave = () => {
    setIsMouseInside(false);

    // Don't auto-hide if at bottom of page
    if (isAtBottom) {
      return;
    }

    // Set timeout to hide after mouse leaves
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
    setHideTimeout((prevTimeout) => {
      if (prevTimeout) {
        clearTimeout(prevTimeout);
      }
      return timeout;
    });
  };

  return {
    isVisible,
    handleMouseEnter,
    handleMouseLeave,
  };
}
