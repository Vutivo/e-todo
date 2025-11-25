FROM node:18-alpine
#cahngements ici pour bcrypt
RUN apk add --no-cache python3 g++ make libc-dev linux-headers

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["node", "src/index.js"]
