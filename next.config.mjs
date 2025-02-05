import env from 'dotenv';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// 환경에 따른 .env 파일 설정
let envFile = '';
switch (process.env.DEPLOY_ENV) {
  case 'LOCAL':
    envFile = '.env.local';
    break;
  case 'DEV':
    envFile = '.env.dev';
    break;
  case 'PRD':
    envFile = '.env.prd';
    break;
  default:
    envFile = '.env.local';
}
env.config({ path: `${__dirname}/config/${envFile}` });

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/:path*",
      },
    ];
  },
}

export default nextConfig;