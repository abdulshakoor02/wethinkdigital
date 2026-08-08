'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const phoneNumber = '+971564713394';
  const message = 'Hello, I would like to know more about your services.';

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 inline-flex min-h-14 min-w-14 items-center justify-center rounded-full bg-[#25D366] px-4 text-white shadow-lg transition-colors hover:bg-[#1ebe5d]"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-3xl" aria-hidden="true" />
    </button>
  );
}
