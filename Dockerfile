FROM node:12-alpine3.12

WORKDIR /usr/src/app

ADD package.json /usr/src/app

RUN npm config set registry http://registry.npmjs.org

RUN npm install

ADD . /usr/src/app

EXPOSE 3000

CMD [ "npm", "run","start:dev" ]