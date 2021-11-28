FROM node:16

# Create a directory to hold the application code inside the image
# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install packages
COPY package.json .
COPY yarn.lock .
RUN yarn

# Bundle app source
COPY . .

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
# EXPOSE 8080

# Run app
CMD [ "node", "index.js" ]
