FROM node:19.9 
WORKDIR /app
COPY . .
RUN npm install
RUN npx nuxt build
CMD ["npx", "nuxt", "start"]
