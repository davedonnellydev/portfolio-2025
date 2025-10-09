import Link from 'next/link';
import classes from './Logo.module.css';

export function Logo() {
  return (
    <Link href="/" className={classes.logo} aria-label="Dave Donnelly - Home">
      <strong>DD</strong>
    </Link>
  );
}
