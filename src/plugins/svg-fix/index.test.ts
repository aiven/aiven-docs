import svgFixPlugin from './index';
import path from 'path';

// Mock the path module to control the basename function for testing
jest.mock('path', () => ({
  ...jest.requireActual('path'),
  basename: jest.fn(),
}));

describe('svg-fix plugin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a plugin with the correct name', () => {
    const plugin = svgFixPlugin();
    expect(plugin.name).toBe('svg-fix');
  });

  it('should have a configureWebpack function', () => {
    const plugin = svgFixPlugin();
    expect(plugin.configureWebpack).toBeDefined();
    expect(typeof plugin.configureWebpack).toBe('function');
  });

  it('should handle case where no SVG rule is found in webpack config', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const plugin = svgFixPlugin();
    const mockConfig = {
      module: {
        rules: [],
      },
    };
    
    const result = plugin.configureWebpack(mockConfig, false, { currentBundler: { name: 'webpack', instance: {} as any }, getStyleLoaders: jest.fn(), getJSLoader: jest.fn() }, {});
    expect(result).toEqual({});
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to apply SVG fix, could not find SVG rule in webpack config!'
    );
    
    consoleSpy.mockRestore();
  });

  it('should handle case where no svgr loader is found', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const plugin = svgFixPlugin();
    const mockConfig = {
      module: {
        rules: [
          {
            test: /\.svg$/,
            oneOf: [],
          },
        ],
      },
    };
    
    const result = plugin.configureWebpack(mockConfig, false, { currentBundler: { name: 'webpack', instance: {} as any }, getStyleLoaders: jest.fn(), getJSLoader: jest.fn() }, {});
    expect(result).toEqual({});
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to apply SVG fix, could not find svgr loader in webpack config!'
    );
    
    consoleSpy.mockRestore();
  });

  it('should handle case where no svgo config is found', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const plugin = svgFixPlugin();
    const mockConfig = {
      module: {
        rules: [
          {
            test: /\.svg$/,
            oneOf: [
              {
                use: [
                  {
                    loader: '@svgr/webpack',
                    options: {
                      svgoConfig: {},
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    
    // Simulate case where svgoConfig doesn't have plugins property
    const result = plugin.configureWebpack(mockConfig, false, { currentBundler: { name: 'webpack', instance: {} as any }, getStyleLoaders: jest.fn(), getJSLoader: jest.fn() }, {});
    expect(result).toEqual({});
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to apply SVG fix, could not find svgo config in webpack config!'
    );
    
    consoleSpy.mockRestore();
  });

  it('should add prefixIds plugin to svgo config when properly configured', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    // Mock path.basename to return a predictable value
    const mockBasename = jest.spyOn(path, 'basename').mockReturnValue('test-icon.svg');
    
    const plugin = svgFixPlugin();
    const mockConfig = {
      module: {
        rules: [
          {
            test: /\.svg$/,
            oneOf: [
              {
                use: [
                  {
                    loader: '@svgr/webpack',
                    options: {
                      svgoConfig: {
                        plugins: [],
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    
    const result = plugin.configureWebpack(mockConfig, false, { currentBundler: { name: 'webpack', instance: {} as any }, getStyleLoaders: jest.fn(), getJSLoader: jest.fn() }, {});
    expect(result).toEqual({});
    
    // Check that the prefixIds plugin was added
    const svgoPlugins = mockConfig.module.rules[0].oneOf[0].use[0].options.svgoConfig.plugins;
    expect(svgoPlugins).toHaveLength(1);
    expect(svgoPlugins[0]).toEqual({
      name: 'prefixIds',
      params: {
        delim: '_',
        prefix: expect.any(Function),
        prefixIds: true,
        prefixClassNames: true,
      },
    });
    
    // Test the prefix function
    const prefixFunction = svgoPlugins[0].params.prefix;
    const elementMock = {};
    const fileMock = { path: '/some/path/test-icon.svg' };
    expect(prefixFunction(elementMock, fileMock)).toBe('test-icon');
    
    consoleSpy.mockRestore();
    mockBasename.mockRestore();
  });

  it('should handle edge case where file path is undefined in prefix function', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const mockBasename = jest.spyOn(path, 'basename').mockReturnValue('');
    
    const plugin = svgFixPlugin();
    const mockConfig = {
      module: {
        rules: [
          {
            test: /\.svg$/,
            oneOf: [
              {
                use: [
                  {
                    loader: '@svgr/webpack',
                    options: {
                      svgoConfig: {
                        plugins: [],
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    
    plugin.configureWebpack(mockConfig, false, { currentBundler: { name: 'webpack', instance: {} as any }, getStyleLoaders: jest.fn(), getJSLoader: jest.fn() }, {});

    // Test the prefix function with undefined file
    const svgoPlugins = mockConfig.module.rules[0].oneOf[0].use[0].options.svgoConfig.plugins;
    const prefixFunction = svgoPlugins[0].params.prefix;
    const elementMock = {};
    
    // Should handle undefined file gracefully
    expect(prefixFunction(elementMock, undefined)).toBe('');
    
    consoleSpy.mockRestore();
    mockBasename.mockRestore();
  });

  it('should preserve existing plugins in svgo config', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const mockBasename = jest.spyOn(path, 'basename').mockReturnValue('icon.svg');
    
    const plugin = svgFixPlugin();
    const existingPlugin = { name: 'existing-plugin', active: true };
    const mockConfig = {
      module: {
        rules: [
          {
            test: /\.svg$/,
            oneOf: [
              {
                use: [
                  {
                    loader: '@svgr/webpack',
                    options: {
                      svgoConfig: {
                        plugins: [existingPlugin],
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    
    plugin.configureWebpack(mockConfig, false, { currentBundler: { name: 'webpack', instance: {} as any }, getStyleLoaders: jest.fn(), getJSLoader: jest.fn() }, {});

    const svgoPlugins = mockConfig.module.rules[0].oneOf[0].use[0].options.svgoConfig.plugins;
    expect(svgoPlugins).toHaveLength(2);
    expect(svgoPlugins[0]).toEqual(existingPlugin);
    expect(svgoPlugins[1]).toEqual({
      name: 'prefixIds',
      params: {
        delim: '_',
        prefix: expect.any(Function),
        prefixIds: true,
        prefixClassNames: true,
      },
    });
    
    consoleSpy.mockRestore();
    mockBasename.mockRestore();
  });
});