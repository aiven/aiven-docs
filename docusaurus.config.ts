import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const currentMonth = new Date().getMonth();
const isJune = currentMonth === 5;

const config: Config = {
  // Testing faster build
  future: {
    experimental_faster: true,
  },
  title: 'Aiven docs',
  tagline: 'Your AI-ready Open Source Data Platform',
  favicon: 'images/favicon.ico',
  url: 'https://aiven.io/',
  baseUrl: process.env.BASEURL || '/docs/',
  organizationName: 'Aiven',
  projectName: 'docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onBrokenAnchors: 'throw',
  trailingSlash: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  markdown: {
    mermaid: true,
  },
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'zd-site-verification',
        content: '1tsz6w2s2we597lbplg9ou',
      },
    },
  ],
  themes: ['@docusaurus/theme-mermaid'],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: process.env.ROUTEBASEPATH || '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/aiven/aiven-docs/blob/main',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        gtag: {
          trackingID: 'G-M6D699CJR0',
          anonymizeIP: true,
        },
        theme: {
          customCss: [
            './src/css/fonts.css',
            './src/css/colors.css',
            './src/css/navbar.css',
            './src/css/admonitions.css',
            './src/css/custom.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  scripts: [
    {src: '/docs/page_scripts/snowplow.js', async: true},
    {
      src: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
      'data-document-language': 'true',
      type: 'text/javascript',
      charset: 'UTF-8',
      'data-domain-script': '0623fbc6-a463-4822-a7a4-fdb5afcc3afb',
    },
    {src: '/docs/page_scripts/onetrust.js', async: true},
    {
      src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
      'data-website-id': '97dbdbe6-f293-4969-9d76-2204feaf543b', // this is not a secret
      'data-project-name': 'Aiven Kapa AI',
      'data-project-color': '#3545BE',
      'data-project-logo': 'https://aiven.io/docs/images/logo-crabby.svg',
      'data-modal-title': 'Ask Aiven docs AI',
      'data-modal-image-width': '38px',
      'data-button-hide': 'true',
      'data-modal-header-bg-color': '#F3F6FF',
      'data-modal-header-border-bottom': '1px solid #CED4DA',
      'data-font-family': 'Inter',
      'data-modal-disclaimer-font-size': '12px',
      'data-modal-disclaimer-text-color': '#4A4B57',
      'data-modal-disclaimer-bg-color': 'transparent',
      'data-modal-ask-ai-input-placeholder': 'Ask me a question about Aiven...',
      'data-modal-disclaimer':
        "This helpful AI assistant is powered by kapa.ai and draws its answers from Aiven's documentation. Just so we're clear, Aiven owns all rights to their docs and anything based on them. Please note that responses might contain errors, and shouldn't be taken as formal advice, and aren't legally binding. By using this assistant, ensure you own necessary rights to your inputs as you let us and our licensees use your input, and you agree to indemnify us for any claims arising from your inputs. Please keep personal info out - kapa.ai's [Privacy Policy](https://www.kapa.ai/content/privacy-policy) applies. We offer this as-is, without warranties, and aren't liable for any damages.",
      async: true,
      // 'data-modal-example-questions': 'example question 1, example question 2'
    },
  ],
  plugins: ['./src/plugins/svg-fix/index.ts', 'docusaurus-plugin-image-zoom'],
  themeConfig: {
    image: 'images/site-preview.png',
    navbar: {
      title: 'aiven',
      logo: {
        alt: 'Aiven docs',
        src: isJune ? 'images/logo-pride.svg' : 'images/logo.svg',
        srcDark: isJune ? 'images/logoDark-pride.svg' : 'images/logoDark.svg',
      },
      items: [
        {
          label: 'Console',
          position: 'left',
          href: 'https://console.aiven.io/login',
        },
        {
          label: 'API reference',
          position: 'left',
          href: 'https://api.aiven.io/doc/',
        },
        {
          label: 'Changelog',
          href: 'https://aiven.io/changelog',
          position: 'left',
        },
        {
          href: 'https://github.com/aiven/aiven-docs',
          label: 'GitHub',
          position: 'left',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          type: 'custom-kapaAIButton',
          position: 'right',
        },
      ],
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    algolia: {
      appId: 'TVLG5RQH07',
      apiKey: '1beac99b8c1f460aca8bfa515a6dda6f',
      indexName: 'aiven',
      contextualSearch: true,
      searchPagePath: 'search',
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Services',
              href: '/docs/products/services',
            },
            {
              label: 'Dev tools',
              href: '/docs/tools',
            },
            {
              label: 'Docs repository',
              href: 'https://github.com/aiven/aiven-docs',
            },
            {
              label: 'Changelog',
              href: 'https://aiven.io/changelog',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Support',
              href: '/docs/platform/howto/support',
            },
            {
              label: 'Company website',
              href: 'https://aiven.io/',
            },
            {
              label: 'Blog',
              href: 'https://aiven.io/blog',
            },
            {
              label: 'Developer center',
              href: 'https://aiven.io/developer',
            },
            {
              label: 'Email the docs team',
              href: 'mailto:docs@aiven.io',
            },
          ],
        },
        {
          title: 'Terms & Policies',
          items: [
            {
              label: 'Terms of Service',
              href: 'https://aiven.io/terms',
            },
            {
              label: 'SLA',
              href: 'https://aiven.io/sla',
            },
            {
              label: 'Privacy Policy',
              href: 'https://aiven.io/privacy',
            },
          ],
        },
        {
          title: "Let's connect",
          items: [
            {
              label: 'Book a demo',
              href: 'https://aiven.io/book-demo',
            },
            {
              label: 'Contact us',
              href: 'https://aiven.io/contact',
            },
            {
              label: 'Careers',
              href: 'https://aiven.io/careers',
            },
            {
              label: 'Subscribe to newsletter',
              href: 'https://aiven.io/newsletter',
            },
            {
              label: 'Events calendar',
              href: 'https://aiven.io/events',
            },
          ],
        },
      ],
      copyright: `Copyright © Aiven 2016–${new Date().getFullYear()}. Apache, Apache Kafka, Kafka, Apache Flink, Flink, Apache Cassandra, and Cassandra are either registered trademarks or trademarks of the Apache Software Foundation in the United States and/or other countries. ClickHouse is a registered trademark of ClickHouse, Inc. https://clickhouse.com. M3, M3 Aggregator, OpenSearch, AlloyDB Omni, PostgreSQL, MySQL, InfluxDB, Grafana, Dragonfly, Valkey, Thanos, Terraform, and Kubernetes are trademarks and property of their respective owners. *Redis is a registered trademark of Redis Ltd. and the Redis box logo is a mark of Redis Ltd. Any rights therein are reserved to Redis Ltd. Any use by Aiven is for referential purposes only and does not indicate any sponsorship, endorsement or affiliation between Redis and Aiven. All product and service names used in this website are for identification purposes only and do not imply endorsement.`,
    },
    prism: {
      theme: prismThemes.nightOwl,
      darkTheme: prismThemes.dracula,
      defaultLanguage: 'bash',
      additionalLanguages: ['bash', 'json', 'php', 'hcl'],
    },
    mermaid: {
      options: {
        maxTextSize: 1000,
      },
    },
    markdown: {
      format: 'mdx',
      mermaid: true,
      mdx1Compat: {
        comments: false,
        admonitions: false,
        headingIds: false,
      },
    },
    zoom: {
      selector: '.markdown > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      },
    },
  } satisfies Preset.ThemeConfig,
  clientModules: [require.resolve('./static/page_scripts/tracking.ts')],
};

export default config;
