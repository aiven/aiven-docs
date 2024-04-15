---
title: Update Grafana® service credentials
---

For improved security, it is recommended to periodically update your
credentials.

For Grafana®, a few steps need to be performed manually to do this. You
will need to have access to a web browser, and to have installed `avn`,
the [Aiven CLI tool](https://docs.aiven.io/docs/tools/cli.html).

1.  In the web browser, go to the [Aiven
    Console](https://console.aiven.io/) page for your Grafana service.

2.  Login to the Grafana instance at the Service URI displayed on that
    page, using the `avnadmin` credentials.

3.  In the bottom-left of Grafana is a small avatar displayed above the
    help icon. Hover over it, and click Change password.

    ![Aiven Administrator in Grafana](/images/content/products/grafana/grafana-credentials.png)

4.  Change the password and make a note of it somewhere safe.

5.  Login with `avn` and then run the following command to update the
    stored password in the console:

    ```
    avn service user-password-reset \
      --username avnadmin \
      --new-password <new password noted above> \
      <service name>
    ```

    For example:

    ```
    avn service user-password-reset \
      --username avnadmin \
      --new-password my_super_secure_password \
      my-grafana-service
    ```

6.  Refresh the Aiven Console and the new password should now be
    displayed for the `avnadmin` user.
