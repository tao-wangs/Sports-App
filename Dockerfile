FROM node

WORKDIR /home/drp14-sports-app

COPY . /home/drp14-sports-app

RUN npm install

CMD node server.js
