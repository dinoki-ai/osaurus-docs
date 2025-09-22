import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          Native local LLM server
        </Heading>
        <p className={styles.heroSubtitle}>OpenAI- and Ollama-compatible. Fast, private, Apple&nbsp;Silicon.</p>
        <div className={styles.ctaRow}>
          <Link className="button button--primary button--lg" to="/docs/osaurus/quickstart">
            Quickstart
          </Link>
          <Link className={`button button--lg ${styles.buttonGhost}`} to="/docs/osaurus/api">
            View API
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Local-First AI Runtime for Apple Silicon`}
      description="The fastest and most private AI runtime for Apple Silicon. OpenAI- & Ollama-compatible APIs, streaming, and a native model manager."
    >
      <HomepageHeader />
      <main className="container margin-vert--xl">
        <section className={styles.featuresGrid}>
          <div className={styles.card}>
            <h3>OpenAI & Ollama compatible</h3>
            <p>Use your existing clients and SDKs with `/v1/chat/completions` and `/chat`.</p>
          </div>
          <div className={styles.card}>
            <h3>Fast streaming</h3>
            <p>Low-latency SSE and NDJSON streams optimized for responsive UIs.</p>
          </div>
          <div className={styles.card}>
            <h3>Model manager</h3>
            <p>Browse and download MLX models with size estimates and easy updates.</p>
          </div>
          <div className={styles.card}>
            <h3>Function calling</h3>
            <p>OpenAI-style tools with robust parsing and streaming deltas.</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
