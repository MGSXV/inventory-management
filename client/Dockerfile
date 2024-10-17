FROM node:22.6-alpine3.19

ENV PORT=8000

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]