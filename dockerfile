FROM node:22.14.0

# Java 설치 (openapi-generator 사용 시)
RUN apt-get update && apt-get install -y openjdk-17-jre

WORKDIR /app

# 1. 의존성 파일만 먼저 복사
COPY package.json pnpm-lock.yaml ./

# 2. pnpm 설치
RUN corepack enable && corepack prepare pnpm@latest --activate

# 3. 의존성 설치
RUN pnpm install

# 4. 전체 소스 복사 (이때 .env.production이 .dockerignore에 의해 누락될 수 있음)
COPY . .

# 5. OAG 생성
RUN pnpm oag:gen:prd

# 6. 빌드
ENV NODE_ENV=production
RUN pnpm build:prod

# 7. 포트 오픈 및 앱 실행(정상 테스트)
EXPOSE 3000
CMD ["pnpm", "start:prod"]
