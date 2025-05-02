FROM node:18-alpine

WORKDIR /scrapper

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV NAME firstproject

CMD ["npm", "start"]