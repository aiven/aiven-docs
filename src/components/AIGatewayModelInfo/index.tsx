import React from 'react';

interface AIGatewayModelInfoProps {
  variable: string;
}

export default function AIGatewayModelInfo({
  variable,
}: AIGatewayModelInfoProps): JSX.Element {
  return (
    <p>
      To use a different model, set <code>{variable}</code> to a model name
      from the{' '}
      <a href="/docs/products/ai-gateway/model-catalog">model list</a> in the
      Aiven Console or from the <code>GET https://ai.aiven.io/v1/models</code>{' '}
      response. Models are billed at the rates shown in the model list.
    </p>
  );
}
