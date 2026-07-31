# Contributing to CardVault

Thanks for taking the time to contribute! This document explains how to get set up and how to submit changes.

## Table of contents
- [Code of conduct](#code-of-conduct)
- [Getting started](#getting-started)
- [Branching model](#branching-model)
- [Making changes](#making-changes)
- [Linting and testing](#linting-and-testing)
- [Commit messages](#commit-messages)
- [Submitting a pull request](#submitting-a-pull-request)
- [Reporting bugs and requesting features](#reporting-bugs-and-requesting-features)
- [Security issues](#security-issues)

## Code of conduct
Be respectful and constructive. We want CardVault to be a welcoming project for contributors of all experience levels.

## Getting started
1. Fork the repository and clone your fork.
2. Follow the [Installation and run](README.md#installation-and-run) section of the README to set up your local environment with Docker and `make`.
3. Copy `.env.exemple` to `.env.dev` and fill in the required values before running `make dev/build`.

## Branching model
- `develop` is the default branch and the target for all pull requests.
- `prod` tracks what is deployed at [card-vault.fr](https://card-vault.fr) and is only updated via a release PR (`make release`).
- `preprod` is used for pre-production testing.

Create your feature branch from `develop`:
```bash
git checkout develop
git pull
git checkout -b feature/short-description
```
Use a prefix that matches the change: `feature/`, `fix/`, `chore/`, `docs/`, etc.

## Making changes
- Keep pull requests focused on a single change; avoid bundling unrelated fixes or refactors.
- Match the existing code style of the part of the codebase you're touching (backend, frontend, or ml_service).
- Add or update tests when you change behavior.
- Update documentation (README, docstrings, comments) when it becomes outdated because of your change.

## Linting and testing
Run all linters before opening a PR (ESLint + TypeScript for frontend, flake8 + ruff for backend/ml_service):
```bash
make lint
```
You can also lint a single part of the app:
```bash
make lint/front
make lint/back
make lint/ml
```
Frontend unit tests:
```bash
cd frontend && npm test
```
These checks also run automatically in CI on every push and pull request; a PR won't be merged if CI is failing.

## Commit messages
Write clear, descriptive commit messages that explain *why* a change was made, not just what changed. Look at `git log` for examples of the style used in this repository.

## Submitting a pull request
1. Push your branch to your fork.
2. Open a pull request against `develop`.
3. Fill in the PR description: what the change does, why it's needed, and how to test it.
4. Link any related issues.
5. Make sure `make lint` and the test suites pass, and that CI is green.
6. Be responsive to review feedback.

## Reporting bugs and requesting features
Please use the [issue templates](.github/ISSUE_TEMPLATE) when opening a [GitHub issue](https://github.com/Franck-dev-hub/card_vault/issues):
- **Bug report** for something that isn't working as expected.
- **Feature request** for new functionality or improvement ideas.

## Security issues
Do not open a public issue for security vulnerabilities. Please follow our [Security Policy](SECURITY.md) instead.
