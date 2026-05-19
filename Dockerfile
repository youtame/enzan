FROM node:22

WORKDIR /app
RUN corepack enable

# package.json / copy yarn.lock
COPY package.json ./
COPY yarn.lock* ./

RUN yarn install

COPY docs ./docs

# Vitepress dev
CMD ["yarn", "docs:dev", "-p", "8080"]
