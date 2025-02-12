import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="group1">
<TabItem value="gui" label="UpCloud Control Panel" default>
1. Log in to the [UpCloud Control Panel](https://hub.upcloud.com/), and go to **Network** >
   **Private networks**.
1. Find the network to peer, and copy its UUID located under its name.
</TabItem>
<TabItem value="api" label="UpCloud API">
Send a request to the
[get network details](https://developers.upcloud.com/1.3/13-networks/#get-network-details)
UpCloud API endpoint. In the response, you'll get the UpCloud SDN network's UUID.
</TabItem>
</Tabs>
