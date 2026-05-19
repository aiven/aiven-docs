import ComponentTypes from './ComponentTypes';
import KapaAIButton from '@site/src/components/Buttons/KapaAIButton';

// Mock the original component types
jest.mock('@theme-original/NavbarItem/ComponentTypes', () => ({
  __esModule: true,
  default: {
    'link': 'LinkComponent',
    'dropdown': 'DropdownComponent',
    'localeDropdown': 'LocaleDropdownComponent',
    'search': 'SearchComponent',
    'html': 'HtmlComponent',
  },
}));

// Mock the KapaAIButton component
jest.mock('@site/src/components/Buttons/KapaAIButton', () => {
  const MockKapaAIButton = () => null;
  MockKapaAIButton.displayName = 'MockKapaAIButton';

  return {
    __esModule: true,
    default: MockKapaAIButton,
  };
});

describe('ComponentTypes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should contain all original component types', () => {
    expect(ComponentTypes).toHaveProperty('link');
    expect(ComponentTypes).toHaveProperty('dropdown');
    expect(ComponentTypes).toHaveProperty('localeDropdown');
    expect(ComponentTypes).toHaveProperty('search');
    expect(ComponentTypes).toHaveProperty('html');
    
    expect(ComponentTypes.link).toBe('LinkComponent');
    expect(ComponentTypes.dropdown).toBe('DropdownComponent');
    expect(ComponentTypes.localeDropdown).toBe('LocaleDropdownComponent');
    expect(ComponentTypes.search).toBe('SearchComponent');
    expect(ComponentTypes.html).toBe('HtmlComponent');
  });

  it('should include the custom kapaAIButton component', () => {
    expect(ComponentTypes).toHaveProperty('custom-kapaAIButton');
    expect(ComponentTypes['custom-kapaAIButton']).toBeDefined();
    expect(typeof ComponentTypes['custom-kapaAIButton']).toBe('function'); // Components are functions
  });

  it('should properly extend the original component types', () => {
    // Check that the original properties still exist
    expect(Object.keys(ComponentTypes)).toContain('link');
    expect(Object.keys(ComponentTypes)).toContain('dropdown');
    expect(Object.keys(ComponentTypes)).toContain('localeDropdown');
    expect(Object.keys(ComponentTypes)).toContain('search');
    expect(Object.keys(ComponentTypes)).toContain('html');
    
    // Check that the new property is added
    expect(Object.keys(ComponentTypes)).toContain('custom-kapaAIButton');
    
    // Total count should be original count + 1
    const originalCount = 5; // link, dropdown, localeDropdown, search, html
    expect(Object.keys(ComponentTypes).length).toBe(originalCount + 1);
  });

  it('should preserve all original functionality while adding new component', () => {
    const { 'link': linkOriginal, 'dropdown': dropdownOriginal, 'custom-kapaAIButton': kapaAIButton } = ComponentTypes;

    // Original components should still function as expected
    expect(linkOriginal).toBeDefined();
    expect(dropdownOriginal).toBeDefined();

    // Custom component should be correctly added
    expect(kapaAIButton).toBeDefined();
    expect(typeof kapaAIButton).toBe('function'); // Components are functions
  });
});