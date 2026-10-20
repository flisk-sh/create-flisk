## 1. Prepare the package

- [x] 1.1 Rename the package to `@tdk-landscape/create-tdk-stack` and set publishable repository, description, license, and access metadata.
- [x] 1.2 Define an allowlist for package contents and verify the archive includes the built site, needed app sources, README, and license while excluding local dependencies and caches.
- [x] 1.3 Add or update registry installation and maintenance documentation, including the package's non-CLI purpose and registry-specific authentication.

## 2. Automate releases

- [x] 2.1 Add a GitHub Release workflow that checks out the tagged source, installs with the lockfile, builds the site, and validates that the tag matches the package version.
- [x] 2.2 Configure protected npm credentials and least-privilege GitHub Packages permissions in the release workflow.
- [x] 2.3 Pack once and publish the identical package version and archive to npm and GitHub Packages, with explicit per-registry failure reporting and recovery guidance.

## 3. Verify first release readiness

- [x] 3.1 Confirm npm organization access, GitHub Packages visibility, and package write permissions needed for the release.
- [x] 3.2 Validate the release workflow and packed artifact without publishing, then document the first release tag/version procedure.
