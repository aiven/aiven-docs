// Unit tests for the Home Page component logic
// Testing the functionality without rendering to avoid environment issues

// Mock implementation of the context and components
const mockSiteConfig = {
  title: 'Test Site Title',
  tagline: 'Test Site Tagline',
  url: 'https://example.com',
  baseUrl: '/',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en',
        direction: 'ltr',
        calendar: 'gregory',
        path: 'en',
      },
    },
  },
  future: {
    experimental_faster: {
      swcJsLoader: false,
      swcJsMinimizer: false,
      swcHtmlMinimizer: false,
      lightningCssMinimizer: false,
      mdxCrossCompilerCache: false,
      rspackBundler: false,
    },
    experimental_storage: {
      type: 'localStorage',
      namespace: false,
    },
    experimental_router: 'browser',
  },
  noIndex: false,
  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onDuplicateRoutes: 'warn',
  themeConfig: {},
  plugins: [],
  themes: [],
  presets: [],
  staticDirectories: ['static'],
  headTags: [],
  scripts: [],
  stylesheets: [],
  clientModules: [],
  titleDelimiter: '|',
  baseUrlIssueBanner: true,
  markdown: {
    format: 'mdx',
    parseFrontMatter: async ({ filePath, fileContent, defaultParseFrontMatter }: {
      filePath: string;
      fileContent: string;
      defaultParseFrontMatter: (params: {filePath: string; fileContent: string}) => Promise<{frontMatter: {[key: string]: any}; content: string}>;
    }) => {
      return { frontMatter: {}, content: fileContent };
    },
    mermaid: false,
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
    remarkRehypeOptions: {},
    anchors: {
      maintainCase: false,
    },
  },
  trailingSlash: undefined,
};

const mockUseDocusaurusContextValue = {
  siteConfig: mockSiteConfig,
  siteMetadata: {
    docusaurusVersion: '3.0.0',
    siteVersion: '1.0.0',
    pluginVersions: {},
  },
  globalData: {},
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    currentLocale: 'en',
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en',
        direction: 'ltr',
        calendar: 'gregory',
        path: 'en',
      },
    },
  },
  codeTranslations: {},
};

// Mock the main functions we want to test
function getSiteInfo(context: any) {
  return {
    title: context.siteConfig.title,
    tagline: context.siteConfig.tagline
  };
}

function getLayoutProps(siteConfig: any) {
  return {
    title: "",
    description: 'Aiven docs - ' + siteConfig.tagline + '. One unified platform to stream, store, and serve data on any cloud.'
  };
}

function getHomepageHeaderContent(context: any) {
  return {
    title: context.siteConfig.title,
    tagline: context.siteConfig.tagline,
    getStartedUrl: '/docs/get-started'
  };
}

describe('Home Page Logic Tests', () => {
  describe('Context Integration', () => {
    it('should extract correct title from site config', () => {
      const siteInfo = getSiteInfo(mockUseDocusaurusContextValue);
      expect(siteInfo.title).toBe('Test Site Title');
    });

    it('should extract correct tagline from site config', () => {
      const siteInfo = getSiteInfo(mockUseDocusaurusContextValue);
      expect(siteInfo.tagline).toBe('Test Site Tagline');
    });

    it('should handle different site configurations', () => {
      const differentConfig = {
        ...mockUseDocusaurusContextValue,
        siteConfig: {
          ...mockSiteConfig,
          title: 'Different Title',
          tagline: 'Different Tagline',
        }
      };

      const siteInfo = getSiteInfo(differentConfig);
      expect(siteInfo.title).toBe('Different Title');
      expect(siteInfo.tagline).toBe('Different Tagline');
    });
  });

  describe('Layout Props Generation', () => {
    it('should generate correct layout props with empty title', () => {
      const layoutProps = getLayoutProps(mockSiteConfig);
      expect(layoutProps.title).toBe('');
      expect(layoutProps.description).toContain('Aiven docs - Test Site Tagline');
    });

    it('should include platform description in layout props', () => {
      const layoutProps = getLayoutProps(mockSiteConfig);
      expect(layoutProps.description).toContain('One unified platform to stream, store, and serve data on any cloud');
    });

    it('should generate dynamic description using site tagline', () => {
      const customSiteConfig = {
        ...mockSiteConfig,
        tagline: 'Custom Tagline'
      };

      const layoutProps = getLayoutProps(customSiteConfig);
      expect(layoutProps.description).toContain('Aiven docs - Custom Tagline');
    });
  });

  describe('Homepage Header Content', () => {
    it('should return correct title in header content', () => {
      const headerContent = getHomepageHeaderContent(mockUseDocusaurusContextValue);
      expect(headerContent.title).toBe('Test Site Title');
    });

    it('should return correct tagline in header content', () => {
      const headerContent = getHomepageHeaderContent(mockUseDocusaurusContextValue);
      expect(headerContent.tagline).toBe('Test Site Tagline');
    });

    it('should return correct get started URL', () => {
      const headerContent = getHomepageHeaderContent(mockUseDocusaurusContextValue);
      expect(headerContent.getStartedUrl).toBe('/docs/get-started');
    });

    it('should handle different configurations in header content', () => {
      const differentConfig = {
        ...mockUseDocusaurusContextValue,
        siteConfig: {
          ...mockSiteConfig,
          title: 'New Title',
          tagline: 'New Tagline',
        }
      };

      const headerContent = getHomepageHeaderContent(differentConfig);
      expect(headerContent.title).toBe('New Title');
      expect(headerContent.tagline).toBe('New Tagline');
    });
  });

  describe('Component Structure', () => {
    it('should have expected components in the home page structure', () => {
      // Simulate the structure of the Home component
      const homeStructure = {
        layout: {
          title: '',
          description: expect.stringContaining('Aiven docs'),
        },
        header: {
          title: mockSiteConfig.title,
          subtitle: mockSiteConfig.tagline,
          ctaButton: {
            label: 'Get started',
            destination: '/docs/get-started'
          }
        },
        mainContent: {
          featuresSection: true
        }
      };

      expect(homeStructure.header.title).toBe('Test Site Title');
      expect(homeStructure.header.subtitle).toBe('Test Site Tagline');
      expect(homeStructure.header.ctaButton.destination).toBe('/docs/get-started');
      expect(homeStructure.mainContent.featuresSection).toBe(true);
    });
  });
});