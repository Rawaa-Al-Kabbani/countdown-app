FROM node:18.19.1 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:alpine3.19

COPY --from=builder /app/dist/countdown-app/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
