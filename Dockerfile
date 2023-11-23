FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm cache clean --force

RUN npm install

COPY . .

RUN npm run prisma

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]