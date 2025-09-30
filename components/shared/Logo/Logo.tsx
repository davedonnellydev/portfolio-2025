import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <strong>DD</strong>
    </Link>
  );
}
