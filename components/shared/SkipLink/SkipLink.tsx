'use client';

import classes from './SkipLink.module.css';

export function SkipLink() {
  return (
    <a href="#main-content" className={classes.skipLink}>
      Skip to main content
    </a>
  );
}
