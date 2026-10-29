FROM node:20-alpine

WORKDIR /app/news

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8004

CMD ["npm", "start"]
