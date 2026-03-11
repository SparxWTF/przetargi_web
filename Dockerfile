# Build stage
FROM node:22-slim AS build

WORKDIR /app

# Copy package files first for better caching
COPY package.json ./

# Fresh install on Linux (gets correct native bindings)
RUN npm install --no-package-lock

# Copy source
COPY . .

# Build
RUN npm run build

# Production stage
FROM node:22-slim AS production

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "dist", "-s", "-l", "tcp://0.0.0.0:3000"]
