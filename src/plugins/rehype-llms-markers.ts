// Rehype plugin for @signalwire/docusaurus-plugin-llms-txt. It applies the
// data-llms markers that theme components add to the HTML, before the HTML is
// converted to the generated .md files:
// - data-llms="exclude": remove the element and its content
// - data-llms="unwrap": keep the content, remove the element itself
// - data-llms="heading-link": for a link that wraps a heading and other
//   content, link only the heading text, so the URL appears once
// The built HTML pages aren't changed.

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function moveLinkToHeading(link: HastNode): HastNode[] {
  const children = link.children ?? [];
  const heading = children.find(
    (node) => node.type === 'element' && /^h[1-6]$/.test(node.tagName ?? ''),
  );

  if (!heading) {
    return [link];
  }

  heading.children = [
    {
      type: 'element',
      tagName: 'a',
      properties: {href: link.properties?.href},
      children: heading.children ?? [],
    },
  ];

  return children;
}

function applyMarkers(node: HastNode): void {
  if (!node.children) {
    return;
  }

  node.children = node.children.flatMap((child) => {
    if (child.type !== 'element') {
      return [child];
    }

    const marker = child.properties?.dataLlms;

    if (marker === 'exclude') {
      return [];
    }

    applyMarkers(child);

    if (marker === 'heading-link') {
      return moveLinkToHeading(child);
    }

    return marker === 'unwrap' ? (child.children ?? []) : [child];
  });
}

export default function rehypeLlmsMarkers() {
  return (tree: HastNode): void => {
    applyMarkers(tree);
  };
}
