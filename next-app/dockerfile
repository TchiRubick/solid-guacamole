# syntax=docker.io/docker/dockerfile:1

FROM node:22

# Install zsh
RUN apt-get update && apt-get install -y zsh && apt-get clean

# Set zsh as the default shell for the root user
RUN chsh -s $(which zsh)

# Set SHELL environment variable
ENV SHELL=/bin/zsh

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" || true

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN corepack enable pnpm && pnpm i

COPY src ./src
COPY public ./public
COPY next.config.ts ./
COPY .eslintrc.json ./
COPY .prettierignore ./
COPY .prettierrc.json ./
COPY drizzle.config.ts ./
COPY postcss.config.mjs ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at run time
ENV NEXT_TELEMETRY_DISABLED 1
