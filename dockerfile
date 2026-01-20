# ======================
# BUILD STAGE
# ======================

# use this image as base
# NOTE: "builder" is the name of the container
FROM node:22-alpine AS builder

# set working directory inside the container
WORKDIR /app

# next js

# - copy files from the host to the container
COPY next-app/package*.json ./next-app/
# - install dependencies in the container
RUN cd next-app && npm ci
# - copy rest of the code
COPY next-app ./next-app
# - build
RUN cd next-app && npm run build
# now next js artifacts are produced in the container at "next-app/.next"


# ======================
# RUNTIME STAGE
# ======================

# use this image as base
FROM node:22-alpine

# set working directory inside the container
WORKDIR /app

# set env vars
ENV NODE_ENV=production

# copy artifacts from the build stage
# NOTE: "builder" is the name of the build stage container
COPY --from=builder /app/next-app ./next-app

# expose port
EXPOSE 3000

# run
CMD ["npm", "start", "--prefix", "next-app"]
