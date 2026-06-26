// Type contract for cv.json. Importing these types in components makes a
// breaking change to the data file surface as a build error (via `astro check`)
// instead of silently rendering wrong/empty markup.

export interface Location {
  city: string;
  countryCode: string;
  country: string;
}

export interface Basics {
  name: string;
  label: string;
  avatar: string;
  summary: string;
  siteName: string;
  resumePdf: string;
  siteLogo: string;
  siteOgLogo: string;
  location: Location;
}

export interface Social {
  network: string;
  label: string;
  icon: string;
  username: string;
  url: string;
}

export interface Connect {
  sectionLabel: string;
  socials: Social[];
}

export interface Job {
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  highlights: string[];
}

export interface Experience {
  sectionLabel: string;
  jobs: Job[];
}

export interface Logo {
  src: string;
  alt: string;
}

export interface StackCategory {
  name: string;
  logos: Logo[];
}

export interface Stack {
  sectionLabel: string;
  categories: StackCategory[];
}

export interface CV {
  basics: Basics;
  connect: Connect;
  experience: Experience;
  stack: Stack;
}
