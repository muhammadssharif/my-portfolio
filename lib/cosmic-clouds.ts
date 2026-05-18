/** One billowing lobe in a cumulus cluster (local coords). */
export type CloudPuff = {
  x: number;
  y: number;
  r: number;
};

export type CloudKind = "cumulus" | "mist";

export type DriftCloud = {
  id: number;
  x: number;
  y: number;
  scale: number;
  vx: number;
  vy: number;
  phase: number;
  depth: number;
  layer: 0 | 1 | 2;
  kind: CloudKind;
  wander: number;
  puffs: CloudPuff[];
};

export type CloudSprite = {
  canvas: HTMLCanvasElement;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  baseScale: number;
};

/** Luminary anchor — upper-right sky beside nav (matches globals.css) */
const SUN_NX = 0.96;
const SUN_NY = 0.048;

const CUMULUS_A: CloudPuff[] = [
  { x: 28, y: 98, r: 36 },
  { x: 72, y: 102, r: 44 },
  { x: 128, y: 100, r: 50 },
  { x: 188, y: 98, r: 52 },
  { x: 248, y: 96, r: 46 },
  { x: 302, y: 94, r: 38 },
  { x: 48, y: 72, r: 40 },
  { x: 102, y: 68, r: 48 },
  { x: 162, y: 64, r: 56 },
  { x: 222, y: 66, r: 50 },
  { x: 278, y: 70, r: 42 },
  { x: 78, y: 44, r: 44 },
  { x: 138, y: 38, r: 58 },
  { x: 198, y: 40, r: 52 },
  { x: 252, y: 46, r: 40 },
  { x: 118, y: 18, r: 48 },
  { x: 172, y: 14, r: 54 },
  { x: 218, y: 22, r: 38 },
  { x: 152, y: 2, r: 36 },
  { x: 18, y: 82, r: 28 },
  { x: 318, y: 80, r: 26 }
];

const CUMULUS_B: CloudPuff[] = [
  { x: 20, y: 78, r: 32 },
  { x: 58, y: 82, r: 38 },
  { x: 102, y: 80, r: 42 },
  { x: 148, y: 78, r: 40 },
  { x: 192, y: 76, r: 34 },
  { x: 38, y: 56, r: 36 },
  { x: 82, y: 52, r: 44 },
  { x: 128, y: 48, r: 48 },
  { x: 172, y: 50, r: 40 },
  { x: 62, y: 30, r: 38 },
  { x: 108, y: 24, r: 46 },
  { x: 154, y: 26, r: 42 },
  { x: 98, y: 8, r: 34 },
  { x: 140, y: 6, r: 30 }
];

const CUMULUS_C: CloudPuff[] = [
  { x: 8, y: 48, r: 20 },
  { x: 32, y: 50, r: 24 },
  { x: 56, y: 48, r: 22 },
  { x: 78, y: 50, r: 18 },
  { x: 20, y: 32, r: 22 },
  { x: 44, y: 28, r: 26 },
  { x: 68, y: 30, r: 20 },
  { x: 36, y: 12, r: 18 },
  { x: 58, y: 10, r: 20 }
];

const CUMULUS_D: CloudPuff[] = [
  { x: 14, y: 62, r: 26 },
  { x: 48, y: 64, r: 30 },
  { x: 82, y: 62, r: 32 },
  { x: 116, y: 60, r: 28 },
  { x: 30, y: 42, r: 28 },
  { x: 64, y: 38, r: 34 },
  { x: 98, y: 40, r: 30 },
  { x: 52, y: 20, r: 26 },
  { x: 78, y: 16, r: 28 },
  { x: 100, y: 22, r: 22 }
];

/** Wide ribbon banks — parallax mist strips (vavik96-style layers) */
const CUMULUS_MIST: CloudPuff[] = [
  { x: 0, y: 36, r: 72 },
  { x: 100, y: 38, r: 88 },
  { x: 220, y: 34, r: 82 },
  { x: 340, y: 37, r: 90 },
  { x: 460, y: 35, r: 78 },
  { x: 560, y: 36, r: 70 }
];

