---
title: Monitor Aiven documentation changes with GitHub Actions
sidebar_label: Doc change monitor
---

Set up automated monitoring of the Aiven documentation to track changes and get notifications when content is updated.

To monitor the [Aiven documentation](https://aiven.io/docs) for changes, set up an
automated GitHub Actions workflow in your own personal or company account.

## Benefits of automated monitoring

By setting this up, you gain three major advantages over checking the site manually:

- **Diff history**: Because the script commits the new version to your repository, you
  can click the **Commits** tab in GitHub to see a line-by-line comparison of what was
  added or removed.
- **Zero noise**: You only get a Slack ping when a functional change is made to the
  document map.
- **LLM ready**: If you use AI to manage your Aiven services, you can point your AI tool
  (like an **MCP server**) at your `current_llms.txt` to ensure it always has the most
  recent documentation context.

## Set up automated monitoring

### Create a monitoring repository

You need a home repository for your monitor. This repository stores the script and a
history of the `llms.txt` file so you can see exactly what changed over time.

1. Log into GitHub and create a repository, for example, `aiven-docs-monitor`.
1. Set this to **Private** if you don't want others to see your monitoring activity.

### Set up notifications

Rather than checking GitHub manually for changes, set up notifications to receive
automatic alerts when changes are detected.

#### Set up Slack notifications

Use a Slack webhook:

1. Create an **Incoming Webhook** in your Slack workspace.
1. In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**.
1. Click **New repository secret** and name it `SLACK_WEBHOOK_URL`. Paste your webhook
   link as the value.

#### Set up email notifications

Configure SMTP credentials:

1. **Set up an email account for sending notifications**:
   - Use an existing Gmail account, or create a new one specifically for notifications.
   - For Gmail, you'll need to create an App Password rather than using your regular
     password.

1. **Create the App Password for Gmail**:
   - Go to your Google Account settings.
   - Navigate to **Security** > **2-Step Verification** > **App passwords**.
   - Select **Mail** and **Other (Custom name)**.
   - Enter `Aiven Docs Monitor` as the name.
   - Copy the generated 16-character password.

1. **Configure GitHub secrets**:
   - In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**.
   - Click **New repository secret** and add:
     - `SMTP_USERNAME`: Your Gmail address (for example, `notifications@example.com`)
     - `SMTP_PASSWORD`: The app password you generated

1. **Update the recipient email**:
   - In the automation script, change `john.doe@example.com` to your email address.
   - You can add multiple recipients by separating emails with commas.

:::note Alternative SMTP providers
You can use other email providers instead of Gmail. Update the `server_address` and
`server_port` in the script accordingly:

- **Outlook.com**: `smtp-mail.outlook.com`, port `587`
- **Yahoo**: `smtp.mail.yahoo.com`, port `587`
- **Custom SMTP**: Contact your email provider for the correct settings
:::

### Create the automation script

Inside your new repository, create a folder path: `.github/workflows/`. Inside that folder,
create a file named `monitor.yml`. Add the following code:

```yaml
name: Monitor Aiven docs
on:
  schedule:
    - cron: '0 9 * * *' # Runs daily at 9:00 AM UTC
  workflow_dispatch: # Allows you to run it manually to test

permissions:
  contents: write

jobs:
  check-changes:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Fetch latest llms.txt
        run: |
          curl -s https://aiven.io/docs/llms.txt -o latest_llms.txt

      - name: Compare and notify
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

      - name: Send slack alert
        if: steps.compare.outputs.changed == 'true'
        env:
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK_URL }}
        run: |
          curl -X POST -H 'Content-type: application/json' \
          --data "{\"text\":\"🔔 *Aiven Docs Update:* Changes detected in llms.txt. View live: https://aiven.io/docs/llms.txt\"}" \
          $SLACK_WEBHOOK

      - name: Send email alert
        if: steps.compare.outputs.changed == 'true'
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 587
          username: ${{ secrets.SMTP_USERNAME }}
          password: ${{ secrets.SMTP_PASSWORD }}
          subject: 🔔 Aiven docs update detected
          to: john.doe@example.com
          from: ${{ secrets.SMTP_USERNAME }}
          body: |
            Hello,

            Changes have been detected in the Aiven documentation llms.txt file.

            🔍 What changed: The llms.txt file has been updated
            📅 Detection time: ${{ github.run_id }} - ${{ github.run_number }}
            🌐 View live document: https://aiven.io/docs/llms.txt
            📊 Workflow run: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}

            This is an automated notification from the Aiven docs monitor.

            Best regards,
            Aiven docs monitor

      - name: Save changes to history
        if: steps.compare.outputs.changed == 'true'
        run: |
          git config user.name "Aiven Monitor"
          git config user.email "monitor@example.com"
          mv latest_llms.txt current_llms.txt
          git add current_llms.txt
          git commit -m "Detect changes in Aiven llms.txt"
          git push
```

:::tip
You can expand this script to monitor specific product folders, like only PostgreSQL® or
Valkey™.
:::

## Test the monitoring setup

Once you save the file, go to the **Actions** tab in your GitHub repository, select
**Monitor Aiven Docs**, and click **Run workflow**. This performs the first capture of the
file.
