FROM node:16.15.0-stretch

#Install and cache node_modules
COPY package.json yarn.lock /tmp/
RUN cd /tmp && \
    yarn install --frozen-lockfile && \
    mkdir -p /app && \
    mv /tmp/node_modules /app/

COPY ./ /app
WORKDIR /app

VOLUME /data
EXPOSE 5000
CMD ["node", "-r", "dotenv/config", "src/index.js"]

HEALTHCHECK --interval=60s --timeout=5s --start-period=5s --retries=3 CMD [ "node", "healthcheck/index.js" ]
