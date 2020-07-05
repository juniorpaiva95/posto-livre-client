# # estágio de compilação
# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# COPY . .
# RUN npm install
# RUN npm rebuild node-sass
# RUN npm run build

# # estágio de produção
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx
# COPY docker/nginx/conf/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf