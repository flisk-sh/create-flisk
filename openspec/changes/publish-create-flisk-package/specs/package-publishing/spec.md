## ADDED Requirements

### Requirement: Registry package identity and contents
The project SHALL publish a non-private npm package named `create-flisk` and a GitHub Packages package named `@flisk-sh/create-flisk`, both with metadata linking them to the `flisk-sh/create-flisk` repository. Each package SHALL include the production site build, required app sources, README, and license, and SHALL exclude dependencies, caches, and local-only configuration. The package description and documentation SHALL make clear that it distributes the TDK landing page app and does not provide a project-scaffolding CLI.

#### Scenario: Package archive is prepared
- **WHEN** a release package is built
- **THEN** its manifest identifies `create-flisk`, its archive is named `create-flisk-<version>.tgz`, its file list includes the production app, README, and license, and its file list excludes local dependencies and caches

#### Scenario: GitHub Packages copy is prepared
- **WHEN** the GitHub Packages archive is built from the npm archive
- **THEN** its manifest identifies `@flisk-sh/create-flisk` and its file list matches the npm archive

#### Scenario: Consumer inspects package purpose
- **WHEN** a consumer reads package metadata or its README
- **THEN** they can identify the repository and understand that the package does not install an `npm create` command or executable

### Requirement: Dual registry release
The project SHALL publish one package version with identical package contents to both npm and GitHub Packages. Publication SHALL be initiated by a GitHub Release whose tag version matches the package version, and SHALL NOT be triggered by pull requests or ordinary branch pushes.

#### Scenario: Valid release publishes to both registries
- **WHEN** a GitHub Release is created for a tag matching the package version and the build and package checks pass
- **THEN** the release workflow publishes the same package version to npm and GitHub Packages

#### Scenario: Release tag does not match package version
- **WHEN** a GitHub Release tag version does not match the package manifest version
- **THEN** the workflow fails before either registry publication

#### Scenario: Build or package validation fails
- **WHEN** the production build or package contents validation fails
- **THEN** the workflow stops before publishing to either registry

#### Scenario: A registry publication fails
- **WHEN** publication succeeds to one registry and fails to the other
- **THEN** the workflow reports which registry failed and preserves enough release information to identify the package version requiring recovery

### Requirement: Registry credentials and consumer instructions
The release workflow SHALL authenticate to npm with a trusted publisher bound to this repository and workflow, and to GitHub Packages with a GitHub Actions token that has package write permission. Repository documentation SHALL describe how consumers select each registry, authenticate where required, and install the package.

#### Scenario: Release workflow authenticates
- **WHEN** the release workflow publishes packages
- **THEN** npm publication uses the repository's trusted publisher and GitHub Packages publication uses a GitHub Actions token with package write permission

#### Scenario: Consumer follows installation instructions
- **WHEN** a consumer chooses npm or GitHub Packages
- **THEN** the documentation provides the correct package name, registry selection, and any required authentication steps for that registry
