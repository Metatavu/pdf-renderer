FROM node:16-alpine
WORKDIR /srv/app
COPY . .
RUN npm install
RUN npm install -g serverless
CMD ["serverless", "offline"]