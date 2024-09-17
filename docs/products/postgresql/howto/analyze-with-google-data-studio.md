---
title: Report and analyze with Google Looker Studio
---

Google Looker Studio (previously Data Studio) allows you to create reports and visualisations of the data in your Aiven for PostgreSQL® database, and combine these with data from many other data sources.

## Variables

These are the values you will need to connect to Google Looker Studio:

 | Variable   | Description                                                                 |
 | ---------- | --------------------------------------------------------------------------- |
 | `HOSTNAME` | Hostname for the PostgreSQL connection, from the service overview page      |
 | `PORT`     | Port for the PostgreSQL connection, from the service overview page          |
 | `DATABASE` | Database Name for the PostgreSQL connection, from the service overview page |
 | `PASSWORD` | `avnadmin` password, from the service overview page                         |

## Prerequisites

1.  You will need a Google account, to access Google Looker Studio.
2.  On the Aiven Console service page for your PostgreSQL database,
    download the CA certificate. The default filename is `ca.pem`.

## Connect your Aiven for PostgreSQL data source to Google Looker Studio

1.  Login to Google and open [Google Looker
    Studio](https://lookerstudio.google.com/overview) .
2.  Select **Create** and choose **Data source**.
3.  Fill in the requested information and agree to the Google terms and
    conditions.
4.  Select the **PostgreSQL** Google Connector.
5.  On the **Basic** tab, set
    -   **Host name** to the `HOSTNAME`
    -   **Port**: to the `PORT`
    -   **Database** to the `DATABASE`
    -   **Username** to `avnadmin`
    -   **Password** to the `PASSWORD`
6.  Select **Enable SSL** and upload your server certificate file,
    `ca.pem`.
7.  Click **AUTHENTICATE**.
8.  Choose the table to be queried, or select **CUSTOM QUERY** to create
    an SQL query.
9.  Click **CONNECT**

You can then proceed to create reports and create visualisations.
