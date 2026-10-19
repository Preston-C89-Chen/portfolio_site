// A synthetic LiDAR-style surface, derived from the same normalized footprints
// as the figure-ground map. Source data has no measured elevations.
export const CITY_SIZE = 10;
export type LidarSurface = { positions: Float32Array; roofPositions: Float32Array; intensities: Float32Array; count: number };

export function buildLidarSurface(polygons: number[][][], resolution = 250): LidarSurface {
  const grid = Math.max(32, Math.min(300, Math.floor(resolution)));
  const heights = new Float32Array(grid * grid);
  const step = CITY_SIZE / grid;
  const positions: number[] = [];
  const roofPositions: number[] = [];
  const intensities: number[] = [];
  let seed = 42;
  const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; };
  const push = (x: number, y: number, z: number) => {
    positions.push(x, y, z);
    intensities.push(0.65 + random() * 0.35);
  };
  let wallPoints = 0;
  for (const polygon of polygons) {
    if (polygon.length < 3) continue;
    const minX = Math.max(0, Math.min(...polygon.map(p => p[0])));
    const maxX = Math.min(1, Math.max(...polygon.map(p => p[0])));
    const minY = Math.max(0, Math.min(...polygon.map(p => p[1])));
    const maxY = Math.min(1, Math.max(...polygon.map(p => p[1])));
    if (minX >= maxX || minY >= maxY) continue;
    // Stable, restrained height variation; never presented as measured city data.
    const roof = 0.08 + Math.pow(random(), 2.1) * 0.9;
    for (let row = Math.floor(minY * grid); row < Math.ceil(maxY * grid); row++) {
      const y = (row + 0.5) / grid;
      const crossings: number[] = [];
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const a = polygon[j], b = polygon[i];
        if ((a[1] > y) !== (b[1] > y)) crossings.push(a[0] + (y - a[1]) * (b[0] - a[0]) / (b[1] - a[1]));
      }
      crossings.sort((a,b) => a-b);
      for (let k = 0; k + 1 < crossings.length; k += 2) {
        const start = Math.max(0, Math.ceil(crossings[k] * grid - 0.5));
        const end = Math.min(grid - 1, Math.floor(crossings[k + 1] * grid - 0.5));
        for (let col = start; col <= end; col++) heights[row * grid + col] = Math.max(heights[row * grid + col], roof);
      }
    }
    // Facade returns stay on the building perimeter, including unclosed rings.
    for (let i = 0; i < polygon.length && wallPoints < 42000; i++) {
      const a = polygon[i], b = polygon[(i + 1) % polygon.length];
      const length = Math.hypot(b[0] - a[0], b[1] - a[1]) * CITY_SIZE;
      const samples = Math.min(500, Math.ceil(length / (step * 1.3)));
      for (let n = 0; n < samples && wallPoints < 42000; n++) {
        const t = (n + 0.5) / samples;
        const x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t;
        if (x < 0 || x > 1 || y < 0 || y > 1) continue;
        for (let z = Math.min(step, roof / 3); z < roof && wallPoints < 42000; z += Math.min(step * 1.5, roof / 3)) {
          if (random() < 0.25) continue;
          push((x - 0.5) * CITY_SIZE, (0.5 - y) * CITY_SIZE, z + (random() - 0.5) * 0.008);
          wallPoints++;
        }
      }
    }
  }
  // Fixed surface returns with subtle acquisition jitter. No ground through roofs.
  for (let row = 0; row < grid; row++) {
    for (let col = 0; col < grid; col++) {
      const roof = heights[row * grid + col];
      if (!roof && random() < 0.45) continue;
      const jitter = step * 0.28;
      push((col + 0.5) * step - CITY_SIZE / 2 + (random() - 0.5) * jitter,
        CITY_SIZE / 2 - (row + 0.5) * step + (random() - 0.5) * jitter,
        roof + (random() - 0.5) * 0.009);
      if (roof > 0) roofPositions.push(positions[positions.length - 3], positions[positions.length - 2], roof);
    }
  }
  return { positions: new Float32Array(positions), roofPositions: new Float32Array(roofPositions), intensities: new Float32Array(intensities), count: intensities.length };
}