const PUFF_TEMPLATES = [CUMULUS_A, CUMULUS_B, CUMULUS_C, CUMULUS_D, CUMULUS_MIST] as const;

const PUFF_SPREAD = 1.4;
const PUFF_HEIGHT = 0.66;

type CloudSpawn = {
  x: number;
  y: number;
  scale: number;
  depth: number;
  layer: 0 | 1 | 2;
  kind: CloudKind;
  template: number;
  phase: number;
  vx: number;
  vy: number;
  wander: number;
};

const CLOUD_SPAWNS: CloudSpawn[] = [
  { x: -0.15, y: 0.08, scale: 1.15, depth: 0.62, layer: 0, kind: "mist", template: 4, phase: 0, vx: 0.0009, vy: 0.0002, wander: 0.6 },
  { x: 0.35, y: 0.1, scale: 1.05, depth: 0.58, layer: 0, kind: "mist", template: 4, phase: 2.2, vx: 0.00075, vy: 0.00015, wander: 0.55 },
  { x: 0.75, y: 0.06, scale: 0.95, depth: 0.6, layer: 0, kind: "mist", template: 4, phase: 4.4, vx: 0.00085, vy: 0.00018, wander: 0.5 },
  { x: -0.05, y: 0.04, scale: 0.88, depth: 0.74, layer: 0, kind: "cumulus", template: 2, phase: 1.1, vx: 0.0014, vy: 0.00032, wander: 0.7 },
  { x: 0.52, y: 0.05, scale: 0.82, depth: 0.7, layer: 0, kind: "cumulus", template: 3, phase: 3.3, vx: 0.0012, vy: 0.00028, wander: 0.65 },
  { x: 0.18, y: 0.11, scale: 0.96, depth: 0.8, layer: 1, kind: "cumulus", template: 1, phase: 5.5, vx: 0.0018, vy: 0.00035, wander: 0.85 },
  { x: 0.48, y: 0.09, scale: 0.9, depth: 0.78, layer: 1, kind: "cumulus", template: 3, phase: 6.8, vx: 0.0016, vy: 0.00033, wander: 0.8 },
  { x: 0.78, y: 0.11, scale: 0.86, depth: 0.82, layer: 1, kind: "cumulus", template: 2, phase: 8.1, vx: 0.0017, vy: 0.0003, wander: 0.82 },
  { x: 0.08, y: 0.16, scale: 1, depth: 0.88, layer: 1, kind: "cumulus", template: 0, phase: 9.4, vx: 0.002, vy: 0.00038, wander: 0.9 },
  { x: 0.38, y: 0.14, scale: 0.92, depth: 0.9, layer: 1, kind: "cumulus", template: 1, phase: 10.7, vx: 0.0019, vy: 0.00036, wander: 0.88 },
  { x: 0.62, y: 0.17, scale: 0.84, depth: 0.86, layer: 1, kind: "cumulus", template: 3, phase: 12, vx: 0.0018, vy: 0.00034, wander: 0.86 },
  { x: 0.28, y: 0.2, scale: 0.98, depth: 0.94, layer: 2, kind: "cumulus", template: 0, phase: 13.3, vx: 0.0024, vy: 0.0004, wander: 1 },
  { x: 0.55, y: 0.18, scale: 0.88, depth: 0.92, layer: 2, kind: "cumulus", template: 1, phase: 14.6, vx: 0.0022, vy: 0.00038, wander: 0.95 },
  { x: 0.82, y: 0.21, scale: 0.8, depth: 0.9, layer: 2, kind: "cumulus", template: 2, phase: 15.9, vx: 0.0021, vy: 0.00035, wander: 0.92 },
  { x: 0.12, y: 0.24, scale: 0.86, depth: 0.96, layer: 2, kind: "cumulus", template: 3, phase: 17.2, vx: 0.0023, vy: 0.00032, wander: 0.98 },
  { x: 0.68, y: 0.25, scale: 0.78, depth: 0.98, layer: 2, kind: "cumulus", template: 2, phase: 18.5, vx: 0.002, vy: 0.0003, wander: 0.94 }
];

