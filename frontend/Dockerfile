# Select distro
FROM node:22-alpine AS build

# Select working directory
WORKDIR /app

# Install pnpm globally via npm
RUN npm install -g pnpm

# Set CI mode to avoid interactive prompts
ENV CI=true

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --shamefully-hoist

# Copy project files
COPY . .

# Build the application
RUN pnpm run build

# Serve stage
FROM node:22-alpine

# Select working directory
WORKDIR /app

# Install pnpm globally via npm
RUN npm install -g pnpm

# Install serve to serve the build files
RUN npm install -g serve

# Copy onlycompiled static files
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 3000

# Run the application
CMD ["serve", "-s", "dist", "-l", "3000", "--single"]
