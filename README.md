![](.github/assets/join.png)

![./LICENSE](https://img.shields.io/github/license/rypi-dev/github-template)

# 🐰 Getting started

A set of packages/utilities as devDependencies for linting and formatting

## Table of contents

- [🐰 Getting started](#-getting-started)
  - [Table of contents](#table-of-contents)
  - [✨ Features](#-features)
  - [📥 Usage](#-usage)
    - [Development](#development)
    - [Releasing](#releasing)

## ✨ Features

- Extendable Eslint config + portable presets (Solid, React, NextJS, Prettier, Typescript, Vite, Astro...)

## 📥 Usage

### Development

```bash
# install dependencies
pnpm i --frozen-lockfile

pnpm run dev # bundles packages and listens to file changes
pnpm run build # generate a dist folder with declaration (d.ts) files
```

### Releasing

We use `changesets/action` to automate packages versioning and releasing using Github Actions CI/CD.

To make the automation work, you still need to create a changeset manually and commit the changes, which will basically trigger the version command in `.github/workflows/release.yml`, updating the semantic version of packages on this repository.

See [our contributing doc](./CONTRIBUTING.md) for more details.
