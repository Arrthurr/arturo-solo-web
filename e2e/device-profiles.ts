import { devices } from '@playwright/test';

/** Chromium mobile profile for generic Android-style viewport testing. */
export const mobileProfile = devices['Pixel 7'];

/** WebKit iOS profile from Playwright's device provider. */
export const iosProviderProfile = devices['iPhone 15'];
