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

# Copy build files from the build stage
COPY --from=build /app/build ./build

# Expose port
EXPOSE 3000

# Run the application
CMD ["serve", "-s", "build", "-l", "3000"]