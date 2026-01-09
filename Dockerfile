FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# STRICT: Chỉ dùng npm ci
RUN npm ci --only=production
COPY . .
# Chỉ document port 3000 (Binding thực tế do Compose lo)
EXPOSE 3000
CMD ["npm", "start"]
