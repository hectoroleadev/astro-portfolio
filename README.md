# hectoroleadev - Personal Portfolio

A modern, lightweight portfolio website built with Astro, featuring a clean design, dark mode support, and PWA capabilities.

## Features

- **Modern Stack**: Built with Astro 4.x and Tailwind CSS
- **Dark Mode**: Automatic theme detection with manual toggle
- **Progressive Web App**: Offline support with Service Worker
- **Responsive Design**: Mobile-first approach with landscape optimizations
- **Performance Optimized**: Fast load times and efficient caching strategies
- **Type-Safe**: Full TypeScript support
- **Icon System**: Custom SVG icons with astro-icon integration
- **SEO Ready**: Open Graph meta tags and semantic HTML

## Project Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment workflow
├── public/
│   ├── favicon.svg             # Favicon with dark mode support
│   ├── logo.svg                # Site logo
│   ├── manifest.json           # PWA manifest
│   └── maskable*.png           # PWA icons
├── src/
│   ├── components/
│   │   ├── Hero.astro          # Hero section component
│   │   └── shared/
│   │       ├── Header.astro    # Header with theme toggle
│   │       └── Footer.astro    # Footer component
│   ├── icons/
│   │   ├── sun.svg             # Light mode icon
│   │   ├── moon.svg            # Dark mode icon
│   │   ├── github.svg          # GitHub social icon
│   │   ├── linkedin.svg        # LinkedIn social icon
│   │   ├── email.svg           # Email icon
│   │   └── download.svg        # Download resume icon
│   ├── layouts/
│   │   └── Layout.astro        # Main layout template
│   ├── pages/
│   │   └── index.astro         # Home page
│   ├── sw-template.js          # Service Worker template
│   └── env.d.ts                # TypeScript definitions
├── cv.json                     # Portfolio content data
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── workbox-config.ts           # PWA/Service Worker config
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/hectoroleadev/hectoroleadev.git

# Navigate to project directory
cd hectoroleadev

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
# or
npm start

# Open browser at http://localhost:4321
```

### Build

```bash
# Build for production (includes Astro check, build, and PWA generation)
npm run build

