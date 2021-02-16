FROM node:15.2.0-alpine

WORKDIR /app

RUN apk update && apk add --update nodejs npm

COPY . .

RUN npm install

CMD ["npm", "start"]