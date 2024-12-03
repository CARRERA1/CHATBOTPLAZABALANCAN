FROM node:18-bullseye 
WORKDIR /app
COPY . /app
RUN npm ci
ENV PORT=8000
EXPOSE 8000
CMD ["npm", "run", "start"]

