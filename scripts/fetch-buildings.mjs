/**
 * Fetch building footprints from OpenStreetMap Overpass API
 * for all cities and save as JSON for the figure-ground hero.
 *
 * Usage: node scripts/fetch-buildings.mjs
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "cities");

// ~0.008 degrees ≈ 800m radius — good density for figure-ground
const RADIUS = 0.008;

const CITIES = [
  { name: "portland", lat: 45.5152, lon: -122.6784 },
  { name: "new-york", lat: 40.7128, lon: -74.006 },
  { name: "sacramento", lat: 38.5816, lon: -121.4944 },
  { name: "irvine", lat: 33.6846, lon: -117.8265 },
  { name: "paris", lat: 48.8566, lon: 2.3522 },
  { name: "dubai", lat: 25.2048, lon: 55.2708 },
  { name: "rome", lat: 41.9028, lon: 12.4964 },
  { name: "tunis", lat: 36.8065, lon: 10.1815 },
  { name: "osaka", lat: 34.6937, lon: 135.5023 },
  { name: "san-francisco", lat: 37.7749, lon: -122.4194 },
  { name: "atlanta", lat: 33.749, lon: -84.388 },
  { name: "boston", lat: 42.3601, lon: -71.0589 },
];

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

async function fetchBuildings(city) {
  const south = city.lat - RADIUS;
  const north = city.lat + RADIUS;
  const west = city.lon - RADIUS;
  const east = city.lon + RADIUS;

  const query = `
    [out:json][timeout:30];
    (
      way["building"](${south},${west},${north},${east});
    );
    out geom;
  `;

  console.log(`Fetching ${city.name}...`);
  const res = await fetch(OVERPASS_URL, {
    method: "POST",
    body: `data=${encodeURIComponent(query)}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  if (!res.ok) {
    throw new Error(`Overpass API error for ${city.name}: ${res.status}`);
  }

  const data = await res.json();

  // Convert to normalized polygons (0-1 range relative to bounding box)
  const polygons = [];
  for (const el of data.elements) {
    if (!el.geometry || el.geometry.length < 3) continue;
    const poly = el.geometry.map((pt) => [
      (pt.lon - west) / (east - west),
      1 - (pt.lat - south) / (north - south), // flip Y for screen coords
    ]);
    polygons.push(poly);
  }

  return {
    name: city.name,
    center: [city.lat, city.lon],
    bounds: [south, west, north, east],
    buildingCount: polygons.length,
    polygons,
  };
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  for (const city of CITIES) {
    try {
      const result = await fetchBuildings(city);
      const outPath = join(OUT_DIR, `${city.name}.json`);
      writeFileSync(outPath, JSON.stringify(result));
      console.log(
        `  ✓ ${city.name}: ${result.buildingCount} buildings (${(JSON.stringify(result).length / 1024).toFixed(0)}KB)`
      );
      // Rate limit: wait 2s between requests
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  ✗ ${city.name}: ${err.message}`);
    }
  }

  console.log("\nDone! Files saved to public/cities/");
}

main();
