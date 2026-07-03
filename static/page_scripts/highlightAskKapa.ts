import type {ClientModule} from '@docusaurus/types';

declare global {
  interface Window {
    Kapa?: {
      (command: 'open'): void;
      open?: (opts: {
        mode?: string;
        query?: string;
        submit?: boolean;
      }) => void;
    };
  }
}

const BTN_ID = 'kapa-highlight-ask-btn';
/** Prepended to the user's selection when opening Kapa from highlight-to-ask. */
const HIGHLIGHT_QUERY_PREFIX = 'Tell me more about this:\n\n';

function getSelectedText(): string {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return '';
  return sel.toString().trim();
}

function selectionInsideEditable(): boolean {
  const node = window.getSelection()?.anchorNode;
  if (!node) return false;
  const el =
    node.nodeType === Node.ELEMENT_NODE
      ? (node as Element)
      : node.parentElement;
  if (!el) return false;
  const interactive = el.closest(
    'input, textarea, [contenteditable="true"]',
  );
  return Boolean(interactive);
}

function openKapaWithQuery(text: string): void {
  const k = window.Kapa;
  if (!k) return;
  const query = `${HIGHLIGHT_QUERY_PREFIX}${text}`;
  if (typeof k.open === 'function') {
    k.open({mode: 'ai', query, submit: false});
  } else {
    k('open');
  }
}

function ensureButton(): HTMLButtonElement {
  let btn = document.getElementById(BTN_ID) as HTMLButtonElement | null;
  if (btn) return btn;
  btn = document.createElement('button');
  btn.id = BTN_ID;
  btn.type = 'button';
  btn.textContent = 'Ask AI';
  btn.setAttribute('aria-label', 'Ask AI about selected text');
  btn.className = 'kapa-highlight-ask-button';
  btn.hidden = true;
  document.body.appendChild(btn);
  return btn;
}

function positionButton(btn: HTMLButtonElement): void {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  const top = window.scrollY + rect.top;
  const left = window.scrollX + rect.left + rect.width / 2;
  btn.style.top = `${top}px`;
  btn.style.left = `${left}px`;
}

function hideButton(btn: HTMLButtonElement): void {
  btn.hidden = true;
}

function init(): void {
  const btn = ensureButton();
  let hideTimer: number | undefined;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = getSelectedText();
    if (text) openKapaWithQuery(text);
    hideButton(btn);
    window.getSelection()?.removeAllRanges();
  });

  document.addEventListener(
    'mousedown',
    (e) => {
      const target = e.target as Node;
      if (target !== btn && !btn.contains(target)) {
        window.clearTimeout(hideTimer);
        hideButton(btn);
      }
    },
    true,
  );

  document.addEventListener(
    'mouseup',
    () => {
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        if (selectionInsideEditable()) {
          hideButton(btn);
          return;
        }
        const text = getSelectedText();
        if (!text) {
          hideButton(btn);
          return;
        }
        positionButton(btn);
        btn.hidden = false;
      }, 10);
    },
    true,
  );

  document.addEventListener('selectionchange', () => {
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      if (selectionInsideEditable()) {
        hideButton(btn);
        return;
      }
      const text = getSelectedText();
      if (!text) {
        hideButton(btn);
        return;
      }
      positionButton(btn);
      btn.hidden = false;
    }, 10);
  });
}

if (typeof window !== 'undefined') {
  init();
}

const module: ClientModule = {
  onRouteUpdate() {
    const btn = document.getElementById(BTN_ID) as HTMLButtonElement | null;
    if (btn) hideButton(btn);
    window.getSelection()?.removeAllRanges();
  },
};

export default module;
