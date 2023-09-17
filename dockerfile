FROM node:lts-slim
WORKDIR /bot
ADD ./package.json /bot/
RUN npm install --omit=dev
ADD ./dist /bot/src
CMD [ "node", "src/index.js" ]