import React, {useEffect, useState} from 'react';
import CodeBlock from '@theme/CodeBlock';

interface TerraformSampleProps {
  filename: string;
}

const TerraformSample: React.FC<TerraformSampleProps> = ({filename}) => {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    import(
      `!!raw-loader!@site/external/terraform-provider/examples/${filename}`
    )
      .then((module) => {
        setCode(module.default as string);
        setError(null);
      })
      .catch((error) => {
        console.error(`Error loading ${filename}:`, error);
        setCode(null);
        setError(
          `Loading failed. See the Terraform documentation for example usage.`,
        );
      });
  }, [filename]);

  if (error) {
    // Display the error message in docs
    return (
      <div>
        <strong>{error}</strong>
        <br />
        <br />
      </div>
    );
  }

  return <CodeBlock language="hcl">{code || 'Loading...'}</CodeBlock>;
};

export default TerraformSample;
