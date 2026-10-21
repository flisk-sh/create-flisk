## Why

The `create-flisk` repository contains a public-facing React/Vite app that consumers install to reuse the landing page. Publishing it under its own unscoped npm name gives consumers a scope-independent install path and gives maintainers one documented release process for both registries.

## What Changes

- Publish the repository package as the unscoped npm package `create-flisk`, with intentional package contents and public metadata.
- Publish a GitHub Packages copy as `@flisk-sh/create-flisk`, because GitHub Packages serves scoped npm packages only.
- Add a repeatable CI release flow that builds and publishes the same version to npm and GitHub Packages when a release is created.
- Document registry installation, authentication expectations, and the release process.

## Capabilities

### New Capabilities
- `package-publishing`: Build, version, package, and publish the `create-flisk` app to npm and GitHub Packages.

### Modified Capabilities

## Impact

- `package.json` and lockfile metadata, packaging configuration, and release documentation.
- GitHub Actions release workflow and repository package/registry permissions.
- npm trusted publisher configuration for the unscoped package name and GitHub Packages visibility settings.
