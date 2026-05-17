import { measureNaturalWidth, prepareWithSegments, type PreparedTextWithSegments } from "@chenglou/pretext";

export type Rect = { x: number; y: number; w: number; h: number };
export type ThemeMode = "dark" | "light";

export type StarSpec = {
  char: string;
  font: string;
  prepared: PreparedTextWithSegments | null;
  width: number;
  height: number;
  tier: "bright" | "dim";
};

export type AnimatedStar = StarSpec & {
  id: number;
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  orbitAmp: number;
  orbitSpeed: number;
  orbitPhase: number;
  rotation: number;
  spin: number;
  twinklePhase: number;
  zone: "left" | "right" | "center";
};

export type ConstellationEdge = { fromId: number; toId: number };

export type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

const GLYPHS: { char: string; size: number; weight: number; tier: StarSpec["tier"] }[] = [
  { char: ".", size: 7, weight: 600, tier: "dim" },
  { char: "·", size: 9, weight: 600, tier: "dim" },
  { char: "*", size: 9, weight: 500, tier: "dim" },
  { char: "*", size: 11, weight: 600, tier: "bright" },
  { char: "+", size: 10, weight: 500, tier: "bright" }
];

const OBSTACLE_SELECTORS = [".cosmic-occlude", ".site-shell main .surface-card"];

export function buildStarPool(fontFamily: string): StarSpec[] {
  return GLYPHS.map(({ char, size, weight, tier }) => {
    const font = `${weight} ${size}px ${fontFamily}`;
    try {
      const prepared = prepareWithSegments(char, font);
      const width = measureNaturalWidth(prepared);
      return { char, font, prepared, width, height: size, tier };
    } catch {
      return { char, font, prepared: null, width: size * 0.5, height: size, tier };
    }
  });
}

export function collectContentObstacles(pad = 14): Rect[] {
  if (typeof document === "undefined") return [];

  const rects: Rect[] = [];
  for (const selector of OBSTACLE_SELECTORS) {
    for (const node of document.querySelectorAll(selector)) {
      const box = node.getBoundingClientRect();
      if (box.width < 4 || box.height < 4) continue;
      rects.push({
        x: box.left - pad,
        y: box.top - pad,
        w: box.width + pad * 2,
        h: box.height + pad * 2
      });
    }
  }
  return rects;
}

function rectsOverlap(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function starHitbox(x: number, y: number, pad = 6): Rect {
  return { x: x - pad, y: y - pad, w: pad * 2, h: pad * 2 };
}

function hitsObstacle(x: number, y: number, obstacles: Rect[]): boolean {
  const box = starHitbox(x, y);
  return obstacles.some((rect) => rectsOverlap(box, rect));
}

function pickSpec(pool: StarSpec[]): StarSpec {
  const roll = Math.random();
  if (roll < 0.82) return pool[Math.floor(Math.random() * 3)]!;
  return pool[3 + Math.floor(Math.random() * 2)]!;
}

function classifyZone(x: number, width: number): AnimatedStar["zone"] {
  const leftBound = width * 0.28;
  const rightBound = width * 0.72;
  if (x < leftBound) return "left";
  if (x > rightBound) return "right";
  return "center";
}

let nextStarId = 1;

function pushStar(
  stars: AnimatedStar[],
  spec: StarSpec,
  x: number,
  y: number,
  obstacles: Rect[],
  viewportWidth: number
) {
  if (hitsObstacle(x, y, obstacles)) return;
  const orbitAmp = spec.tier === "bright" ? 5 + Math.random() * 4 : 3 + Math.random() * 3;
  stars.push({
    ...spec,
    id: nextStarId++,
    x,
    y,
    homeX: x,
    homeY: y,
    orbitAmp,
    orbitSpeed: 0.12 + Math.random() * 0.14,
    orbitPhase: Math.random() * Math.PI * 2,
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 0.06,
    twinklePhase: Math.random() * Math.PI * 2,
    zone: classifyZone(x, viewportWidth)
  });
}

export function createStarfield(
  width: number,
  height: number,
  pool: StarSpec[],
  obstacles: Rect[],
  target = 48
): AnimatedStar[] {
  const stars: AnimatedStar[] = [];
  const skyH = height * 0.72;
  const cols = width < 768 ? 7 : 10;
  const rows = width < 768 ? 5 : 6;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if ((row + col) % 2 !== 0) continue;
      const spec = pickSpec(pool);
      const x = ((col + 0.5) / cols) * width + (Math.random() - 0.5) * (width / cols) * 0.4;
      const y = ((row + 0.5) / rows) * skyH + (Math.random() - 0.5) * (skyH / rows) * 0.4;
      pushStar(stars, spec, x, y, obstacles, width);
    }
  }

  let attempts = 0;
  while (stars.length < target && attempts < target * 30) {
    attempts += 1;
    const band = height * 0.72;
    const roll = Math.random();
    let x: number, y: number;
    if (roll < 0.3) {
      x = 14 + Math.random() * (width * 0.22);
      y = 20 + Math.random() * band;
    } else if (roll < 0.6) {
      x = width * 0.78 + Math.random() * (width * 0.18);
      y = 20 + Math.random() * band;
    } else {
      x = width * 0.22 + Math.random() * (width * 0.56);
      y = 20 + Math.random() * (band * 0.38);
    }
    pushStar(stars, pickSpec(pool), x, y, obstacles, width);
  }

  return stars;
}