function spreadPuffs(puffs: CloudPuff[], factor: number): CloudPuff[] {
  const cx = puffs.reduce((sum, p) => sum + p.x, 0) / puffs.length;
  const cy = puffs.reduce((sum, p) => sum + p.y, 0) / puffs.length;
  const radiusScale = 0.94 + (factor - 1) * 0.22;

  return puffs.map((puff) => ({
    x: cx + (puff.x - cx) * factor,
    y: cy + (puff.y - cy) * factor,
    r: puff.r * radiusScale
  }));
}

function flattenPuffs(puffs: CloudPuff[], yScale: number): CloudPuff[] {
  const cy = puffs.reduce((sum, p) => sum + p.y, 0) / puffs.length;

  return puffs.map((puff) => ({
    x: puff.x,
    y: cy + (puff.y - cy) * yScale,
    r: puff.r * (0.9 + yScale * 0.08)
  }));
}

function organicizePuffs(puffs: CloudPuff[], seed: number): CloudPuff[] {
  const cx = puffs.reduce((sum, p) => sum + p.x, 0) / puffs.length;
  const cy = puffs.reduce((sum, p) => sum + p.y, 0) / puffs.length;

  return puffs.map((puff, i) => {
    const n = Math.sin(seed * 0.9 + i * 1.41) * 0.5 + 0.5;
    const m = Math.cos(seed * 1.1 + i * 1.73) * 0.5 + 0.5;
    const xStretch = 1 + (n - 0.5) * 0.16;
    const yJitter = 1 + (m - 0.5) * 0.07;

    return {
      x: cx + (puff.x - cx) * xStretch,
      y: cy + (puff.y - cy) * yJitter,
      r: puff.r * (0.88 + n * 0.2)
    };
  });
}

function buildPuffs(templateIndex: number, phase: number, kind: CloudKind): CloudPuff[] {
  const spread = kind === "mist" ? 1.55 : PUFF_SPREAD;
  const height = kind === "mist" ? 0.52 : PUFF_HEIGHT;
  const raw = [...PUFF_TEMPLATES[templateIndex]!];
  return organicizePuffs(flattenPuffs(spreadPuffs(raw, spread), height), phase);
}

export type CreateCloudsOptions = {
  includeMist?: boolean;
  maxCount?: number;
};

export function createClouds(width: number, height: number, options: CreateCloudsOptions = {}): DriftCloud[] {
  const { includeMist = true, maxCount = CLOUD_SPAWNS.length } = options;

  const spawns = CLOUD_SPAWNS.filter((spawn) => includeMist || spawn.kind !== "mist").slice(0, maxCount);

  return spawns.map((spawn, id) => ({
    id,
    x: width * spawn.x,
    y: height * spawn.y,
    scale: spawn.scale,
    depth: spawn.depth,
    layer: spawn.layer,
    kind: spawn.kind,
    wander: spawn.wander,
    vx: spawn.vx,
    vy: spawn.vy,
    phase: spawn.phase,
    puffs: buildPuffs(spawn.template, spawn.phase, spawn.kind)
  }));
}

