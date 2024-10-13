# Development stage
FROM node:22-alpine AS development

WORKDIR /app

COPY package.json ./package.json
# COPY package-lock.json ./package-lock.json
RUN <<EOF
npm i
npm install -g @nestjs/cli
npm install -g ts-node
npm i --save-dev webpack webpack-cli webpack-node-externals ts-loader run-script-webpack-plugin
EOF

# RUN <<EOF
# npx prisma generate
# EOF

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

