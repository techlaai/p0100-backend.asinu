FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache wget

COPY . .

RUN rm -rf node_modules \
  && npm ci --omit=dev

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --retries=5 \
  CMD node -e "const http=require('http');const req=http.get('http://127.0.0.1:3000/api/healthz',res=>process.exit(res.statusCode===200?0:1));req.on('error',()=>process.exit(1));"

CMD ["npm", "start"]