export function stepClouds(clouds: DriftCloud[], width: number, height: number, time: number) {
  const t = time * 0.001;

  for (const cloud of clouds) {
    const pace = 0.35 + cloud.depth * 0.65;
    const layerBoost = 1 + cloud.layer * 0.08;

    const wanderX =
      Math.sin(t * 0.042 + cloud.phase) * 14 * cloud.wander +
      Math.sin(t * 0.021 + cloud.phase * 1.65) * 7 * cloud.wander;
    const wanderY =
      Math.cos(t * 0.036 + cloud.phase * 0.85) * 5 * cloud.wander +
      Math.cos(t * 0.018 + cloud.phase * 1.35) * 2.5 * cloud.wander;

    cloud.x +=
      (cloud.vx * layerBoost + Math.sin(t * 0.12 + cloud.phase) * 0.012) * pace + wanderX * 0.012;
    cloud.y +=
      (cloud.vy * layerBoost + Math.cos(t * 0.1 + cloud.phase) * 0.006) * pace + wanderY * 0.01;

    const wrapPad = cloud.kind === "mist" ? 420 : 300;
    const maxX = width + wrapPad;
    const maxY = height * 0.44;

    if (cloud.x < -wrapPad) cloud.x = maxX;
    if (cloud.x > maxX) cloud.x = -wrapPad;
    if (cloud.y < height * 0.015) cloud.vy = Math.abs(cloud.vy);
    if (cloud.y > maxY) cloud.vy = -Math.abs(cloud.vy);
  }
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type Bounds = { minX: number; maxX: number; minY: number; maxY: number; cx: number; bottom: number };

function measurePuffs(puffs: CloudPuff[], scale: number): Bounds {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const puff of puffs) {
    const x = puff.x * scale;
    const y = puff.y * scale;
    const r = puff.r * scale;
    minX = Math.min(minX, x - r);
    maxX = Math.max(maxX, x + r);
    minY = Math.min(minY, y - r);
    maxY = Math.max(maxY, y + r);
  }

  return { minX, maxX, minY, maxY, cx: (minX + maxX) / 2, bottom: maxY };
}

type ScaledPuff = { x: number; y: number; r: number; lit: number };

let maskCanvas: HTMLCanvasElement | null = null;
let maskCtx: CanvasRenderingContext2D | null = null;
let scratchCanvas: HTMLCanvasElement | null = null;
let scratchCtx: CanvasRenderingContext2D | null = null;

const spriteCache = new Map<string, CloudSprite>();

export function clearCloudSpriteCache() {
  spriteCache.clear();
}

function spriteCacheKey(cloudId: number, scaleBucket: number): string {
  return `${cloudId}:${scaleBucket}`;
}

function scaleBucket(scale: number): number {
  return Math.round(scale * 40);
}

function scalePuffsWithLight(puffs: CloudPuff[], scale: number, localW: number, localH: number): ScaledPuff[] {
  const sunX = localW * SUN_NX;
  const sunY = localH * SUN_NY;

  return puffs.map((p) => {
    const x = p.x * scale;
    const y = p.y * scale;
    const dx = x - sunX;
    const dy = y - sunY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const lit = 0.72 + Math.max(0, 1 - dist / (localW * 0.85)) * 0.28;
    return { x, y, r: p.r * scale, lit };
  });
}

function buildSilhouetteMask(
  mctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  puffs: ScaledPuff[],
  offsetX: number,
  offsetY: number,
  soft: boolean
) {
  mctx.setTransform(1, 0, 0, 1, 0, 0);
  mctx.clearRect(0, 0, width, height);
  mctx.globalAlpha = 1;

  const drawAll = (blur: number, radiusScale: number, alphaMul: number) => {
    mctx.filter = `blur(${blur}px)`;
    for (const puff of puffs) {
      mctx.globalAlpha = alphaMul * (0.85 + puff.lit * 0.15);
      mctx.fillStyle = "#ffffff";
      mctx.beginPath();
      mctx.arc(puff.x - offsetX, puff.y - offsetY, puff.r * radiusScale, 0, Math.PI * 2);
      mctx.fill();
    }
  };

  if (soft) {
    drawAll(32, 1.12, 0.55);
    mctx.globalAlpha = 0.65;
    drawAll(18, 1.02, 0.75);
  } else {
    drawAll(26, 1.1, 0.7);
    mctx.globalAlpha = 0.75;
    drawAll(14, 1, 0.85);
    mctx.globalAlpha = 0.55;
    drawAll(5, 0.92, 1);
  }
  mctx.globalAlpha = 1;
  mctx.filter = "none";
}

