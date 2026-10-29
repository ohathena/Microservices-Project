FROM node:22

WORKDIR /app/mail

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 8004

CMD ["npm", "start"]