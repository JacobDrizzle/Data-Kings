import type { Locale } from './Language';

export type Theme = 'dark' | 'light' | 'system' | 'callisto';

export interface TechStackItem {
  language: string;
  projects: string[];
};

export interface SiteConfig {
  title: string; // Website title / name
  description: string; // Website description
  source: string; // Link to project source (e.g. on GitHub)
  baseUrl: string; // The URL where the site is hosted
  defaultLanguage: Locale; // Default language to use if 'system' is not supported
  defaultTheme: Theme; // Default theme to use if 'system' is not supported
  colorSchemes?: {
    [key: string]: {
      // Theme name
      [key: string]: string; // Theme values
    };
  }; // Will be converted to CSS variables
  routeLinks: {
    // List of route links to show in the navbar
    route: string;
    label: string;
    color?: string;
    description?: string;
  }[];
  footerInfo: {
    // Meta and legal info to display in the footer
    author: string;
    authorSite: string;
    license: string;
    licenseLink: string;
    copyright: boolean;
  };
}