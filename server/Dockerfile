# Start your image with a node base image
FROM node:20

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Copy the rest of the app's code
COPY . .

# Install the application dependencies
RUN npm install
# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 8000

# Start the app using serve command
CMD ["node", "dist/main"]