import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Breadcrumb />
      <div className="pt-0">
        {children}
      </div>
    </div>
  );
}
