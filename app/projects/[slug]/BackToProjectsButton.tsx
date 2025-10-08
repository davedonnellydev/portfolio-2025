'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { faArrowLeft } from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Group } from '@mantine/core';
import styles from './BackToProjectsButton.module.css';

export function BackToProjectsButton() {
  const searchParams = useSearchParams();

  // Preserve current search parameters when going back to projects
  const backUrl = searchParams.toString() ? `/projects?${searchParams.toString()}` : '/projects';

  return (
    <div className={styles.buttonContainer}>
      <Group>
        <Link href={backUrl}>
          <Button
            variant="light"
            color="indigo"
            size="sm"
            leftSection={<FontAwesomeIcon icon={faArrowLeft} />}
          >
            Back to Projects
          </Button>
        </Link>
      </Group>
    </div>
  );
}
