FROM node:22.14.0

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm oag:gen:prd

# env.production 인식하도록 환경변수 지정
ENV NODE_ENV=production

RUN pnpm build:prod

EXPOSE 3000

CMD ["pnpm", "start:prd"]
