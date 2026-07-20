import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


1.  In your service, {props.sectionName
      ? <>in the <ConsoleLabel name={props.sectionName}/> section, click <b>Users</b></>
      : <><ConsoleLabel name="serviceusers"/></>
    }.
1.  Click **Add service user** or **Create user**.
1.  Enter a name for your service user.
1.  Set up all the other configuration options. If a password is required,
    a random password is generated automatically. You can change it later.
1.  Click **Add service user**.
