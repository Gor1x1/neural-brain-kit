import type { FamilyRule, PluginSettings, VisualParams } from './types';

// Default folder families for a vault laid out by the Karpathy method (raw / wiki / inbox / templates).
// Same family = same colour everywhere. Any other top-level folder gets an automatic colour (autoColor),
// and you can add your own rules in the plugin settings.
export const DEFAULT_RULES: FamilyRule[] = [
  { prefix: 'wiki/projects', color: '#38d2ff', name: 'projects' },
  { prefix: 'wiki/concepts', color: '#4cf08c', name: 'concepts' },
  { prefix: 'wiki/sources', color: '#5b8cff', name: 'sources' },
  { prefix: 'wiki/entities', color: '#8fa6ff', name: 'entities' },
  { prefix: 'raw', color: '#8597b5', name: 'raw' },
  { prefix: 'inbox', color: '#d6a860', name: 'inbox' },
  { prefix: 'templates', color: '#7d8aa3', name: 'templates' },
  { prefix: '*', color: '#cfe0ff', name: 'core' },
];

export const NEURAL_PARAMS: VisualParams = {
  nodeSize: 1,
  microNodes: true,
  microAmount: 1,
  linkOpacity: 1,
  linkCurve: 0.16,
  bloom: 0.4,
  glow: 0.6,
  impulses: true,
  impulseDensity: 1,
  impulseSpeed: 1,
  impulseSize: 1,
  impulseBackground: 0.35,
  ambient: 0.6,
  labelDensity: 0.7,
  clusterLabels: true,
  autoRotate: 0, // the showcase rests when nobody touches it; turn the slider up for a slow turntable
  depthFog: 0.55,
  showUnresolved: true,
  showOrphans: true,
  fpsCap: 60,
  pixelRatioCap: 1.5,
};

export const DAILY_PARAMS: VisualParams = {
  nodeSize: 1.55,
  microNodes: false,
  microAmount: 0.4,
  linkOpacity: 1.5,
  linkCurve: 0.06,
  bloom: 0,
  glow: 0.5,
  impulses: true,
  impulseDensity: 0.7,
  impulseSpeed: 1,
  impulseSize: 1,
  impulseBackground: 0,
  ambient: 0.12,
  labelDensity: 1,
  clusterLabels: true,
  autoRotate: 0,
  depthFog: 0,
  showUnresolved: true,
  showOrphans: true,
  fpsCap: 60,
  pixelRatioCap: 1.5,
};

export const SETTINGS_VERSION = 3; // bump when visual defaults change: saved slider sets are then dropped, structure/colour rules are kept

export const DEFAULT_SETTINGS: PluginSettings = {
  version: SETTINGS_VERSION,
  mode: 'neural',
  neural: { ...NEURAL_PARAMS },
  daily: { ...DAILY_PARAMS },
  rules: DEFAULT_RULES.map((r) => ({ ...r })),
  openIn: 'tab',
  hideFiles: [],
  panelOpen: false,
};

/** Merge saved data over defaults so new keys appear after an update. */
export function mergeSettings(saved: Partial<PluginSettings> | null | undefined): PluginSettings {
  const s = saved ?? {};
  const fresh = (s.version ?? 0) === SETTINGS_VERSION;
  return {
    ...DEFAULT_SETTINGS,
    ...s,
    version: SETTINGS_VERSION,
    neural: { ...NEURAL_PARAMS, ...(fresh ? s.neural ?? {} : { showUnresolved: s.neural?.showUnresolved ?? true, showOrphans: s.neural?.showOrphans ?? true }) },
    daily: { ...DAILY_PARAMS, ...(fresh ? s.daily ?? {} : { showUnresolved: s.daily?.showUnresolved ?? true, showOrphans: s.daily?.showOrphans ?? true }) },
    rules: s.rules && s.rules.length ? s.rules : DEFAULT_RULES.map((r) => ({ ...r })),
    hideFiles: s.hideFiles ?? [],
  };
}
