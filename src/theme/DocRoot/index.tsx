import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocRoot from '@theme-original/DocRoot';
import type DocRootType from '@theme/DocRoot';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof DocRootType>;

export default function DocRootWrapper(props: Props): JSX.Element {
  const llmsTxtUrl = useBaseUrl('llms.txt');

  return (
    <>
      <div className="agent-docs-directive">
        For the complete documentation index, see{' '}
        <a href={llmsTxtUrl} tabIndex={-1}>
          llms.txt
        </a>
        .
      </div>

      <DocRoot {...props} />
    </>
  );
}
