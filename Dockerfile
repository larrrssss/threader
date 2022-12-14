FROM node:16-alpine AS builder

WORKDIR /bot

COPY package*.json /

COPY prisma ./prisma/

COPY tsconfig.json ./

RUN npm install

RUN npx prisma generate --schema=/bot/prisma/schema.prisma

COPY . . 

RUN npm run docker:build

FROM node:16-alpine AS production

WORKDIR /bot

COPY . .

RUN npm install

COPY --from=builder /bot/dist /bot/dist/

CMD [ "npm", "start" ]