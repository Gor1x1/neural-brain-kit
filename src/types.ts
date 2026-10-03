// Shared data shapes. RawVault is what Obsidian (or the dev exporter) gives us;
// GraphData is the compact typed-array model the renderer and layout consume.

export interface RawFile {
  path: string;
  headings: { h: string; l: number }[];
  tags: string[];
  fm: Record<string, string>;
}

export interface RawVault {
  files: RawFile[];
  resolved: Record<string, Record<string, number>>;
  unresolved: Record<string, Record<string, number>>;
  bookmarks?: string[];
}

export interface FamilyRule {
  prefix: string; // path prefix, "wiki/concepts" or "projects"; "*" = fallback
  color: string;
  name?: string;
}

export interface Family {
  key: string;
  color: string;
}

export interface Cluster {
  key: string;
  label: string;
  family: number;
  size: number;
  color: string;
}

export const KIND_NOTE = 0;
export const KIND_UNRESOLVED = 1;

export interface GraphData {
  n: number; // macro nodes: notes + unresolved targets
  ids: string[];
  labels: string[];
  kind: Uint8Array;
  family: Uint16Array;
  cluster: Uint16Array;
  degree: Uint16Array;
  inDegree: Uint16Array;
  importance: Float32Array; // 0..1
  accent: Uint8Array;
  radius: Float32Array; // world-space core radius
  microRadius: Float32Array; // radius of the heading halo around the note
  mega: Uint8Array; // very high degree hubs (index.md, log.md): their edges are dimmed
  families: Family[];
  clusters: Cluster[];
  // undirected edges, direction = source -> target (bi = both directions exist)
  e: number;
  eSrc: Uint32Array;
  eDst: Uint32Array;
  eBi: Uint8Array;
  eWeight: Float32Array;
  // CSR adjacency
  adjStart: Uint32Array;
  adjNode: Uint32Array;
  adjEdge: Uint32Array;
  // heading micro-neurons
  m: number;
  mParent: Uint32Array;
  mLevel: Uint8Array;
  mText: string[];
}

export type Mode = 'neural' | 'daily';

export interface VisualParams {
  nodeSize: number;
  microNodes: boolean;
  microAmount: number; // 0..1 share of heading neurons drawn
  linkOpacity: number;
  linkCurve: number;
  bloom: number;
  glow: number;
  impulses: boolean;
  impulseDensity: number;
  impulseSpeed: number;
  impulseSize: number;
  impulseBackground: number; // 0..1 share of traffic outside hover/selection
  ambient: number;
  labelDensity: number;
  clusterLabels: boolean;
  autoRotate: number;
  depthFog: number;
  showUnresolved: boolean;
  showOrphans: boolean;
  fpsCap: number;
  pixelRatioCap: number;
}

export interface PluginSettings {
  version: number;
  mode: Mode;
  neural: VisualParams;
  daily: VisualParams;
  rules: FamilyRule[];
  openIn: 'tab' | 'split' | 'window';
  hideFiles: string[];
  panelOpen: boolean;
}
