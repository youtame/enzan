FROM node:20

WORKDIR /app
RUN corepack enable

# package.json / yarn.lock をコピー
COPY package.json ./
COPY yarn.lock* ./

# 依存関係をインストール
RUN yarn install

# docsディレクトリをコピー
COPY docs ./docs

# VuePress v2 の dev サーバーを実行
CMD ["yarn", "docs:dev", "-p", "8080"]
