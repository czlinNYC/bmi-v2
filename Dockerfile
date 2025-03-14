# Base image
FROM node:18.15.0
# RUN adduser --disabled-password --gecos '' newuser
# RUN mkdir -p /usr/src/app
# RUN chown newuser /usr/src/app
# USER newuser
WORKDIR /usr/src/app
# Create app directory
# WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# RUN ls -la
# RUN npm run --prefix ./client install
# RUN npm run --prefix ./client build
# Install app dependencies
RUN apt-get update -y && apt-get install npm -y
RUN NODE_ENV=development npm i


# Bundle app source
COPY . .

# Copy the .env and .env.development files
# COPY .env .env.development ./

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start:dev"]