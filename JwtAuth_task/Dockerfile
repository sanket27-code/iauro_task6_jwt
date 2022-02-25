FROM node:16.13.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4008

CMD [ "node", "index.js" ]
