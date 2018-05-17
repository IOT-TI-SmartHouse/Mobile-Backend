FROM node:latest

COPY . /server
WORKDIR /server
RUN npm install --only=production
EXPOSE 3030

CMD [ "npm", "start" ]