import React from 'react';

interface AIGatewayModelInfoProps {
  variable: string;
}

export default function AIGatewayModelInfo({
  variable,
}: AIGatewayModelInfoProps): JSX.Element {
  return (
    <p>
      <code>aiven-model</code> is the Aiven router, and usage on it is free. To
      use a specific model, set <code>{variable}</code> to that model's name.{' '}
      Named models are billed at the rates shown in the{' '}
      <a href="/docs/products/ai-gateway/model-catalog">model list</a>.
    </p>
  );
}