function ensureMaskSurface(width: number, height: number) {
  if (typeof document === "undefined") return null;

  if (!maskCanvas) {
    maskCanvas = document.createElement("canvas");
    maskCtx = maskCanvas.getContext("2d", { alpha: true });
  }

  if (!maskCtx) return null;

  if (maskCanvas.width !== width || maskCanvas.height !== height) {
    maskCanvas.width = width;
    maskCanvas.height = height;
  }

  return { canvas: maskCanvas, ctx: maskCtx };
}

function ensureScratchSurface(width: number, height: number) {
  if (typeof document === "undefined") return null;

  if (!scratchCanvas) {
    scratchCanvas = document.createElement("canvas");
    scratchCtx = scratchCanvas.getContext("2d", { alpha: true });
  }

  if (!scratchCtx) return null;

  if (scratchCanvas.width !== width || scratchCanvas.height !== height) {
    scratchCanvas.width = width;
    scratchCanvas.height = height;
  }

  return scratchCtx;
}

/** Bakes one cloud at full opacity — blur runs once per resize/scale bucket, not per frame. */
function rasterizeCloud(cloud: DriftCloud, scale: number): CloudSprite | null {
  const isMist = cloud.kind === "mist";
  const bounds = measurePuffs(cloud.puffs, scale);
  const pad = isMist ? 64 : 52;
  const localW = Math.ceil(bounds.maxX - bounds.minX + pad * 2);
  const localH = Math.ceil(bounds.maxY - bounds.minY + pad * 2);
  const offsetX = bounds.minX - pad;
  const offsetY = bounds.minY - pad;
  const spanW = bounds.maxX - bounds.minX;
  const localCx = bounds.cx - offsetX;
  const localBottom = bounds.bottom - offsetY;

  const puffs = scalePuffsWithLight(cloud.puffs, scale, localW, localH);
  const surface = ensureMaskSurface(localW, localH);
  const layer = ensureScratchSurface(localW, localH);
  if (!surface || !layer) return null;

  buildSilhouetteMask(surface.ctx, localW, localH, puffs, offsetX, offsetY, isMist);

  layer.setTransform(1, 0, 0, 1, 0, 0);
  layer.clearRect(0, 0, localW, localH);
  layer.globalCompositeOperation = "source-over";
  layer.globalAlpha = 1;
  layer.filter = "none";

  layer.save();
  layer.filter = `blur(${isMist ? 28 : 20}px)`;
  const base = layer.createRadialGradient(
    localCx,
    localBottom - scale * 3,
    spanW * 0.04,
    localCx,
    localBottom + scale * 6,
    spanW * 0.58
  );
  const glowStrength = isMist ? 0.12 : 0.22;
  base.addColorStop(0, `rgba(253, 186, 116, ${glowStrength})`);
  base.addColorStop(0.5, `rgba(249, 115, 22, ${glowStrength + 0.08})`);
  base.addColorStop(1, "rgba(194, 65, 12, 0)");
  layer.fillStyle = base;
  layer.beginPath();
  layer.ellipse(localCx, localBottom, spanW * 0.5, scale * (isMist ? 12 : 15), 0, 0, Math.PI * 2);
  layer.fill();
  layer.restore();

  layer.globalAlpha = 1;
  layer.drawImage(surface.canvas, 0, 0, localW, localH);

  layer.globalCompositeOperation = "source-in";
  const body = layer.createLinearGradient(localW * 0.5, 0, localW * 0.5, localH);
  if (isMist) {
    body.addColorStop(0, "rgba(255, 255, 255, 0.85)");
    body.addColorStop(0.5, "rgba(255, 237, 213, 0.75)");
    body.addColorStop(1, "rgba(254, 180, 120, 0.65)");
  } else {
    body.addColorStop(0, "rgba(255, 255, 255, 1)");
    body.addColorStop(0.12, "rgba(255, 255, 255, 1)");
    body.addColorStop(0.28, "rgba(255, 250, 245, 1)");
    body.addColorStop(0.42, "rgba(255, 237, 213, 1)");
    body.addColorStop(0.56, "rgba(254, 215, 170, 1)");
    body.addColorStop(0.7, "rgba(253, 186, 116, 1)");
    body.addColorStop(0.84, "rgba(251, 146, 60, 1)");
    body.addColorStop(1, "rgba(249, 115, 22, 1)");
  }
  layer.fillStyle = body;
  layer.fillRect(0, 0, localW, localH);

  layer.globalCompositeOperation = "source-atop";
  const sunX = localW * SUN_NX;
  const sunY = localH * SUN_NY;
  const sunLit = layer.createRadialGradient(sunX, sunY, 0, localW * 0.5, localH * 0.35, localW * 0.75);
  sunLit.addColorStop(0, `rgba(255, 255, 255, ${isMist ? 0.2 : 0.4})`);
  sunLit.addColorStop(0.5, `rgba(255, 248, 235, ${isMist ? 0.06 : 0.1})`);
  sunLit.addColorStop(1, "rgba(255, 255, 255, 0)");
  layer.fillStyle = sunLit;
  layer.fillRect(0, 0, localW, localH);

  if (!isMist) {
    layer.globalCompositeOperation = "source-atop";
    const shadowSide = layer.createLinearGradient(0, localH * 0.35, localW * 0.35, localH);
    shadowSide.addColorStop(0, "rgba(234, 88, 12, 0)");
    shadowSide.addColorStop(0.55, "rgba(249, 115, 22, 0.18)");
    shadowSide.addColorStop(1, "rgba(194, 65, 12, 0.32)");
    layer.fillStyle = shadowSide;
    layer.fillRect(0, 0, localW, localH);

    layer.globalCompositeOperation = "source-atop";
    const sunset = layer.createLinearGradient(0, localH * 0.35, 0, localH);
    sunset.addColorStop(0, "rgba(251, 146, 60, 0)");
    sunset.addColorStop(0.5, "rgba(249, 115, 22, 0.2)");
    sunset.addColorStop(1, "rgba(234, 88, 12, 0.35)");
    layer.fillStyle = sunset;
    layer.fillRect(0, 0, localW, localH);
  }

  layer.globalCompositeOperation = "destination-over";
  layer.filter = "blur(12px)";
  layer.fillStyle = `rgba(234, 88, 12, ${isMist ? 0.05 : 0.09})`;
  layer.beginPath();
  layer.ellipse(localCx, localBottom + scale * 2, spanW * 0.46, scale * (isMist ? 8 : 10), 0, 0, Math.PI * 2);
  layer.fill();
  layer.filter = "none";

  const out = document.createElement("canvas");
  out.width = localW;
  out.height = localH;
  const outCtx = out.getContext("2d", { alpha: true });
  if (!outCtx) return null;
  outCtx.drawImage(scratchCanvas!, 0, 0);

  return {
    canvas: out,
    offsetX,
    offsetY,
    width: localW,
    height: localH,
    baseScale: scale
  };
}