function softRepulsion(x: number, y: number, obstacles: Rect[]): { dx: number; dy: number } {
  let dx = 0;
  let dy = 0;

  for (const rect of obstacles) {
    const cx = rect.x + rect.w / 2;
    const cy = rect.y + rect.h / 2;
    const ox = x - cx;
    const oy = y - cy;
    const dist = Math.hypot(ox, oy) || 1;
    const influence = Math.max(rect.w, rect.h) * 0.72;

    if (dist < influence) {
      const push = ((influence - dist) / influence) * 0.022;
      dx += (ox / dist) * push;
      dy += (oy / dist) * push;
    }
  }

  return { dx, dy };
}

function softClamp(value: number, min: number, max: number, softness = 0.04): number {
  if (value < min) return value + (min - value) * softness;
  if (value > max) return value - (value - max) * softness;
  return value;
}

export function stepStars(
  stars: AnimatedStar[],
  time: number,
  width: number,
  height: number,
  obstacles: Rect[]
) {
  const ceiling = height * 0.76;
  const t = time * 0.001;
  const margin = 12;

  for (const star of stars) {
    const repulse = softRepulsion(star.homeX, star.homeY, obstacles);
    star.homeX += repulse.dx;
    star.homeY += repulse.dy;

    star.homeX += Math.sin(t * 0.09 + star.orbitPhase) * 0.006;
    star.homeY += Math.cos(t * 0.07 + star.orbitPhase * 1.1) * 0.005;

    star.homeX = softClamp(star.homeX, margin, width - margin);
    star.homeY = softClamp(star.homeY, margin, ceiling);

    star.x = star.homeX + Math.sin(t * star.orbitSpeed + star.orbitPhase) * star.orbitAmp;
    star.y = star.homeY + Math.cos(t * star.orbitSpeed * 0.9 + star.orbitPhase) * star.orbitAmp * 0.75;
    star.rotation += star.spin;
  }
}

/**
 * Build stable constellation edges using mutual nearest-neighbor algorithm.
 * Only connects stars in the same zone; edges persist across frames.
 */
export function buildStableConstellation(stars: AnimatedStar[]): ConstellationEdge[] {
  const edges: ConstellationEdge[] = [];
  const maxDist = 72;
  const maxEdgesPerStar = 2;
  const edgeCount = new Map<number, number>();

  const nearestNeighbor = new Map<number, { neighborId: number; dist: number }>();

  for (const star of stars) {
    let bestId = -1;
    let bestDist = maxDist;

    for (const other of stars) {
      if (other.id === star.id) continue;
      if (other.zone !== star.zone) continue;

      const d = Math.hypot(star.x - other.x, star.y - other.y);
      if (d < bestDist) {
        bestDist = d;
        bestId = other.id;
      }
    }

    if (bestId >= 0) {
      nearestNeighbor.set(star.id, { neighborId: bestId, dist: bestDist });
    }
  }

  const addedPairs = new Set<string>();

  for (const [starId, { neighborId }] of nearestNeighbor) {
    const reverse = nearestNeighbor.get(neighborId);
    if (reverse && reverse.neighborId === starId) {
      const pairKey = starId < neighborId ? `${starId}-${neighborId}` : `${neighborId}-${starId}`;
      if (addedPairs.has(pairKey)) continue;

      const countA = edgeCount.get(starId) ?? 0;
      const countB = edgeCount.get(neighborId) ?? 0;
      if (countA >= maxEdgesPerStar || countB >= maxEdgesPerStar) continue;

      edges.push({ fromId: starId, toId: neighborId });
      addedPairs.add(pairKey);
      edgeCount.set(starId, countA + 1);
      edgeCount.set(neighborId, countB + 1);
    }
  }

  for (const [starId, { neighborId, dist }] of nearestNeighbor) {
    const countA = edgeCount.get(starId) ?? 0;
    const countB = edgeCount.get(neighborId) ?? 0;

    if (countA >= maxEdgesPerStar || countB >= maxEdgesPerStar) continue;

    const pairKey = starId < neighborId ? `${starId}-${neighborId}` : `${neighborId}-${starId}`;
    if (addedPairs.has(pairKey)) continue;

    if (dist < maxDist * 0.75) {
      edges.push({ fromId: starId, toId: neighborId });
      addedPairs.add(pairKey);
      edgeCount.set(starId, countA + 1);
      edgeCount.set(neighborId, countB + 1);
    }
  }

  return edges;
}

export function spawnShootingStar(width: number, height: number): ShootingStar {
  const fromLeft = Math.random() > 0.5;
  return {
    x: fromLeft ? -40 : width + 40,
    y: height * (0.05 + Math.random() * 0.28),
    vx: fromLeft ? 10 + Math.random() * 6 : -(10 + Math.random() * 6),
    vy: 2.5 + Math.random() * 3,
    life: 0,
    maxLife: 36 + Math.random() * 16
  };
}

