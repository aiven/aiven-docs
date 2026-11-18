import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {usePluralForm} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';

import type {Props} from '@theme/DocCard';
import Heading from '@theme/Heading';
import type {
  PropSidebarItem,
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

import styles from './styles.module.css';

// Markers for the generated .md files, applied by
// src/plugins/rehype-llms-markers.ts in the llms-txt plugin:
// - exclude: leave the element out of the .md file
// - unwrap: keep the element's content in the .md file, without the element
// - heading-link: link only the card title in the .md file, not the description
type LlmsMarker = 'exclude' | 'unwrap' | 'heading-link';

function useCategoryItemsPlural() {
  const {selectMessage} = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        {count},
      ),
    );
}

// A category has its own page when it links to a doc or a generated index.
// Otherwise its link points to its first page, which isn't the category.
function hasOwnPage(item: PropSidebarItemCategory): boolean {
  return Boolean(item.href) && !item.linkUnlisted;
}

function CardContainer({
  href,
  llms = 'heading-link',
  children,
}: {
  href: string;
  llms?: LlmsMarker;
  children: ReactNode;
}): JSX.Element {
  return (
    <Link
      href={href}
      className={clsx('card padding--md', styles.cardContainer)}
      data-llms={llms}>
      {children}
    </Link>
  );
}

function CardLayout({
  href,
  title,
  description,
  linkLlms,
  descriptionLlms,
}: {
  href: string;
  title: string;
  description?: string;
  linkLlms?: LlmsMarker;
  descriptionLlms?: LlmsMarker;
}): JSX.Element {
  return (
    <CardContainer href={href} llms={linkLlms}>
      <Heading
        as="h2"
        className={clsx('text--truncate', styles.cardTitle)}
        title={title}>
        {title}
      </Heading>
      {description && (
        <p
          className={styles.cardDescription}
          title={description}
          data-llms={descriptionLlms}>
          {description}
        </p>
      )}
    </CardContainer>
  );
}

// Lists every page in a category, nested like the sidebar. It isn't displayed,
// but it's kept in the HTML so the generated .md files list the pages of each
// section. Categories without their own page are listed as plain text, so each
// URL appears once.
function CategoryChildLinks({
  items,
}: {
  items: PropSidebarItem[];
}): JSX.Element | null {
  const listItems = items.flatMap((child, index) => {
    const key = `${child.type}-${index}`;

    if (child.type === 'link') {
      return child.unlisted
        ? []
        : [
            <li key={key}>
              <Link href={child.href}>{child.label}</Link>
            </li>,
          ];
    }

    if (child.type === 'category' && findFirstSidebarItemLink(child)) {
      return [
        <li key={key}>
          {hasOwnPage(child) ? (
            <Link href={child.href}>{child.label}</Link>
          ) : (
            child.label
          )}
          <CategoryChildLinks items={child.items} />
        </li>,
      ];
    }

    return [];
  });

  return listItems.length > 0 ? <ul>{listItems}</ul> : null;
}

function CardCategory({
  item,
}: {
  item: PropSidebarItemCategory;
}): JSX.Element | null {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  return (
    <>
      <CardLayout
        href={href}
        title={item.label}
        description={item.description ?? categoryItemsPlural(item.items.length)}
        linkLlms={hasOwnPage(item) ? undefined : 'unwrap'}
        descriptionLlms={item.description ? undefined : 'exclude'}
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
