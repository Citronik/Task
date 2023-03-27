# syntax=docker/dockerfile:1

ARG NODE_IMAGE=node:18.14.2
FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
    # change the default root user to node
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

#FROM dependencies AS build
#RUN node ace build --production
CMD ["dumb-init", "node", "ace", "migration:run", "--force"]

#FROM base AS production
#ENV NODE_ENV=production
#ENV PORT=$PORT
#ENV HOST=0.0.0.0
#COPY --chown=node:node ./package*.json ./
RUN node ace migration:run --force
#RUN npm ci --production
#COPY --chown=node:node --from=build /home/node/app/build .
EXPOSE $PORT
RUN sleep 20
ENTRYPOINT ["./scripts/startup.sh"]
