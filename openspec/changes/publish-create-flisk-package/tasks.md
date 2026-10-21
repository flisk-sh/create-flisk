## 1. Prepare the package

- [x] 1.1 Rename the package to `create-flisk` and set publishable repository, description, license, and access metadata.
- [x] 1.2 Define an allowlist for package contents and verify the archive includes the built site, needed app sources, README, and license while excluding local dependencies and caches.
- [x] 1.3 Add or update registry installation and maintenance documentation, including the package's non-CLI purpose and registry-specific authentication.

## 2. Automate releases

- [x] 2.1 Add a GitHub Release workflow that checks out the tagged source, installs with the lockfile, builds the site, and validates that the tag matches the package version.
- [x] 2.2 Publish to npm with a trusted publisher and to GitHub Packages with a GitHub Actions token that has package write permission.
- [x] 2.3 Pack once, publish the identical package version to npm, and publish the scoped `@flisk-sh/create-flisk` copy to GitHub Packages, with explicit per-registry failure reporting and recovery guidance.

## 3. Verify first release readiness

- [ ] 3.1 Claim the `create-flisk` name on npm and add its trusted publisher (repository `flisk-sh/create-flisk`, workflow `publish-package.yml`).
- [ ] 3.2 Confirm GitHub Packages visibility and the organization permissions needed for the release.
- [x] 3.3 Validate the release workflow and packed artifact without publishing, then document the first release tag/version procedure.
