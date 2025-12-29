# Copilot:
# Create a Dockerfile using node:20-alpine.
# Copy package.json, install production deps.
# Copy server.js.
# Expose port 3000.
# Command: npm start.

FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY server.js ./
EXPOSE 3000
CMD ["npm", "start"]
