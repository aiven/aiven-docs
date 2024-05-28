
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead><tr>
  <td>
    <p class="name">
      <b>custom_domain</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Custom domain</p>
    <div class="description">Serve the web frontend using a custom CNAME pointing to the Aiven DNS name</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>ip_filter</b>&nbsp;<code class="type">array</code>
    </p>
    <p class="title">IP filter</p>
    <div class="description">Allow incoming connections from CIDR address block, e.g. '10.20.0.0/16'</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>service_log</b>&nbsp;<code class="type">boolean,null</code>
    </p>
    <p class="title">Service logging</p>
    <div class="description">Store logs for the service so that they are available in the HTTP API and console.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>static_ips</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Static IP addresses</p>
    <div class="description">Use static public IP addresses</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>m3_version</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">M3 major version (deprecated, use m3aggregator_version)</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>m3aggregator_version</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">M3 major version (the minimum compatible version)</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
</table>
    