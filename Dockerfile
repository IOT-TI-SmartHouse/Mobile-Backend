FROM node:latest

COPY . /server
WORKDIR /server
RUN npm install
EXPOSE 3030

CMD [ "npm", "start" ]