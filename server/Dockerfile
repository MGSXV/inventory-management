# Development stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install OS dependencies required for Prisma and others
RUN apk add --no-cache openssl

# Copy package.json and package-lock.json for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Prisma CLI globally for easier schema management
RUN npm install -g prisma

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3000

# RUN <<EOF
# useradd -s /bin/bash -m vscode
# groupadd docker
# usermod -aG docker vscode
# EOF

CMD ["npm", "run", "start:dev"]

