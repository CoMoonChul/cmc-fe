FROM node:22.14.0

# Java 설치 (openapi-generator 사용 시)
RUN apt-get update && apt-get install -y openjdk-17-jre

WORKDIR /app

# 의존성 먼저 복사해서 캐시 활용
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

# 📦 소스 복사
COPY . .

# ✅ 환경파일 마지막에 덮어쓰기
COPY .env.production .env.production

# OAG 생성
RUN pnpm oag:gen:prd

# 빌드
ENV NODE_ENV=production
RUN pnpm build:prod

EXPOSE 3000

CMD ["pnpm", "start:prod"]
