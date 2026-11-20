// Rehype plugin for @signalwire/docusaurus-plugin-llms-txt. It applies the
// data-llms markers that theme components add to the HTML, before the HTML is
// converted to the generated .md files:
// - data-llms="exclude": remove the element and its content
// - data-llms="unwrap": keep the content, remove the element itself
// - data-llms="heading-link": for a link that wraps a heading and other
//   content, link only the heading text, so the URL appears once
// - data-llms-tag="ul" (or another tag): convert the element to that tag, for
//   example to output a list from div elements that search indexers skip
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
    const tag = child.properties?.dataLlmsTag;

    if (marker === 'exclude') {
      return [];
    }

    if (typeof tag === 'string') {
      child.tagName = tag;
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
