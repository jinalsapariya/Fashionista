# Base image
FROM ubuntu
# maintainer
LABEL maintainer="jinalsapariya96@gmail.com"
COPY package.json .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]
COPY . .
WORKDIR /usr/src/app

