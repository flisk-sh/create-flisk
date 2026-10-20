## Why

The `create-tdk-stack` repository currently contains a public-facing React/Vite app but its package is marked `private`, so it cannot be distributed through npm or GitHub Packages. Publishing a versioned package gives consumers a reliable way to obtain the app and gives maintainers one documented release process for both registries.

## What Changes

- Make the repository package publishable under the `@tdk-landscape/create-tdk-stack` scope, with intentional package contents and public metadata.
- Add a repeatable CI release flow that builds and publishes the same version to npm and GitHub Packages when a release is created.
- Document registry installation, authentication expectations, and the release process.

## Capabilities

### New Capabilities
- `package-publishing`: Build, version, package, and publish the `create-tdk-stack` app to npm and GitHub Packages.

### Modified Capabilities

## Impact

- `package.json` and lockfile metadata, packaging configuration, and release documentation.
- GitHub Actions release workflow and repository package/registry permissions.
- npm and GitHub Packages publication credentials and package visibility settings.
