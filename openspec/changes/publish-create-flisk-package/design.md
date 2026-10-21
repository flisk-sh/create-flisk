## Context

The repository is a React/Vite landing page for the TDK stack story. It builds static output into `dist/`, deploys the site through an existing GitHub Pages workflow, and is published to npm and GitHub Packages. It does not contain a project-scaffolding CLI.

## Goals / Non-Goals

**Goals:**

- Publish a consistent, versioned `create-flisk` package to npm and `@flisk-sh/create-flisk` to GitHub Packages.
- Ensure a release builds successfully and includes only intentional runtime/source and distribution files, metadata, and license.
- Keep GitHub Pages deployment independent from registry releases and document how consumers authenticate and install from either registry.

**Non-Goals:**

- Implement a project-scaffolding CLI, an `npm init create-flisk` creator flow, or generated stack templates.
- Change the visual website or its Pages deployment behavior.
- Automatically release on every push or publish different versions/artifacts to each registry.

## Decisions

- **Publish `create-flisk` unscoped on npm and `@flisk-sh/create-flisk` on GitHub Packages.** npm scopes are optional, so the npm name is unscoped and matches the repository name; an unscoped name needs an npm account that owns it, and an organization-scoped classic token cannot publish it, so the release authenticates with npm trusted publishing instead of a stored token. GitHub Packages serves scoped npm packages only, so that copy is published under the organization scope, where the package name matches the repository name and GitHub links the package to the repository automatically. Keep package metadata linked to the GitHub repository in both copies.
- **Publish the existing app package, not an invented CLI.** Include the built site (`dist/`) and the app source and metadata needed to understand or reuse the package. Explicitly document the package's purpose and that it does not expose a scaffold command. Exclude development-only files such as local dependencies and caches.
- **Use a GitHub Release as the single release trigger.** CI checks out the tagged source, installs from the lockfile, runs the production build, validates package contents, and publishes the same package version to npm and GitHub Packages. Registry publishing must not happen on pull requests or ordinary pushes.
- **Publish separately to each registry from one build.** Build and validate the package once, then publish that archive to npm and a scoped copy to GitHub Packages, with registry-specific authentication and permissions. Avoid relying on a single `publishConfig.registry` value to target both registries. Fail the release job visibly if either publication fails; document that a partially published version must be repaired by retrying the missing registry, since published versions cannot be overwritten.
- **Use least-privilege credentials.** Use npm trusted publishing (OIDC) for npm and GitHub Actions' `GITHUB_TOKEN` for GitHub Packages. Grant package write and identity permissions only to the release workflow and require a matching package version/tag.

## Risks / Trade-offs

- A failure after publishing to one registry can leave the other behind → Build and validate once before publishing; make each registry step explicit and document recovery by publishing the same version only to the registry that failed.
- Two package names now exist for one artifact → Document both install paths and why each registry requires its own name.
- Package consumers may assume `create-flisk` is an executable scaffold tool → Describe the artifact as the TDK landing page/app package and state that no CLI binary is provided.
- Registry authentication or package ownership may be incomplete → Add a release preflight and document the npm trusted publisher and GitHub organization permissions needed before the first release.
- Including both source and built output increases package size → Define an allowlist and inspect the packed file list in CI before publication.

## Migration Plan

1. Change the manifest to the unscoped `create-flisk` name and add repository, license, README, files, and version metadata suitable for publication.
2. Claim the `create-flisk` name on npm, configure a trusted publisher for it (repository `flisk-sh/create-flisk`, workflow `publish-package.yml`), and confirm the repository permits GitHub Packages publishing.
3. Add the release workflow and packaging documentation while retaining the existing Pages workflow.
4. Create a version tag and GitHub Release to publish to both registries; verify each registry exposes the same version and package contents.
5. If publication is wrong, publish a corrected higher version. If one registry failed, publish the already-built version there only if the registry permits that version; otherwise release a new version to both.

## Open Questions

- Confirm which npm account will own the unscoped `create-flisk` name; the trusted publisher is configured on that account.
- Confirm GitHub Packages visibility and access expectations for consumers; default to public package access if the repository's package policy permits it.
- Determine the first release version. The current manifest is `0.1.1`; the first registry release should use an unused version and matching Git tag.