# Preview production build on port 8080
npm run preview
```

### Commands

| Command           | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Start development server                              |
| `npm start`       | Alias for `npm run dev`                               |
| `npm run build`   | Build for production with type checking and PWA       |
| `npm run preview` | Preview production build locally                      |
| `npm run astro`   | Run Astro CLI commands                                |
| `npm run PWA`     | Generate Service Worker (runs automatically on build) |

## Configuration

### Personal Information

Edit `cv.json` to customize your portfolio content:

```json
{
  "basics": {
    "name": "hector olea",
    "label": "full-stack developer",
    "avatar": "https://storage.hectorolea.dev/hector-olea.jpg",
    "summary": "As a full-stack developer with a DevOps mindset...",
    "siteName": "hectoroleadev",
    "resumePdf": "https://storage.hectorolea.dev/hector-olea-resume.pdf",
    "siteLogo": "/logo.svg",
    "siteOgLogo": "/hectoroleadev-og-logo.jpg",
    "location": {
      "city": "Aguascalientes",
      "countryCode": "MX",
      "country": "México"
    }
  },
  "connect": {
    "socials": [
      {
        "network": "GitHub",
        "icon": "github",
        "url": "https://github.com/hectoroleadev"
      }
      // Add more social links
    ]
  },
  "experience": {
    "jobs": [...]
  },
  "stack": {
    "logos": [...]
  }
}
```

### Theme Customization

Modify `tailwind.config.mjs` for custom styling:

```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'selector',
  theme: {
    extend: {
      screens: {
        smallLandscapeScreen: {
          raw: '(max-height: 450px)',
        },
      },
      animation: {
        fade: 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
```

### TypeScript Path Aliases

Configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@cv": ["./cv.json"]
    }
  }
}
```

Usage in components:

```astro
import cv from '@cv'; import Header from '@/components/shared/Header.astro';
```

## Deployment

### GitHub Pages (Automated)

This project includes a GitHub Actions workflow for automatic deployment:

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to `main` branch
4. Workflow automatically builds and deploys

The workflow (`deploy.yml`) handles:

- Node.js setup (v18)
- Dependency installation
- Production build
- GitHub Pages deployment

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting service
```

### Supported Platforms

- GitHub Pages (recommended)
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting service

## PWA Configuration

The portfolio works offline thanks to Workbox:

- Static assets are precached automatically
- External resources (avatar, resume) use cache-first strategy
- Service Worker auto-registers in production mode only

Configure caching in `src/sw-template.js`:

```javascript
const cacheFirstRoutes = [
  'https://storage.hectorolea.dev/hector-olea.jpg',
  'https://storage.hectorolea.dev/hector-olea-resume.pdf',
];
```

Update `workbox-config.ts` to modify precache patterns:

```javascript
module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{js,css,xml,ico,jpg,png,html,json,txt,svg,woff2}'],
  swDest: 'dist/sw.js',
  swSrc: 'src/sw-template.js',
};
```

## Dark Mode

Dark mode is implemented using:

- Tailwind CSS `dark:` selector
- localStorage for theme persistence
- Automatic detection of system preference
- Manual toggle in header

Theme initialization script in `Layout.astro`:

```javascript
if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
}
```

## Technology Stack

### Core

- **Framework**: Astro 4.13.1
- **Styling**: Tailwind CSS 3.4.7
- **TypeScript**: 5.5.4

### Integrations

- **Icons**: astro-icon 1.1.0
- **Font**: @fontsource-variable/source-code-pro 5.0.19
- **PWA**: workbox-cli 7.1.0

### Build Tools

- **Type Checking**: @astrojs/check 0.9.1
- **Tailwind Integration**: @astrojs/tailwind 5.1.0

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

Target metrics:

- Lighthouse Score: 100/100 (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Cumulative Layout Shift: 0

Optimizations included:

- Static site generation
- Image optimization with Astro's Image component
- Minimal JavaScript bundle
- Efficient caching strategy
- Preloading critical assets

## Development Best Practices

### Code Style

- Font: Source Code Pro Variable with custom font-variation-settings
- Responsive design with mobile-first approach
- Semantic HTML5 elements
- Accessible components with proper ARIA labels

### Git Workflow

- Pull Request template included (`.github/PULL_REQUEST_TEMPLATE.md`)
- Automated deployment on main branch
- `.gitignore` configured for Astro projects

## Customization Guide

### Adding New Social Links

Edit `cv.json`:

```json
"socials": [
  {
    "network": "Twitter",
    "label": "@yourhandle",
    "icon": "twitter",
    "url": "https://twitter.com/yourhandle"
  }
]
```

Add corresponding icon in `src/icons/twitter.svg`

### Adding New Sections

1. Create component in `src/components/`
2. Import in `src/pages/index.astro`
3. Add section data to `cv.json`

### Modifying Colors

Update Tailwind classes in components or extend `tailwind.config.mjs`:

```javascript
theme: {
  extend: {
    colors: {
      'custom-primary': '#your-color',
    }
  }
}
```

## Troubleshooting

### Build Errors

```bash
# Clear Astro cache
rm -rf .astro
npm run build
```

### PWA Not Working

- Ensure you're testing in production mode (`npm run preview`)
- Check Service Worker registration in browser DevTools
- Verify `manifest.json` is accessible

### Dark Mode Issues

- Clear localStorage: `localStorage.removeItem('theme')`
- Check if `dark` class is applied to `<html>` element

## Contributing

Pull requests are welcome! Please use the provided PR template.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Contact

- **Website**: [hectorolea.dev](https://hectorolea.dev)
- **Email**: hey@hectorolea.dev
- **GitHub**: [@hectoroleadev](https://github.com/hectoroleadev)
- **LinkedIn**: [hectorolea](https://www.linkedin.com/in/hectorolea/)

---

Built with ❤️ using Astro

**Tech Stack**: Astro · Tailwind CSS · TypeScript · Workbox · GitHub Actions
