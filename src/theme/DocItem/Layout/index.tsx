import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type {WrapperProps} from '@docusaurus/types';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import SunsetBanner from '@site/src/components/Banners/SunsetBanner';

type Props = WrapperProps<typeof LayoutType>;

// Docs under these path prefixes get a "being sunset" banner above the
// breadcrumbs. Remove an entry once its docs are deleted from the site.
const SUNSET_PRODUCTS: Array<{
  pathPrefix: string;
  productName: string;
}> = [
  {
    pathPrefix: '/docs/products/flink',
    productName: 'Aiven for Apache Flink®',
  },
];

export default function DocItemLayoutWrapper(props: Props): JSX.Element {
  const {metadata} = useDoc();
  const sunsetProduct = SUNSET_PRODUCTS.find(
    ({pathPrefix}) =>
      metadata.permalink === pathPrefix ||
      metadata.permalink.startsWith(`${pathPrefix}/`),
  );

  return (
    <>
      {sunsetProduct && (
        <SunsetBanner productName={sunsetProduct.productName} />
      )}
      <Layout {...props} />
    </>
  );
}
