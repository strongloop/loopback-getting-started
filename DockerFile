FROM node:slim
ADD . /app
WORKDIR /app
RUN npm install
CMD npm start
