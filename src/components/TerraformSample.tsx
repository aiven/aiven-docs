import React, {useEffect, useState} from 'react';
import CodeBlock from '@theme/CodeBlock';

interface TerraformSampleProps {
  filename: string;
}

const TerraformSample: React.FC<TerraformSampleProps> = ({filename}) => {
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    import(
      `!!raw-loader!@site/external/terraform-provider/examples/${filename}`
    )
      .then((module) => setCode(module.default as string))
      .catch((error) => console.error(`Error loading ${filename}:`, error));
  }, [filename]);

  return <CodeBlock language="hcl">{code}</CodeBlock>;
};

export default TerraformSample;
