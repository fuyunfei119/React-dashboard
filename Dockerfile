FROM node:16.18.0-slim
WORKDIR /dashboard
ENV PATH /dashboard/node_modules/.bin:$PATH
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]