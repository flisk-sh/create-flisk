## Context

The repository is a React/Vite landing page for the TDK stack story. It currently has a private `create-tdk-stack` package manifest, builds static output into `dist/`, and deploys the site through an existing GitHub Pages workflow. The requested change is registry distribution of this repository's package to npm and GitHub Packages; it does not currently contain a project-scaffolding CLI.

## Goals / Non-Goals

**Goals:**

- Publish a consistent, versioned `@tdk-landscape/create-tdk-stack` package to both registries.
- Ensure a release builds successfully and includes only intentional runtime/source and distribution files, metadata, and license.
- Keep GitHub Pages deployment independent from registry releases and document how consumers authenticate and install from either registry.

**Non-Goals:**

- Implement `npm create tdk-stack`, a `create-tdk-stack` executable, or generated stack templates.
- Change the visual website or its Pages deployment behavior.
- Automatically release on every push or publish different versions/artifacts to each registry.

## Decisions

- **Use the scoped package name `@tdk-landscape/create-tdk-stack`.** GitHub Packages' npm registry uses a GitHub organization scope, and using the same scope on npm preserves one package identity. Keep package metadata linked to the GitHub repository.
- **Publish the existing app package, not an invented CLI.** Include the built site (`dist/`) and the app source and metadata needed to understand or reuse the package. Explicitly document the package's purpose and that it does not expose a scaffold command. Exclude development-only files such as local dependencies and caches.
- **Use a GitHub Release as the single release trigger.** CI checks out the tagged source, installs from the lockfile, runs the production build, validates package contents, and publishes the same package version to npm and GitHub Packages. Registry publishing must not happen on pull requests or ordinary pushes.
- **Publish separately to each registry from one package build.** Create the tarball once and publish that exact tarball to npm and GitHub Packages, with registry-specific authentication and permissions. Avoid relying on a single `publishConfig.registry` value to target both registries. Fail the release job visibly if either publication fails; document that a partially published version must be repaired by retrying the missing registry, since published versions cannot be overwritten.
- **Use least-privilege credentials.** Use GitHub Actions' `GITHUB_TOKEN` for GitHub Packages and a dedicated npm publishing credential stored as a protected repository secret. Grant package write permissions only to the release workflow and require a matching package version/tag.

## Risks / Trade-offs

- A failure after publishing to one registry can leave the other behind → Build and validate once before publishing; make each registry step explicit and document recovery by publishing the same version only to the registry that failed.
- Package consumers may assume `create-tdk-stack` is an executable scaffold tool → Describe the artifact as the TDK landing page/app package and state that no CLI binary is provided.
- Registry authentication or organization package settings may be incomplete → Add a release preflight and document required npm and GitHub organization permissions before the first release.
- Including both source and built output increases package size → Define an allowlist and inspect the packed file list in CI before publication.

## Migration Plan

1. Change the manifest to the scoped package name and add repository, license, README, files, and version metadata suitable for publication.
2. Confirm the repository/organization permits GitHub Packages publishing and configure the npm release credential.
3. Add the release workflow and packaging documentation while retaining the existing Pages workflow.
4. Create a version tag and GitHub Release to publish to both registries; verify each registry exposes the same version and package contents.
5. If publication is wrong, publish a corrected higher version. If one registry failed, publish the already-built version there only if the registry permits that version; otherwise release a new version to both.

## Open Questions

- Confirm the npm organization `@tdk-landscape` is configured to publish this package and that the maintainers have the required publish access.
- Confirm GitHub Packages visibility and access expectations for consumers; default to public package access if the repository's package policy permits it.
- Determine the first release version. The current manifest is `0.1.0`; the first registry release should use an unused version and matching Git tag.
