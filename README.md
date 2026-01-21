# test-enterprise-deploy-lifecycle

Educational test of a Kubernates like deployment lifecycle.  

The project contains:
- Next.js app

We don't use Kubernetes here.  
We use:
- `dockerfile` at root, to build the image
- `github action` as CI runner that build the image
- `ghcr` as the container registry (where the image will be pushed after build)
- do do not deploy the image to any environment (we fake it)
- use Node 22 across local (your machine) and CI (github action)

## Your machine must have these requirements

- Node.js 22 (exactly this version, or we have problems with packages)
- npm >= 10

## Deploy

Overview:
- In local env (your machine) -> build the image locally with `docker build ...`
- In CI env (github action) -> is `.github/workflows/ci.yml` that will build the image and push it to GHCR

### Must Read - Environment Variables

**Build vs Runtime env vars**  
Next.js works like this:
- during next build, it can inject env vars into the code, so the build phase con use them
- but these env vars will be fronzen inside the built docker image, preventing us from having "one image multiple envs"

To work around this, we "split" env vars in two logical sets:
- "build time" env vars -> prefixed with `NEXT_PUBLIC_BUILD` -> injected during build phase
- "run time" env vars -> prefixed with `RUNTIME` -> injected during run phase

**Env vars source in local vs CI env**  
In local env (your machine),  
you have the `next-app/.env.local` file, even if not commited,  
because `dockerfile` copy the entire `next-app` folder inside the container during build.  
So you have the vars without doing nothing.  

In CI,
that read files from the repo, the `next-app/.env.local` file is not present (**DO NOT COMMIT IT**),  
so env vars must be passed down with this chain:
- Define env vars by environment in Github > Repo > Settings > Environments
- In `.github/workflows/ci.yml` we get the env vars form Github and pass it to docker with `docker build --build-arg`
- THen `dockerfile` receive these args and map them to env vars in the container of the build phase

### Deploy it locally (on your machine)

```bash
# 1. go to root of the repo

# 2. build an image using the "dockerfile"
#
# NOTE: in local env, env vars must be defined in next-app/.env.local file, 
# this differs from the CI pipeline env where we need to use "docker build --build-arg"  
docker build -t lifecycle-demo .

# 2. launch a container from the image and then check it locally 
docker run --rm -p 3000:3000 lifecycle-demo
# open http://localhost:3000
```

### Deploy it in CI (github action)

Here is the CI pipeline we have defined in `.github/workflows/ci.yml` that will build the image and push it to GHCR.  

**When it happens?**
We define this in `.github/workflows/ci.yml` > `on`

**What it does?**
We define this in `.github/workflows/ci.yml` > `jobs`
