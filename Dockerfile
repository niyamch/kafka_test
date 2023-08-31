# ---- Base Node ----
FROM node:18 AS base
# Install global dependencies
RUN npm i -g pnpm @nestjs/cli

# Set working directory
WORKDIR /app

# ---- Development Stage ----
FROM base AS development

# Install project dependencies
COPY tsconfig.json tsconfig.build.json package.json package-lock.json nest-cli.json ./
RUN pnpm install -ignore-scripts

# Copy project files
COPY src ./src
COPY test ./test


# Start the application in development mode
CMD ["pnpm", "run", "start:debug"]

# ---- Build Stage ----
FROM development AS build

# Copy package.json and pnpm-lock.yaml from development stage
COPY --from=development /app/package.json ./package.json
COPY --from=development /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=development /app/tsconfig.json ./tsconfig.json
COPY --from=development /app/tsconfig.build.json ./tsconfig.build.json

# Build the application
RUN pnpm run build

# ---- Production Stage ----
FROM base AS production

# Set environment to production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Install production dependencies
COPY --from=build /app/package.json ./package.json
RUN pnpm install -ignore-scripts --prod

# Copy built app from the 'build' stage
COPY --from=build /app/dist ./dist

# Set user to node for security
USER node

# Start the application in production mode
CMD ["node", "dist/main.js"]
