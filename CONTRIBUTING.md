# Contributing to the Aiven docs

When contributing, keep the following in mind:

- Small PRs are preferred. For larger PRs, start by submitting a suggestion as a new issue.
- The content of the repo is under the [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/).

## Signing off commits

Contributions rely on GitHub's [commit signoff feature](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-the-commit-signoff-policy-for-your-repository):

**Note:** If you commit using the CLI, use the [git commit `--signoff` option](https://git-scm.com/docs/git-commit#_options).

## Guidelines

- **Style guide:** Apply the [style guide](./styleguide.md).
- **Hard line breaks:** To simplify reviews on GitHub, add a hard line break at 90 characters. If you use
  VS Code, you should see the ruler.
- **Vale:** Install [Vale](https://vale.sh/docs/vale-cli/installation/) and
  fix warnings and errors in your content.
- **Conventional commits:** We enforce [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
  **Examples:**
  - `fix: incorrect parameter`
  - `feat: add dark mode`
  - `add: auto-migration docs`

  See our [convention rule](./.github/workflows/semantic-pr.yaml).
