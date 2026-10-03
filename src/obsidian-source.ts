// Reads the vault through Obsidian's own metadata cache. Read-only: nothing here
// writes to notes. Obsidian stays the source of truth for links, headings, tags.
import type { App } from 'obsidian';
import type { RawVault } from './types';

interface BookmarkItem { type?: string; path?: string; items?: BookmarkItem[] }

function bookmarkedPaths(app: App): string[] {
  try {
    const plugin = (app as unknown as { internalPlugins?: { getPluginById?: (id: string) => { instance?: { items?: BookmarkItem[] } } | undefined } })
      .internalPlugins?.getPluginById?.('bookmarks');
    const out: string[] = [];
    const walk = (items?: BookmarkItem[]) => {
      for (const it of items ?? []) {
        if (it.type === 'file' && it.path) out.push(it.path);
        if (it.items) walk(it.items);
      }
    };
    walk(plugin?.instance?.items);
    return out;
  } catch {
    return [];
  }
}

export function readVault(app: App): RawVault {
  const raw: RawVault = { files: [], resolved: {}, unresolved: {}, bookmarks: bookmarkedPaths(app) };
  const mc = app.metadataCache;
  for (const f of app.vault.getMarkdownFiles()) {
    const cache = mc.getFileCache(f);
    const fm: Record<string, string> = {};
    for (const [k, v] of Object.entries(cache?.frontmatter ?? {})) {
      if (k !== 'position') fm[k] = Array.isArray(v) ? v.join(',') : String(v);
    }
    raw.files.push({
      path: f.path,
      headings: (cache?.headings ?? []).map((h) => ({ h: h.heading, l: h.level })),
      tags: (cache?.tags ?? []).map((t) => t.tag.replace(/^#/, '')),
      fm,
    });
  }
  raw.resolved = mc.resolvedLinks;
  raw.unresolved = mc.unresolvedLinks;
  return raw;
}
