# Aiven docs

<!-- vale off -->

The Aiven docs repo generates the content located at [www.aiven.io/docs](https://www.aiven.io/docs).
We use [Docusaurus](https://docusaurus.io/) to build the docs.

## 🤲 Contributing

We welcome contributions! To contribute to our docs, see [Contributing](./CONTRIBUTING.md).

## ️🚀 Building the docs

1. Update the examples submodule:

   ```bash
   git submodule update --init --recursive
   ```

### With Docker

1. Run:

   ```bash
   docker compose up dev
   ```

1. Go to http://localhost:3000/docs/. Updating files in your local repo refreshes the website.

### Without Docker

<details>
  <summary><b>Requirements</b></summary>
  <div>
   <ul>
     <li>Node ≥ 23</li>
     <li><a href="https://yarnpkg.com/getting-started/install">yarn 4</a></li>
   </ul>
  </div>
</details>

1. Install the dependencies:

   ```bash
   corepack enable
   yarn
   ```

1. Optional: Install [Vale](https://vale.sh/docs/vale-cli/installation/).

1. Optional: Install [Husky](https://typicode.github.io/husky/):

   ```bash
   yarn dlx husky
   ```

   Husky prevents git pushes when Vale errors are in the files you've modified.

1. Build the docs:

   ```bash
   yarn start
   ```

   **💡 Tip:** If you use VS Code, you can use the build task: **⌘+⇧+B** > **Build the docs**

1. Go to http://localhost:3000/docs/. Updating files in the local repo refreshes the website.

## Opening a PR

1. Check for potential broken links with `yarn build` (`yarn start` doesn't check for broken links).
   After the Docusaurus build, `scripts/limit-llms-txt-size.mjs` keeps `build/llms.txt` under
   48,000 characters and links to the full index at `llms-full.txt`, so agents can use a compact
   index without hitting tooling limits (for example ~100K truncation checks).
1. If you get a green build and when you are happy with your changes, open a PR.
