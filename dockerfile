FROM node:22.14.0

# Java 설치 (OpenAPI Generator 필요 시)
RUN apt-get update && apt-get install -y openjdk-17-jre

# 작업 디렉토리 설정
WORKDIR /app

# 1. 의존성 관련 파일만 먼저 복사
COPY package.json pnpm-lock.yaml ./

# 2. pnpm 설치
RUN corepack enable && corepack prepare pnpm@latest --activate

# 3. 의존성 설치
RUN pnpm install

# 4. 전체 소스 복사 (이때 .env.production은 복사 안 됨)
COPY . .

# 5. 클라이언트용 환경 변수 포함을 위해 .env.production만 따로 복사
COPY .env.production .env.production

# 6. OpenAPI Generator 실행
RUN pnpm oag:gen:prd

# 7. 프로덕션 빌드
ENV NODE_ENV=production
RUN pnpm build:prod

# 8. 보안을 위해 .env.production 파일 제거
RUN rm -f .env.production

# 9. 포트 노출 및 앱 실행
EXPOSE 3000
CMD ["pnpm", "start:prod"]
