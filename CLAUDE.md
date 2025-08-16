# Claude Code Configuration

This file contains configuration information for Claude Code to better understand and assist with this Next.js project.

## Project Overview

- **Framework**: Next.js 15.4.2
- **Language**: TypeScript
- **Runtime**: React 19.1.0
- **Styling**: Tailwind CSS v4
- **3D Graphics**: Three.js with React Three Fiber
- **Animation**: GSAP, Framer Motion

## Key Dependencies

- `next`: React framework with App Router
- `react`/`react-dom`: v19.1.0
- `@react-three/fiber`: React renderer for Three.js
- `@react-three/drei`: Useful helpers for React Three Fiber
- `three`: 3D library
- `gsap`: Animation library
- `framer-motion`: Motion library for React
- `tailwindcss`: Utility-first CSS framework
- `react-hook-form`: Form handling

## Development Scripts

- `npm run dev`: Start development server with Turbopack on port 3000
- `npm run build`: Build the application with Turbopack
- `npm run start`: Start production server on port 3201
- `npm run lint`: Run ESLint

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── ThreeHero.tsx   # 3D hero section
│   ├── Navigation.tsx  # Site navigation
│   ├── Services.tsx    # Services section
│   ├── ROICalculator.tsx # ROI calculator
│   ├── CaseStudies.tsx # Case studies
│   ├── Process.tsx     # Process section
│   ├── ContactForm.tsx # Contact form
│   └── Footer.tsx      # Site footer
```

## Development Environment

- **Port**: Development server runs on port 3000
- **Production Port**: Production server runs on port 3201
- **Build Tool**: Turbopack (Next.js' Rust-based build system)

## Key Features

- 3D graphics using React Three Fiber
- Responsive design with Tailwind CSS
- Animation with GSAP and Framer Motion
- Form handling with React Hook Form
- SEO optimized with proper meta tags

## Common Tasks

To work with this project using Claude Code:

1. **Development**: Use `npm run dev` to start the development server
2. **Building**: Use `npm run build` to create a production build
3. **Linting**: Use `npm run lint` to check for code issues
4. **Component Development**: Add new components to `src/components/`
5. **Page Creation**: Add new pages in `src/app/` with corresponding route folders

## Deployment

The application is configured to run on port 3201 in production. For deployment, ensure the environment is configured to use this port.

## Notes

- ESLint errors are ignored during builds (`ignoreDuringBuilds: true`)
- The project uses the App Router pattern introduced in Next.js 13+
- Turbopack is enabled for faster development and builds