export function getCloudSprite(cloud: DriftCloud, scale: number): CloudSprite | null {
  const bucket = scaleBucket(scale);
  const key = spriteCacheKey(cloud.id, bucket);
  const cached = spriteCache.get(key);
  if (cached) return cached;

  const sprite = rasterizeCloud(cloud, scale);
  if (sprite) spriteCache.set(key, sprite);
  return sprite;
}

export function warmCloudSprites(clouds: DriftCloud[]) {
  for (const cloud of clouds) {
    getCloudSprite(cloud, cloud.scale);
  }
}

/** Gradient-only haze — no per-frame blur filters. */
function paintAtmosphericHaze(ctx: CanvasRenderingContext2D, width: number, height: number, reveal: number) {
  const a = reveal * 0.42;

  ctx.save();
  ctx.globalCompositeOperation = "source-over";

  const skyWash = ctx.createLinearGradient(0, 0, 0, height * 0.48);
  skyWash.addColorStop(0, `rgba(255, 255, 255, ${0.22 * a})`);
  skyWash.addColorStop(0.35, `rgba(255, 244, 232, ${0.12 * a})`);
  skyWash.addColorStop(0.7, `rgba(254, 215, 170, ${0.06 * a})`);
  skyWash.addColorStop(1, "rgba(254, 215, 170, 0)");
  ctx.fillStyle = skyWash;
  ctx.fillRect(0, 0, width, height * 0.5);

  const blobs = [
    { px: 0.15, py: 0.1, rx: 0.38, ry: 0.09, warm: 0.15 },
    { px: 0.55, py: 0.07, rx: 0.42, ry: 0.1, warm: 0.22 },
    { px: 0.85, py: 0.12, rx: 0.35, ry: 0.08, warm: 0.28 },
    { px: 0.38, py: 0.18, rx: 0.45, ry: 0.07, warm: 0.18 }
  ];

  for (const blob of blobs) {
    const hx = width * blob.px;
    const hy = height * blob.py;
    const rx = width * blob.rx;
    const ry = height * blob.ry;

    const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, Math.max(rx, ry));
    g.addColorStop(0, `rgba(255, 252, 248, ${0.28 * a})`);
    g.addColorStop(0.45, `rgba(255, 230, 200, ${(0.14 + blob.warm) * a})`);
    g.addColorStop(1, "rgba(255, 200, 150, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(hx, hy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function paintCloudSprite(
  ctx: CanvasRenderingContext2D,
  cloud: DriftCloud,
  sprite: CloudSprite,
  scale: number,
  alpha: number,
  lift: number,
  viewportW: number
) {
  const isMist = cloud.kind === "mist";
  const depthAlpha = isMist ? 0.38 + cloud.depth * 0.22 : 0.78 + cloud.depth * 0.2;
  const a = alpha * depthAlpha;

  const scaleRatio = scale / sprite.baseScale;
  const drawX = cloud.x + sprite.offsetX;
  const drawY = cloud.y + sprite.offsetY - lift;
  const drawW = sprite.width * scaleRatio;
  const drawH = sprite.height * scaleRatio;

  const screenSunX = viewportW * SUN_NX;
  const localCx = sprite.offsetX + sprite.width * 0.5;
  const distFromSun = Math.abs(drawX + localCx - screenSunX);
  const rimBoost = Math.max(0, 1 - distFromSun / (viewportW * 0.55)) * 0.08;

  ctx.globalAlpha = a * (1 + rimBoost * 0.15);
  ctx.drawImage(sprite.canvas, drawX, drawY, drawW, drawH);
  ctx.globalAlpha = 1;
}

export function paintClouds(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  dpr: number,
  clouds: DriftCloud[],
  time: number,
  reveal: number
) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(-2, -2, width + 4, height + 4);

  if (reveal <= 0.001) return;

  const t = time * 0.001;
  const lift = (1 - reveal) * 24;

  paintAtmosphericHaze(ctx, width, height, reveal);

  const ordered = [...clouds].sort((a, b) => a.depth - b.depth);

  for (const cloud of ordered) {
    const breathe = 1 + Math.sin(t * 0.2 + cloud.phase) * (cloud.kind === "mist" ? 0.006 : 0.012);
    const scale = cloud.scale * breathe;
    const cloudAlpha = reveal * (cloud.kind === "mist" ? 0.55 + cloud.depth * 0.25 : 0.75 + cloud.depth * 0.22);
    const sprite = getCloudSprite(cloud, scale);
    if (!sprite) continue;
    paintCloudSprite(ctx, cloud, sprite, scale, cloudAlpha, lift, width);
  }
}
