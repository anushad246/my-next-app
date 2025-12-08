'use client';

import { APP_CONFIG } from '@/config/config';

export default function EnvironmentIndicator() {
  const envColors: Record<string, string> = {
    development: 'bg-blue-500',
    testing: 'bg-yellow-500',
    production: 'bg-red-500',
  };

  const bgColor = envColors[APP_CONFIG.env] || 'bg-gray-500';

  return (
    <div className={`fixed top-0 right-0 ${bgColor} text-white px-4 py-2 text-sm font-bold`}>
      ENV: {APP_CONFIG.env.toUpperCase()} | API: {APP_CONFIG.apiBaseUrl}
    </div>
  );
}
