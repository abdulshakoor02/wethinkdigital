import { FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '@/lib/site';

const message = 'Hi — I would like to talk about a project.';

/**
 * Floating WhatsApp entry point. A plain anchor, so no client JS is needed.
 * Sits above the mobile safe area and is nudged up on small screens so it does
 * not cover the footer / contact CTA.
 */
export default function WhatsAppButton() {
  const href = `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with WeThinkDigital on WhatsApp"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-colors hover:bg-[#1ebe5d] sm:bottom-6 sm:right-6 sm:min-h-14 sm:min-w-14"
    >
      <FaWhatsapp className="text-2xl sm:text-3xl" aria-hidden="true" />
    </a>
  );
}
