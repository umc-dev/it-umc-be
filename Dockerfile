FROM node:21

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json ./

RUN pnpm install --frozen-lockfile

COPY prisma ./prisma

RUN pnpm exec prisma generate

COPY . .

RUN pnpm run build

EXPOSE 9090

CMD ["pnpm", "run", "start"]
