FROM node:14.16.0-alpine3.13

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
EXPOSE 3005
RUN npm ci
RUN npm run build
CMD [ "node", "src/server/index.js" ]
