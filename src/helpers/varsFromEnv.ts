// config.ts
interface EnvVariables {
  API_URL: string;
  CORS_PROXY_URL: string;
  LOCAL_CLIENT_PREFIX: string;
}

const env: EnvVariables = {
  API_URL: import.meta.env.VITE_API_URL || '',
  CORS_PROXY_URL: import.meta.env.VITE_CORS_PROXY_URL || '',
  LOCAL_CLIENT_PREFIX: import.meta.env.VITE_LOCAL_CLIENT_PREFIX || 'DECOR_STORE_',
};

export default env;
