#!/bin/sh
set -e

# Install dependencies (none in this example)
npm install

# Run build script
npm run build

# Run tests
npm test
