3. Paste the certificate from the IdP into the **Certificate** field.
4. Optional: Paste or upload a JSON file with configuration details
   for your IdP.
5. Click **Next**.
7. Configure the security options for this IdP and click **Next**.
    -   **Require authentication context**: This lets the IdP enforce
        stricter security measures to help prevent unauthorized access,
        such as requiring multi-factor authentication.
    -   **Require assertion to be signed**: The IdP checks for a digital
        signature. This security measure ensures the integrity and
        authenticity of the assertions by verifying that they were
        issued by a trusted party and have not been tampered with.
    -   **Sign authorization request sent to IdP**: A digital signature is
        added to the request to verify its authenticity and integrity.
    -   **Extend active sessions**: This resets the session duration every time the token
        is used.
    -   **Enable group syncing**: This syncs the group membership from your IdP to the
        Aiven Platform.

        :::note
        - The Aiven Platform doesn't create groups with this feature. It only syncs the
        group membership between the groups in your IdP and the
        [groups you create in Aiven](/docs/platform/howto/manage-groups).
        For user group provisioning, use SCIM.
        - User group membership automatically syncs when a user logs in.
        - The IdP is the single source of truth. If a group in the IdP doesn't exist
          in Aiven, it will be ignored. Likewise, if a user is added to a group in
          Aiven Console but not in the IdP, they will be removed from the Aiven group
          when the group membership syncs.
        :::

8. Optional: Select a user group to add all users who sign up with this IdP to.
9. Click **Finish** to complete the setup.

:::note
If you set up a SAML authentication method before and are now switching
to a new IdP, existing users need to log in with the new account link
URL to finish the setup.
:::
