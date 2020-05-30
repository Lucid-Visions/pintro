FROM node:10

WORKDIR /app
COPY ./ /app/
RUN yarn install && yarn run build

ENTRYPOINT [ "node", "dist/index.js" ]