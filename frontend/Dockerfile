# Select distro
FROM node:20-alpine AS build

# Select working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Serve stage
FROM node:20-alpine

# Select working directory
WORKDIR /app

# Install serve to serve the build files
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Run the application
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
CMD ["npm", "start"]
