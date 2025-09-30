'use client';

import { useEffect, useState } from 'react';
import { useScrollDirection } from './useScrollDirection';

/**
 * Hook to manage header visibility based on scroll behavior
 * @param hideDelay - Milliseconds to wait before auto-hiding header
 * @returns Object with visibility state and mouse enter/leave handlers
 */
export function useHeaderVisibility(hideDelay: number = 3000) {
  const scrollDirection = useScrollDirection();
  const [isVisible, setIsVisible] = useState(true);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Always show header at top of page
      if (scrollY < 50) {
        setIsVisible(true);
        // Clear any pending hide timeout when at top
        setHideTimeout((prevTimeout) => {
          if (prevTimeout) {
            clearTimeout(prevTimeout);
          }
          return null;
        });
        return;
      }

      // Show on scroll up, hide on scroll down
      if (scrollDirection === 'up') {
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
      } else if (scrollDirection === 'down') {
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

    // Set timeout to hide after mouse leaves
    if (window.scrollY >= 50) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);
      setHideTimeout((prevTimeout) => {
        if (prevTimeout) {
          clearTimeout(prevTimeout);
        }
        return timeout;
      });
    }
  };

  return {
    isVisible,
    handleMouseEnter,
    handleMouseLeave,
  };
}
