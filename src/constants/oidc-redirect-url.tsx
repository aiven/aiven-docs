import React from 'react';

export const OidcRedirectUrlInstruction = ({idpName}: {idpName: string}) => (
  <>
    In {idpName}, add the <strong>Redirect URI</strong> you copied
    from the Aiven Console.
  </>
);