export function stepShootingStars(meteors: ShootingStar[], width: number, height: number): ShootingStar[] {
  const next: ShootingStar[] = [];

  for (const meteor of meteors) {
    meteor.life += 1;
    meteor.x += meteor.vx;
    meteor.y += meteor.vy;
    if (meteor.life < meteor.maxLife && meteor.y < height + 40 && meteor.x > -80 && meteor.x < width + 80) {
      next.push(meteor);
    }
  }

  if (next.length === 0 && Math.random() < 0.004) {
    next.push(spawnShootingStar(width, height));
  }

  return next;
}

function lerpChannel(a: number, b: number, mix: number): number {
  return Math.round(a + (b - a) * mix);
}

function lerpAlpha(a: number, b: number, mix: number): number {
  return a + (b - a) * mix;
}

export function paintStarfield(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  dpr: number,
  stars: AnimatedStar[],
  edges: ConstellationEdge[],
  meteors: ShootingStar[],
  time: number,
  themeMix: number
) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(-1, -1, width + 2, height + 2);
  ctx.globalCompositeOperation = "source-over";

  const starById = new Map<number, AnimatedStar>();
  for (const star of stars) {
    starById.set(star.id, star);
  }

  const mix = Math.max(0, Math.min(1, themeMix));
  const dotR = lerpChannel(255, 37, mix);
  const dotG = lerpChannel(255, 99, mix);
  const dotB = lerpChannel(255, 235, mix);
  const glyphR = lerpChannel(255, 59, mix);
  const glyphG = lerpChannel(255, 130, mix);
  const glyphB = lerpChannel(255, 246, mix);
  const lineR = lerpChannel(186, 59, mix);
  const lineG = lerpChannel(230, 130, mix);
  const lineB = lerpChannel(253, 246, mix);
  const dotFill = `rgba(${dotR},${dotG},${dotB},`;
  const glyphFill = `rgba(${glyphR},${glyphG},${glyphB},`;
  const lineStroke = `rgba(${lineR},${lineG},${lineB},`;
  const twinkleBase = lerpAlpha(0.22, 0.48, mix);
  const twinkleAmp = 0.28;
  const brightBoost = lerpAlpha(0.12, 0.28, mix);
  const lineAlpha = lerpAlpha(0.09, 0.22, mix);
  const dimRadius = lerpAlpha(0.9, 1.15, mix);
  const glyphAlphaBoost = lerpAlpha(0.15, 0.25, mix);
  const edgeStrokeAlpha = lerpAlpha(0.85, 1, mix);

  for (const meteor of meteors) {
    const fade = 1 - meteor.life / meteor.maxLife;
    const meteorAlpha = lerpAlpha(0.55, 0.45, mix) * fade;
    ctx.strokeStyle = `rgba(${lerpChannel(255, 59, mix)},${lerpChannel(255, 130, mix)},${lerpChannel(255, 246, mix)},${meteorAlpha})`;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = fade * 0.85;
    ctx.beginPath();
    ctx.moveTo(meteor.x - meteor.vx * 8, meteor.y - meteor.vy * 8);
    ctx.lineTo(meteor.x, meteor.y);
    ctx.stroke();
  }

  if (edges.length > 0) {
    ctx.lineWidth = lerpAlpha(0.65, 0.85, mix);
    ctx.beginPath();
    for (const edge of edges) {
      const a = starById.get(edge.fromId);
      const b = starById.get(edge.toId);
      if (!a || !b) continue;
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
    }
    ctx.strokeStyle = `${lineStroke}${lineAlpha})`;
    ctx.globalAlpha = edgeStrokeAlpha;
    ctx.stroke();
  }

  for (const star of stars) {
    const twinkle = twinkleBase + twinkleAmp * Math.sin(time * 0.003 + star.twinklePhase);
    const alpha = star.tier === "bright" ? Math.min(0.95, twinkle + brightBoost) : twinkle;

    if (star.tier === "dim") {
      const radius = dimRadius;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `${dotFill}${alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.save();
      ctx.translate(star.x, star.y);
      ctx.rotate((star.rotation * Math.PI) / 180);
      ctx.globalAlpha = alpha;
      ctx.font = star.font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = `${glyphFill}${Math.min(1, alpha + glyphAlphaBoost)})`;
      ctx.fillText(star.char, 0, 0);
      ctx.restore();

      if (alpha > 0.32) {
        ctx.globalAlpha = alpha * 0.4;
        ctx.strokeStyle = `${glyphFill}${alpha * 0.5})`;
        ctx.lineWidth = 0.6;
        const s = 4;
        ctx.beginPath();
        ctx.moveTo(star.x - s, star.y);
        ctx.lineTo(star.x + s, star.y);
        ctx.moveTo(star.x, star.y - s);
        ctx.lineTo(star.x, star.y + s);
        ctx.stroke();
      }
    }
  }

  ctx.globalAlpha = 1;
}
