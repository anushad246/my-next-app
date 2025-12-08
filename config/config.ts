type Environment = 'development' | 'testing' | 'production';

interface Config {
  apiBaseUrl: string;
  env: Environment;
  isDev: boolean;
  isTesting: boolean;
  isProd: boolean;
}

const env = (process.env.NEXT_PUBLIC_ENV || 'development') as Environment;

export const APP_CONFIG: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  env,
  isDev: env === 'development',
  isTesting: env === 'testing',
  isProd: env === 'production',
};

// Log environment on startup
if (typeof window !== 'undefined') {
  console.log('🔧 Environment Configuration:');
  console.log('Environment:', APP_CONFIG.env);
  console.log('API Base URL:', APP_CONFIG.apiBaseUrl);
  console.log('Config:', APP_CONFIG);
}
