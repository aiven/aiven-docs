# Aiven docs

<!-- vale off -->

The Aiven docs repo generates the content located at [www.aiven.io/docs](https://www.aiven.io/docs).
We use [Docusaurus](https://docusaurus.io/) to build the docs.

## 🤲 Contributing

We welcome contributions! To contribute to our docs, see [Contributing](./CONTRIBUTING.md).

## ️🚀 Building the docs

<details>
  <summary><b>Requirements</b></summary>
  <div>
   <ul>
     <li>Node ≥ 22</li>
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

   Husky prevents git pushes when Vale erros are in the files you've modified.

1. Build the docs:

   ```bash
   yarn start
   ```

   A local development server starts and a browser window opens. Modify the content and
   save to automatically refresh the output.

   **💡 Tip:**
   - If you use VS Code, you can use the build task: **⌘+⇧+B** > **Build the docs**

   **☝ ️Caution:**
   - `yarn start` doesn't check for broken links, use `yarn build` instead. This command
     doesn't start a live server.

1. When you are happy with your changes, open a PR.
