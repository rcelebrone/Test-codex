# Test-codex

This repository contains a small example Node.js project. The project includes a sample build script and a simple test.

## Requirements

- Node.js >= 18

## Setup, Build and Test

Run `setup.sh` which will install dependencies (if any), build the project and execute the tests:

```sh
./setup.sh
```

Alternatively you can run the commands manually:

```sh
npm install
npm run build
npm test
```

## API Server

An example HTTP API is provided in `index.js`. Start it with:

```sh
npm start
```

Query the `/search` endpoint with a `q` parameter to fetch the title of the first
Google search result. For example:

```
curl "http://localhost:3000/search?q=nodejs"
```

## Continuous Integration

A GitHub Actions workflow is provided in `.github/workflows/nodejs.yml` which runs the build and tests on Node.js 18.x and 20.x whenever changes are pushed or a pull request is opened.
