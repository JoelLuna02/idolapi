FROM node:18
WORKDIR /apiapp
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3000
CMD ["npx", "nodemon", "system.js"]
