import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "cities");
const RADIUS = 0.008;
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

const CITIES = [
  { name: "portland", lat: 45.5152, lon: -122.6784 },
  { name: "new-york", lat: 40.7128, lon: -74.006 },
  { name: "paris", lat: 48.8566, lon: 2.3522 },
  { name: "dubai", lat: 25.2048, lon: 55.2708 },
  { name: "rome", lat: 41.9028, lon: 12.4964 },
  { name: "tunis", lat: 36.8065, lon: 10.1815 },
  { name: "osaka", lat: 34.6937, lon: 135.5023 },
  { name: "boston", lat: 42.3601, lon: -71.0589 },
];

async function fetchBuildings(city) {
  const south = city.lat - RADIUS;
  const north = city.lat + RADIUS;
  const west = city.lon - RADIUS;
  const east = city.lon + RADIUS;

  const query = `[out:json][timeout:30];way["building"](${south},${west},${north},${east});out geom;`;

  const res = await fetch(OVERPASS_URL, {
    method: "POST",
    body: `data=${encodeURIComponent(query)}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  const polygons = [];
  for (const el of data.elements) {
    if (!el.geometry || el.geometry.length < 3) continue;
    polygons.push(el.geometry.map((pt) => [
      (pt.lon - west) / (east - west),
      1 - (pt.lat - south) / (north - south),
    ]));
  }

  return { name: city.name, center: [city.lat, city.lon], bounds: [south, west, north, east], buildingCount: polygons.length, polygons };
}

async function main() {
  for (const city of CITIES) {
    const outPath = join(OUT_DIR, `${city.name}.json`);
    if (existsSync(outPath)) { console.log(`  skip ${city.name}`); continue; }
    try {
      console.log(`Fetching ${city.name}...`);
      const result = await fetchBuildings(city);
      writeFileSync(outPath, JSON.stringify(result));
      console.log(`  ✓ ${city.name}: ${result.buildingCount} buildings`);
    } catch (err) {
      console.error(`  ✗ ${city.name}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 5000));
  }
}

main();
