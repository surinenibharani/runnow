#!/usr/bin/env node
/**
 * Strip provenance / AI metadata from images (EXIF, XMP, IPTC, C2PA, comments).
 * JPEG: lossless — drops APP1–APP13, APP15, and COM; keeps pixels and JFIF/Adobe.
 * PNG: drops tEXt / zTXt / iTXt / tIME ancillary chunks.
 *
 * Usage: node scripts/strip-image-metadata.mjs <file-or-dir> [...]
 */
import fs from "fs";
import path from "path";

const JPEG_DROP = new Set([
  0xe1, 0xe2, 0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xeb, 0xec, 0xed,
  0xef, 0xfe,
]);

function stripJpeg(data) {
  if (data.length < 4 || data[0] !== 0xff || data[1] !== 0xd8) {
    throw new Error("Not a JPEG");
  }
  const chunks = [Buffer.from([0xff, 0xd8])];
  let i = 2;
  while (i < data.length) {
    if (data[i] !== 0xff) {
      chunks.push(data.subarray(i));
      break;
    }
    while (i < data.length && data[i] === 0xff) i += 1;
    if (i >= data.length) break;
    const marker = data[i++];
    if (marker === 0xd9) {
      chunks.push(Buffer.from([0xff, 0xd9]));
      break;
    }
    if (marker >= 0xd0 && marker <= 0xd7) {
      chunks.push(Buffer.from([0xff, marker]));
      continue;
    }
    if (marker === 0xda) {
      chunks.push(Buffer.from([0xff, marker]));
      chunks.push(data.subarray(i));
      break;
    }
    if (i + 1 >= data.length) break;
    const len = (data[i] << 8) | data[i + 1];
    if (!JPEG_DROP.has(marker)) {
      chunks.push(Buffer.from([0xff, marker]));
      chunks.push(data.subarray(i, i + len));
    }
    i += len;
  }
  return Buffer.concat(chunks);
}

function stripPng(data) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (data.length < 8 || !data.subarray(0, 8).equals(sig)) {
    throw new Error("Not a PNG");
  }
  const keep = new Set(["IHDR", "PLTE", "IDAT", "IEND", "tRNS", "gAMA", "sRGB", "pHYs", "cHRM", "iCCP"]);
  const out = [sig];
  let i = 8;
  while (i + 8 <= data.length) {
    const len = data.readUInt32BE(i);
    const type = data.subarray(i + 4, i + 8).toString("ascii");
    const end = i + 12 + len;
    if (keep.has(type)) out.push(data.subarray(i, end));
    i = end;
    if (type === "IEND") break;
  }
  return Buffer.concat(out);
}

const AI_MARKERS = [/c2pa/i, /jumb/i, /c2ma/i, /openai/i, /chatgpt/i];

function hasAiMarker(buf) {
  const sample = buf.subarray(0, Math.min(buf.length, 256_000)).toString("latin1");
  return AI_MARKERS.some((re) => re.test(sample));
}

function stripFile(file) {
  const before = fs.readFileSync(file);
  let after;
  try {
    if (before[0] === 0xff && before[1] === 0xd8) after = stripJpeg(before);
    else if (before[0] === 0x89 && before[1] === 0x50) after = stripPng(before);
    else {
      console.log(`skip  ${file} (not jpeg/png)`);
      return;
    }
  } catch (err) {
    console.log(`skip  ${file} (${err.message})`);
    return;
  }
  if (after.equals(before) && !hasAiMarker(before)) {
    console.log(`ok    ${file}`);
    return;
  }
  fs.writeFileSync(file, after);
  const still = hasAiMarker(after);
  console.log(
    `${still ? "warn" : "strip"} ${file}  ${before.length} → ${after.length} bytes${still ? " (marker still present)" : ""}`
  );
}

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png"]);

function walk(target, acc = []) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    for (const name of fs.readdirSync(target)) {
      if (name.startsWith(".")) continue;
      walk(path.join(target, name), acc);
    }
  } else if (IMAGE_EXT.has(path.extname(target).toLowerCase())) {
    acc.push(target);
  }
  return acc;
}

const inputs = process.argv.slice(2);
if (inputs.length === 0) {
  console.error("Usage: node scripts/strip-image-metadata.mjs <file-or-dir> [...]");
  process.exit(1);
}

for (const input of inputs) {
  const resolved = path.resolve(input);
  if (!fs.existsSync(resolved)) {
    console.error(`missing ${resolved}`);
    process.exit(1);
  }
  for (const file of walk(resolved)) stripFile(file);
}
