FROM node:18-bullseye 
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm ci
ENV PORT=8000
EXPOSE 8000
CMD ["npm", "run", "start"]

