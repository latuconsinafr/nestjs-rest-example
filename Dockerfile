FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm ci --omit=dev

RUN npm run build

RUN chown -R node:node /app/app.log

RUN chown -R node:node /app/uploads

USER node

CMD ["npm", "run", "start:prod"]