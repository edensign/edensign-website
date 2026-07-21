/**
 * ============================================================
 *  BRAND CONFIGURATION — Eden Sign
 * ============================================================
 *  This is the SINGLE SOURCE OF TRUTH for all brand text.
 *  To rebrand the website, edit brandConfig.json in the
 *  project root. All components import from this file.
 * ============================================================
 */

import config from "../brandConfig.json";

export const BRAND = config;

// Convenience named exports (most commonly used)

/** Full brand name e.g. "Eden Sign" */
export const BRAND_NAME = config.name;

/** Compact / joined form e.g. "EdenSign" */
export const BRAND_COMPACT = config.nameCompact;

/** Lowercase e.g. "edensign" */
export const BRAND_LOWER = config.nameLower;

/** Short tagline */
export const BRAND_TAGLINE = config.tagline;

/** Legal entity name e.g. "Eden Sign Inc." */
export const BRAND_LEGAL = config.legalName;

/** Primary contact email */
export const BRAND_EMAIL = config.email;

/** Info / public email */
export const BRAND_EMAIL_INFO = config.emailInfo;

/** Website URL */
export const BRAND_WEBSITE = config.website;

/** Phone number */
export const BRAND_PHONE = config.phone;

/** Physical address */
export const BRAND_ADDRESS = config.address;

/** Business hours */
export const BRAND_HOURS = config.hours;

/** Instagram profile URL */
export const BRAND_INSTAGRAM = config.instagram;

/** Instagram @handle */
export const BRAND_INSTAGRAM_HANDLE = config.instagramHandle;

/** YouTube channel URL */
export const BRAND_YOUTUBE = config.youtube;

/** YouTube channel display name e.g. "EdenSign TV" */
export const BRAND_YOUTUBE_CHANNEL = config.youtubeChannel;

/** Facebook URL */
export const BRAND_FACEBOOK = config.facebook;

/** Twitter URL */
export const BRAND_TWITTER = config.twitter;

/** Copyright year */
export const BRAND_COPYRIGHT_YEAR = config.copyrightYear;

/** Academy display name */
export const BRAND_ACADEMY = config.academy;

/** Dashboard display name */
export const BRAND_DASHBOARD = config.dashboard;

/** Customer portal display name */
export const BRAND_PORTAL = config.customerPortal;

/** SEO suffix for page titles e.g. "— Eden Sign" */
export const BRAND_SEO_SUFFIX = config.seoSuffix;

/** Format dynamic document titles for browser tabs */
export const getMetaTitle = (pageTitle) => {
  if (!pageTitle) return `${config.name} — ${config.tagline}`;
  return `${pageTitle} — ${config.seoSuffix || config.name}`;
};

export default BRAND;

