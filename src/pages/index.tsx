import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Asterisk from '@site/static/images/Asterisk.svg';
import CurlyBraceRight from '@site/static/images/Curly brace left.svg';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroDecor} aria-hidden="true">
        <CurlyBraceRight className={styles.heroDecoBrace} />
        <Asterisk className={styles.heroDecoAsterisk} />
      </div>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
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
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const llmsTxtUrl = useBaseUrl('llms.txt');
  return (
    <Layout
      title=""
      description={
        'Aiven docs - ' +
        siteConfig.tagline +
        '. One unified platform to stream, store, and serve data on any cloud.'
      }>
      <div
        className="agent-docs-directive"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}>
        For the complete documentation index, see{' '}
        <a href={llmsTxtUrl} tabIndex={-1}>
          llms.txt
        </a>
        . Markdown versions of pages are available with the .md suffix.
      </div>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
