# test-enterprise-deploy-lifecycle

## Requirements

- Node.js 22
- npm >= 10

We use Node 22 across local, CI, and production environments.

### Test Docker Image Locally (your local machine)

```bash
# from the root of the repo

# 1. build an image using the "dockerfile"
# NOTE: in local env, env vars must be defined in next-app/.env.local file, 
# this differs from the CI pipeline env where we need to use "docker build --build-arg"
docker build -t lifecycle-demo .

# 2. launch a container from the image and then check it locally 
docker run --rm -p 3000:3000 lifecycle-demo
# open http://localhost:3000
```