import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {FormEvent, useState} from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Asterisk from '@site/static/images/Asterisk.svg';
import CurlyBraceRight from '@site/static/images/Curly brace left.svg';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [question, setQuestion] = useState('');

  const openKapa = (query: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    const trimmedQuery = query.trim();
    const params = new URLSearchParams(window.location.search);
    params.set('openKapa', 'true');

    if (trimmedQuery) {
      params.set('kapaQuery', trimmedQuery);
    } else {
      params.delete('kapaQuery');
    }

    const queryString = params.toString();
    const nextUrl =
      queryString.length > 0
        ? `${window.location.pathname}?${queryString}${window.location.hash}`
        : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState({}, '', nextUrl);

    const kapa = (
      window as Window & {
        Kapa?: (
          command: string,
          options?: {mode?: 'search' | 'ai'; query?: string; submit?: boolean},
        ) => void;
      }
    ).Kapa;

    if (kapa) {
      kapa(
        'open',
        trimmedQuery
          ? {mode: 'ai', query: trimmedQuery, submit: true}
          : undefined,
      );
    }
  };

  const onAskAISubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openKapa(question);
  };

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
            <form className={styles.askAIForm} onSubmit={onAskAISubmit}>
              <input
                type="text"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                className={styles.askAIInput}
                placeholder="Get help or learn more about Aiven's products"
                aria-label="Ask Aiven docs AI"
              />
              <button type="submit" className={styles.askAIButton}>
                Ask AI
              </button>
            </form>
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
      <div className="agent-docs-directive" aria-hidden="true">
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
