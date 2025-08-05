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
      'data-modal-example-questions-title': 'Example questions:',
      'data-modal-example-questions':
        'How do I set up billing for a project in my organization?, How do I migrate data to Aiven for PostgreSQL?, I want to use Terraform to create a Kafka service.',
      'data-example-question-button-hover-bg-color': '#E3E9FF',
      'data-answer-feedback-info-text':
        'You can also provide comments after selecting a rating.',
      'data-modal-ask-ai-input-placeholder': 'Ask any question about Aiven',
      'data-modal-disclaimer':
        "This AI chatbot generates answers based only on Aiven's documentation, changelog, and some webpages. The responses may contain errors.\n\n" +
        'For best results, include information like which tool you are using (Console, API, CLI, Terraform), the service type, and other details.\n\n' +
        "**Don't include personal or sensitive information in your questions.** For more information, review Aiven's [website terms of use](https://aiven.io/website-terms) and kapa.ai's [privacy policy](https://www.kapa.ai/content/privacy-policy).",
    },
    {src: '/docs/page_scripts/kapa-ai-trigger.js'},
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
          title: 'Company',
          items: [
            {
              label: 'About',
              href: 'https://aiven.io/about',
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
              label: 'Blog',
              href: 'https://aiven.io/blog',
            },
            {
              label: 'Events calendar',
              href: 'https://aiven.io/events',
            },
            {
              label: 'Newsletter',
              href: 'https://aiven.io/newsletter',
            },
          ],
        },
        {
          title: 'Product',
          items: [
            {
              label: 'Schedule a demo',
              href: 'https://aiven.io/book-demo',
            },
            {
              label: 'Pricing',
              href: 'https://aiven.io/pricing',
            },
            {
              label: 'Support tiers',
              href: 'https://aiven.io/support-services',
            },
            {
              label: 'Status',
              href: 'https://status.aiven.io',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Terms',
              href: 'https://aiven.io/terms',
            },
            {
              label: 'SLA',
              href: 'https://aiven.io/sla',
            },
            {
              label: 'Privacy policy',
              href: 'https://aiven.io/privacy',
            },
            {
              label: 'Security',
              href: 'https://aiven.io/security-compliance',
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
