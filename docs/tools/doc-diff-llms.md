---
title:  Monitor Aiven documentation changes with GitHub actions
sidebar_label: Monitor doc changes
---

Set up automated monitoring of the Aiven Documentation to track changes and get notifications when content is updated.

To monitor the [Aiven Documentation](https://aiven.io/docs) for changes as a customer, follow these steps to set up an automated GitHub Action in your own personal or company account.

## Create a monitoring repository

You need a "home" for your monitor. This repository stores the script and a history of the `llms.txt` file so you can see exactly what changed over time.

1. Log into GitHub and create a new repository (for example, `aiven-docs-monitor`).
1. Set this to **Private** if you don't want others to see your monitoring activity.

## Set up Slack notifications

If you want to be alerted immediately rather than checking GitHub manually, set up a Slack Webhook:

1. Create an **Incoming Webhook** in your Slack workspace.
1. In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**.
1. Click **New repository secret** and name it `SLACK_WEBHOOK_URL`. Paste your webhook link as the value.

## Create the automation script

Inside your new repository, create a folder path: `.github/workflows/`. Inside that folder, create a file named `monitor.yml`. Add the following code:

```yaml
name: Monitor Aiven Docs
on:
  schedule:
    - cron: '0 9 * * *' # Runs daily at 9:00 AM UTC
  workflow_dispatch: # Allows you to run it manually to test

jobs:
  check-changes:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Fetch Latest llms.txt
        run: |
          curl -s https://aiven.io/docs/llms.txt -o latest_llms.txt

      - name: Compare and Notify
        id: compare
        run: |
          if [ -f current_llms.txt ]; then
            if ! cmp -s current_llms.txt latest_llms.txt; then
              echo "changed=true" >> $GITHUB_OUTPUT
            else
              echo "changed=false" >> $GITHUB_OUTPUT
            fi
          else
            cp latest_llms.txt current_llms.txt
            echo "changed=false" >> $GITHUB_OUTPUT
          fi

      - name: Send Slack Alert
        if: steps.compare.outputs.changed == 'true'
        env:
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK_URL }}
        run: |
          curl -X POST -H 'Content-type: application/json' \
          --data "{\"text\":\"🔔 *Aiven Docs Update:* Changes detected in llms.txt. View live: https://aiven.io/docs/llms.txt\"}" \
          $SLACK_WEBHOOK

      - name: Save Changes to History
        if: steps.compare.outputs.changed == 'true'
        run: |
          git config user.name "Aiven Monitor"
          git config user.email "monitor@yourdomain.com"
          mv latest_llms.txt current_llms.txt
          git add current_llms.txt
          git commit -m "Detect changes in Aiven llms.txt"
          git push
```

## Benefits of automated monitoring

By setting this up, you gain three major advantages over checking the site manually:

- **Diff History**: Because the script "commits" the new version to your repo, you can click the **Commits** tab in GitHub to see a line-by-line comparison of what was added or removed.
- **Zero Noise**: You only get a Slack ping when a functional change is made to the document map.
- **LLM Ready**: If you use AI to manage your Aiven services, you can point your AI tool (like an **MCP server**) at your `current_llms.txt` to ensure it always has the most recent documentation context.

## Test the monitoring setup

Once you save the file, go to the **Actions** tab in your GitHub repo, select **Monitor Aiven Docs**, and click **Run workflow**. This performs the first "capture" of the file.

You can expand this script to monitor specific product folders (like only PostgreSQL® or Valkey™).
