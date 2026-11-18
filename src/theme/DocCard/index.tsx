import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';

import type {Props} from '@theme/DocCard';
import Heading from '@theme/Heading';
import type {
  PropSidebarItem,
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

import styles from './styles.module.css';

function CardContainer({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <Link
      href={href}
      className={clsx('card padding--md', styles.cardContainer)}>
      {children}
    </Link>
  );
}

function CardLayout({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description?: string;
}): JSX.Element {
  return (
    <CardContainer href={href}>
      <Heading
        as="h2"
        className={clsx('text--truncate', styles.cardTitle)}
        title={title}>
        {title}
      </Heading>
      {description && (
        <p className={styles.cardDescription} title={description}>
          {description}
        </p>
      )}
    </CardContainer>
  );
}

// Lists every page in a category, nested like the sidebar. It isn't displayed,
// but it's kept in the HTML so the generated .md files (llms-txt plugin) list
// the pages of each section instead of only the section card.
function CategoryChildLinks({
  items,
}: {
  items: PropSidebarItem[];
}): JSX.Element | null {
  const children = items.flatMap((child) => {
    const href = findFirstSidebarItemLink(child);
    return href && child.type !== 'html' ? [{child, href}] : [];
  });

  if (children.length === 0) {
    return null;
  }

  return (
    <ul>
      {children.map(({child, href}) => (
        <li key={`${child.label}-${href}`}>
          <Link href={href}>{child.label}</Link>
          {child.type === 'category' && (
            <CategoryChildLinks items={child.items} />
          )}
        </li>
      ))}
    </ul>
  );
}

function CardCategory({
  item,
}: {
  item: PropSidebarItemCategory;
}): JSX.Element | null {
  const href = findFirstSidebarItemLink(item);

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  return (
    <>
      <CardLayout
        href={href}
        title={item.label}
        description={item.description}
      />
      <nav hidden aria-label={`${item.label} pages`}>
        <CategoryChildLinks items={item.items} />
      </nav>
    </>
  );
}

function CardLink({item}: {item: PropSidebarItemLink}): JSX.Element {
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      href={item.href}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({item}: Props): JSX.Element {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
