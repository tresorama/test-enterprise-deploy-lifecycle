# test-enterprise-deploy-lifecycle

## Requirements

- Node.js 22
- npm >= 10

We use Node 22 across local, CI, and production environments.

### Build the image

```bash
# from the root of the repo

# build an image using the "dockerfile"
docker build -t lifecycle-demo .

# then check it locally 
docker run --rm -p 3000:3000 lifecycle-demo
# open http://localhost:3000
```