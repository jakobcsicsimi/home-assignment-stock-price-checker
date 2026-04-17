FROM node:24-alpine

RUN corepack enable

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN corepack prepare pnpm@latest --activate

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]