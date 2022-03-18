FROM  node:16
EXPOSE 6789
WORKDIR /app 
COPY package.json /app 
COPY yarn.lock /app
RUN yarn install
COPY . /app 
CMD npm run start