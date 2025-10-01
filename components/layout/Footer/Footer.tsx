'use client';

import { faGithub, faLinkedin } from '@awesome.me/kit-7f37d33478/icons/classic/brands';
import {
  faClock,
  faEnvelope,
  faFileArrowDown,
  faLocationDot,
} from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Badge, Container, Group, Text, Tooltip } from '@mantine/core';
import { trackEvent } from '@/lib/analytics';
import { useFooterVisibility } from '@/lib/hooks';
import classes from './Footer.module.css';

const CONTACT_EMAIL = 'hello@davedonnelly.dev';
const GITHUB_URL = 'https://github.com/davedonnellydev';
const LINKEDIN_URL = 'https://www.linkedin.com/in/dave-donnelly-dev/';
const CV_PATH = '/cv.pdf';

export function Footer() {
  const { isVisible, handleMouseEnter, handleMouseLeave } = useFooterVisibility();

  const handleEmailClick = () => {
    trackEvent('email_click');
    window.location.href = `mailto:${CONTACT_EMAIL}`;
  };

  const handleCVDownload = () => {
    trackEvent('cv_download');
  };

  const handleSocialClick = (platform: 'github' | 'linkedin') => {
    trackEvent('repo_click', { platform });
  };

  return (
    <footer
      className={`${classes.footer} ${isVisible ? classes.visible : classes.hidden}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Container size="xl">
        <Group justify="space-between" align="center" wrap="wrap">
          {/* Left side: Contact actions */}
          <Group gap="md">
            <Tooltip label="Download my CV" zIndex={1001}>
              <ActionIcon
                component="a"
                href={CV_PATH}
                download
                variant="subtle"
                size="lg"
                onClick={handleCVDownload}
                aria-label="Download CV"
              >
                <FontAwesomeIcon icon={faFileArrowDown} style={{ width: '18px', height: '18px' }} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Send me an email" zIndex={1001}>
              <ActionIcon variant="subtle" size="lg" onClick={handleEmailClick} aria-label="Email">
                <FontAwesomeIcon icon={faEnvelope} style={{ width: '18px', height: '18px' }} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="I live in Redfern but am open to remote working" zIndex={1001}>
              <Group gap="xs">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ width: '14px', height: '14px', opacity: 0.6 }}
                />
                <Text size="sm" c="dimmed">
                  Sydney, Australia
                </Text>
              </Group>
            </Tooltip>

            <Group gap="xs">
              <FontAwesomeIcon
                icon={faClock}
                style={{ width: '14px', height: '14px', opacity: 0.6 }}
              />
              <Tooltip label="I should get back to you within 48 hours" zIndex={1001}>
                <Badge variant="light" size="sm">
                  48h response
                </Badge>
              </Tooltip>
            </Group>
          </Group>

          {/* Right side: Social links */}
          <Group gap="sm">
            <Tooltip label="GitHub" zIndex={1001}>
              <ActionIcon
                component="a"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="subtle"
                size="lg"
                onClick={() => handleSocialClick('github')}
                aria-label="GitHub Profile"
              >
                <FontAwesomeIcon icon={faGithub} style={{ width: '20px', height: '20px' }} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="LinkedIn" zIndex={1001}>
              <ActionIcon
                component="a"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="subtle"
                size="lg"
                onClick={() => handleSocialClick('linkedin')}
                aria-label="LinkedIn Profile"
              >
                <FontAwesomeIcon icon={faLinkedin} style={{ width: '20px', height: '20px' }} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}
