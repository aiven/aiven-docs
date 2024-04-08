//
// Generates a Markdown file from the list of cloud json.
// The output is meant to be included in docs pages such as docs/platform/reference/list_of_clouds.md
//

const axios = require('axios');
const fs = require('fs');
const handlebars = require('handlebars');

const CLOUD_ENTRIES_TEMPLATE = `
{{#each organizedData}}
## {{@key}}

<table>
  <thead>
  <tr>
    <th>Region</th>
    <th>Cloud</th>
    <th>Description</th>
  </tr>
  </thead>
  <tbody>
{{#each this}}
  <tr>
    <td>{{ geo_region }}</td>
    <td>{{ name }}</td>
    <td>{{ description }}</td>
  </tr>
{{/each}}
</tbody>
</table>

{{/each}}
`;

const main = async () => {
  try {
    const response = await axios.get('https://api.aiven.io/v1/clouds');
    const data = response.data.clouds;

    const cloud_entries = data
      .map((cloud) => CloudEntry.fromDict(cloud))
      .sort((a, b) => {
        return (
          a.vendor_code.localeCompare(b.vendor_code) ||
          a.geo_region.localeCompare(b.geo_region) ||
          a.name.localeCompare(b.name)
        );
      });
    const organizedData = {};
    cloud_entries.forEach((cloud) => {
      const vendorName = cloud.vendor_name;

      if (!organizedData[vendorName]) {
        organizedData[vendorName] = [];
      }

      organizedData[vendorName].push(cloud);
    });
    const template = handlebars.compile(CLOUD_ENTRIES_TEMPLATE);
    const result = template({organizedData, prev_vendor_code: null});

    const outputFilename = process.argv[2];
    fs.writeFileSync(outputFilename, result);
    console.log(`👌 Markdown content written to ${outputFilename}`);
  } catch (error) {
    console.error('⚠️ Error fetching data:', error.message);
  }
};

class CloudEntry {
  constructor(description, geo_region, name, vendor_code, vendor_name) {
    this.description = description;
    this.geo_region = geo_region;
    this.name = name;
    this.vendor_code = vendor_code;
    this.vendor_name = vendor_name;
  }

  static fromDict(cloud) {
    const description_parts = cloud.cloud_description
      .split(/[:,-]/)
      .map((part) => part.trim());
    const vendor_name = description_parts.splice(2, 1)[0];
    const description = `${description_parts[0]}, ${description_parts[1]}: ${description_parts[2]}`;
    const cloud_name = cloud.cloud_name;
    const vendor_code = cloud_name.substring(0, cloud_name.indexOf('-'));

    return new CloudEntry(
      description,
      cloud.geo_region.toLowerCase(),
      cloud_name,
      vendor_code,
      vendor_name,
    );
  }
}

main();
