/**
 * MCP server URL and Cursor install deep link for `docs/tools/mcp.md`.
 * Change `mcpUrl` here to update every sample on that page.
 */
export const mcpUrl = 'https://mcp.aiven.live/mcp';

export const cursorDeepLink = `cursor://anysphere.cursor-deeplink/mcp/install?name=aiven-mcp&config=${
  typeof btoa !== 'undefined' ? btoa(JSON.stringify({url: mcpUrl})) : ''
}`;
