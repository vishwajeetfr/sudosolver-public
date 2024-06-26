# Specify the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install additional dependencies
RUN npm install react-router-dom firebase

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
