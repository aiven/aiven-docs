import React, {ReactElement} from 'react';
import {Icon} from '@iconify/react';
import * as AivenIcons from '@aivenio/aquarium/icons/index';

function AivenIcon({icon}): ReactElement {
  return <Icon height={22} className="icon" icon={icon} />;
}

export default function ConsoleIcons({name}: {name: string}): ReactElement {
  switch (name) {
    case 'serviceSettings':
      return (
        <>
          <AivenIcon icon={AivenIcons.add} /> <b>Settings</b>
        </>
      );
    case 'services':
      return (
        <>
          <AivenIcon icon={AivenIcons.database} /> <b>Services</b>
        </>
      );
    default:
      return <>test</>;
  }
}
