import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Asterisk from '@site/static/images/Asterisk.svg';
import CurlyBraceLeft from '@site/static/images/Curly brace left.svg';
import Slash from '@site/static/images/Slash.svg';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroDecor} aria-hidden="true">
        <CurlyBraceLeft className={styles.heroDecoBrace} />
        <Asterisk className={styles.heroDecoAsterisk} />
        <Slash className={styles.heroDecoSlash} />
      </div>
      <div className={styles.container}>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={clsx(
              'button button--primary button--lg',
              styles.buttonHome,
            )}
            to="/docs/get-started">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title=""
      description={
        'Aiven docs - ' +
        siteConfig.tagline +
        '. One unified platform to stream, store, and serve data on any cloud.'
      }>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
