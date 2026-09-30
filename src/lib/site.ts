/**
 * Single source of truth for site-wide identity, contact details, navigation
 * and the products we promote. Never hardcode any of this in a component.
 */

export const siteConfig = {
  name: 'WeThinkDigital',
  legalName: 'WeThinkDigital Solutions',
  url: 'https://www.wethinkdigital.solutions',
  tagline: 'AI systems and software that ship.',
  description:
    'WeThinkDigital is an AI and software engineering company. We build AI automation, autonomous agent systems, custom software and modern web applications for teams that need to move faster.',
  email: 'info@wethinkdigital.solutions',
  phone: '+971 58 929 3060',
  phoneHref: 'tel:+971589293060',
  whatsapp: 'https://wa.me/971589293060',
  addressLocality: 'Dubai',
  addressRegion: 'Dubai',
  addressCountry: 'AE',
  foundingDate: '2020',
  ogImage: '/og-image.png',

  apps: {
    agents: {
      id: 'agents',
      name: 'WeThinkDigital Agents',
      shortName: 'Agents',
      href: '/products/agents',
      url: 'https://agents.wethinkdigital.solutions',
      tagline: 'An autonomous software delivery team.',
      description:
        'A multi-agent platform that picks up work items, writes and tests the code, and reviews the pull requests your team raises. SDE, QA and PR Review agents working the same backlog.',
      category: 'AI agents for software delivery',
    },
    resume: {
      id: 'resume',
      name: 'WeThinkDigital Resume',
      shortName: 'Resume AI',
      href: '/products/resume-ai',
      url: 'https://resume.wethinkdigital.solutions',
      tagline: 'Your resume, redesigned by AI.',
      description:
        'Upload an existing resume and get back a clean, structured, recruiter-ready document — rewritten for clarity, formatted properly, and tailored to the role you are targeting.',
      category: 'AI resume builder',
    },
  },

  nav: [
    { name: 'Services', href: '/#services' },
    { name: 'Products', href: '/products' },
    { name: 'Process', href: '/#process' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],

  services: [
    { name: 'AI Automation', href: '/services/ai-automation' },
    { name: 'AI Engineering', href: '/services/ai-engineering' },
    { name: 'Software Development', href: '/services/software-development' },
    { name: 'Web Development', href: '/services/web-development' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
