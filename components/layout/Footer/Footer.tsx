'use client';

import { faGithub, faLinkedin } from '@awesome.me/kit-7f37d33478/icons/classic/brands';
import {
  faEnvelope,
  faFileArrowDown,
  faLocationDot,
} from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Button, Container, Group, Text, Tooltip } from '@mantine/core';
import { analytics } from '@/lib/analytics';
import { useFooterVisibility } from '@/lib/hooks';
import classes from './Footer.module.css';

const CONTACT_EMAIL = 'hello@davedonnelly.dev';
const GITHUB_URL = 'https://github.com/davedonnellydev';
const LINKEDIN_URL = 'https://www.linkedin.com/in/dave-donnelly-dev/';
const CV_PATH = '/CV - D_DONNELLY.pdf';

export function Footer() {
  const { isVisible, handleMouseEnter, handleMouseLeave } = useFooterVisibility();

  const handleEmailClick = () => {
    analytics.trackEmailClick('footer');
    window.location.href = `mailto:${CONTACT_EMAIL}`;
  };

  const handleCVDownload = () => {
    analytics.trackCVDownload('footer');
  };

  const handleGitHubClick = () => {
    analytics.trackGitHubClick('footer');
  };

  const handleLinkedInClick = () => {
    analytics.trackLinkedInClick('footer');
  };

  return (
    <footer
      className={`${classes.footer} ${isVisible ? classes.visible : classes.hidden}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Container size="lg">
        <Group gap="md" justify="center" wrap="wrap" className={classes.actionsSet}>
          {/* Location Info */}
          <Tooltip label="I live in Redfern but am open to remote working" zIndex={1001}>
            <Group gap="xs" className={classes.locationInfo}>
              <FontAwesomeIcon icon={faLocationDot} style={{ width: '16px', height: '16px' }} />
              <Text size="sm" fw={500}>
                Sydney, Australia
              </Text>
            </Group>
          </Tooltip>

          {/* Primary CTA - Email Button */}
          <Button
            size="xl"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'grape', deg: 135 }}
            onClick={handleEmailClick}
            leftSection={
              <FontAwesomeIcon icon={faEnvelope} style={{ width: '20px', height: '20px' }} />
            }
            className={classes.primaryCta}
            aria-label="Send email to hello@davedonnelly.dev"
          >
            Get in Touch
          </Button>

          {/* CV Download */}
          <Tooltip label="Download my CV" zIndex={1001}>
            <ActionIcon
              component="a"
              href={CV_PATH}
              download
              variant="light"
              size="xl"
              onClick={handleCVDownload}
              aria-label="Download CV"
              className={classes.actionButton}
            >
              <FontAwesomeIcon icon={faFileArrowDown} style={{ width: '22px', height: '22px' }} />
            </ActionIcon>
          </Tooltip>

          {/* GitHub */}
          <Tooltip label="View my GitHub" zIndex={1001}>
            <ActionIcon
              component="a"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              size="xl"
              onClick={handleGitHubClick}
              aria-label="GitHub Profile"
              className={classes.actionButton}
            >
              <FontAwesomeIcon icon={faGithub} style={{ width: '24px', height: '24px' }} />
            </ActionIcon>
          </Tooltip>

          {/* LinkedIn */}
          <Tooltip label="Connect on LinkedIn" zIndex={1001}>
            <ActionIcon
              component="a"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              size="xl"
              onClick={handleLinkedInClick}
              aria-label="LinkedIn Profile"
              className={classes.actionButton}
            >
              <FontAwesomeIcon icon={faLinkedin} style={{ width: '24px', height: '24px' }} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Container>
    </footer>
  );
}
