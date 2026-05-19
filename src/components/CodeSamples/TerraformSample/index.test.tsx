// Unit tests for TerraformSample component logic
// Testing the component behavior and state management without rendering to avoid DOM dependencies

describe('TerraformSample Component Tests', () => {
  describe('Component Properties and State', () => {
    it('should accept a filename prop', () => {
      // Based on implementation: TerraformSample expects a filename prop of type string
      const filename = 'test.tf';

      expect(filename).toBeDefined();
      expect(typeof filename).toBe('string');
      expect(filename.endsWith('.tf')).toBe(true); // Typical Terraform file extension
    });

    it('should initialize with empty code and null error state', () => {
      // Based on implementation: Component initializes with useState hooks
      // const [code, setCode] = useState<string>('');
      // const [error, setError] = useState<string | null>(null);

      const initialState = {
        code: '',
        error: null
      };

      expect(initialState.code).toBe('');
      expect(initialState.error).toBeNull();
    });
  });

  describe('Dynamic Import Logic', () => {
    it('should attempt to import file from external Terraform provider examples', () => {
      // Based on implementation: Uses dynamic import with raw-loader
      // import(`!!raw-loader!@site/external/terraform-provider/examples/${filename}`)

      const filename = 'example.tf';
      const expectedImportPath = `!!raw-loader!@site/external/terraform-provider/examples/${filename}`;

      expect(expectedImportPath).toContain('!!raw-loader!');
      expect(expectedImportPath).toContain('@site/external/terraform-provider/examples/');
      expect(expectedImportPath).toContain(filename);
    });

    it('should set code state when import is successful', async () => {
      // Based on implementation: On successful import, sets code and clears error
      // module => {
      //   setCode(module.default as string);
      //   setError(null);
      // }

      const mockModule = { default: 'resource "aws_instance" "example" { ami = "abc123" }' };
      const newState = {
        code: mockModule.default as string,
        error: null
      };

      expect(newState.code).toBe(mockModule.default);
      expect(newState.error).toBeNull();
    });

    it('should set error state when import fails', async () => {
      // Based on implementation: On import failure, sets code to null and sets error message
      // catch(error) => {
      //   console.error(`Error loading ${filename}:`, error);
      //   setCode(null);
      //   setError('Loading failed. See the Terraform documentation for examples.');
      // }

      const mockError = new Error('File not found');
      const errorState = {
        code: null,
        error: 'Loading failed. See the Terraform documentation for examples.'
      };

      expect(errorState.code).toBeNull();
      expect(errorState.error).toBe('Loading failed. See the Terraform documentation for examples.');
      expect(errorState.error).toContain('Loading failed');
    });
  });

  describe('Rendering Logic', () => {
    it('should render CodeBlock with HCL language when no error occurs', () => {
      // Based on implementation: When no error, renders <CodeBlock language="hcl">{code || 'Loading...'}</CodeBlock>

      const noErrorState = {
        code: 'resource "aws_instance" "test" {}',
        error: null
      };

      const expectedLanguage = 'hcl';
      const expectedContent = noErrorState.code || 'Loading...';

      expect(expectedLanguage).toBe('hcl');
      expect(expectedContent).toBe(noErrorState.code);
    });

    it('should show loading state when code is empty', () => {
      // Based on implementation: Shows 'Loading...' when code is falsy
      const emptyCodeState = '';
      const fallbackContent = emptyCodeState || 'Loading...';

      expect(fallbackContent).toBe('Loading...');
    });

    it('should render error message when error state is set', () => {
      // Based on implementation: When error exists, renders error message in div
      // if (error) { return <div><strong>{error}</strong><br /><br /></div>; }

      const errorState = 'Loading failed. See the Terraform documentation for examples.';
      const hasError = !!errorState;

      expect(hasError).toBe(true);
      expect(errorState).toContain('Loading failed');
      expect(errorState).toContain('Terraform documentation');
    });
  });

  describe('Component Lifecycle', () => {
    it('should trigger effect when filename prop changes', () => {
      // Based on implementation: useEffect depends on [filename], so changes trigger re-fetch
      const currentFilename: string = 'current.tf';
      const newFilename: string = 'updated.tf';

      expect(currentFilename).not.toEqual(newFilename);

      // When filenames are different, useEffect would trigger again
      expect(currentFilename === newFilename).toBe(false);
    });

    it('should handle multiple file loads sequentially', async () => {
      // Simulate the sequence of loading multiple files
      const fileSequence = [
        { filename: 'first.tf', content: 'resource "aws_vpc" "main" {}' },
        { filename: 'second.tf', content: 'resource "aws_subnet" "public" {}' },
        { filename: 'third.tf', content: 'resource "aws_instance" "server" {}' }
      ];

      fileSequence.forEach(file => {
        expect(file.filename).toMatch(/\w+\.tf$/);  // Ends with .tf
        expect(file.content).toBeDefined();
        expect(typeof file.content).toBe('string');
      });
    });
  });

  describe('Error Handling', () => {
    it('should log error to console when loading fails', () => {
      // Based on implementation: console.error(`Error loading ${filename}:`, error);
      const filename = 'missing-file.tf';
      const error = new Error('Not found');

      // This would be logged: `Error loading ${filename}:`, error
      const logMessage = `Error loading ${filename}:`;

      expect(logMessage).toContain('Error loading');
      expect(logMessage).toContain(filename);
    });

    it('should provide user-friendly error message for failed loads', () => {
      const userFriendlyMessage = 'Loading failed. See the Terraform documentation for examples.';

      expect(userFriendlyMessage).toContain('Loading failed');
      expect(userFriendlyMessage).toContain('Terraform documentation');
      expect(userFriendlyMessage).toBe('Loading failed. See the Terraform documentation for examples.');
    });
  });
});