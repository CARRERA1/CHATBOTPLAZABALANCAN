FROM node:18-bullseye 
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm ci --only=production
ENV PORT=8000
EXPOSE 8000
CMD ["node", "app.js"]

