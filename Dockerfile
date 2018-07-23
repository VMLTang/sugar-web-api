FROM node:8-alpine

# Setup user
USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:${PATH}
RUN mkdir ~/.npm-global
RUN mkdir /home/node/app
WORKDIR /home/node/app

# # Setup global npm packages
RUN npm i -g npm --quiet --no-progress
RUN npm i -g pm2 --quiet --no-progress

# Copy source code
COPY --chown=node:node . /home/node/app
RUN npm ci --quiet --no-progress
RUN npm run build

EXPOSE 8080
CMD [ "pm2-docker", "process.yaml" ]
