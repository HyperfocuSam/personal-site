const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MAX_WIDTH = 1200;
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;
const PNG_COMPRESSION = 9;
const SKIP_THRESHOLD = 50 * 1024; // 50KB

let totalOriginalSize = 0;
let totalNewSize = 0;
let processedCount = 0;
let skippedCount = 0;
let webpCount = 0;

function findImages(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findImages(fullPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function optimizeImage(filePath) {
  const stat = fs.statSync(filePath);
  const originalSize = stat.size;
  const ext = path.extname(filePath).toLowerCase();
  const relativePath = path.relative(IMAGES_DIR, filePath);

  if (originalSize < SKIP_THRESHOLD) {
    skippedCount++;
    console.log(`  SKIP  ${relativePath} (${formatSize(originalSize)} < 50KB)`);
    return;
  }

  totalOriginalSize += originalSize;

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Create WebP version
    const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    let webpPipeline = sharp(filePath);
    if (metadata.width > MAX_WIDTH) {
      webpPipeline = webpPipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }
    await webpPipeline.webp({ quality: WEBP_QUALITY }).toFile(webpPath);
    const webpSize = fs.statSync(webpPath).size;
    webpCount++;

    // Resize and compress original
    let pipeline = sharp(filePath);
    let resized = false;
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      resized = true;
    }

    const tmpPath = filePath + '.tmp';
    if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmpPath);
    } else if (ext === '.png') {
      await pipeline.png({ compressionLevel: PNG_COMPRESSION }).toFile(tmpPath);
    }

    const newSize = fs.statSync(tmpPath).size;

    // Only replace if we actually saved space
    if (newSize < originalSize) {
      fs.renameSync(tmpPath, filePath);
      totalNewSize += newSize;
      processedCount++;
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      const resizeNote = resized ? ` [resized ${metadata.width}px -> ${MAX_WIDTH}px]` : '';
      console.log(`  OK    ${relativePath}: ${formatSize(originalSize)} -> ${formatSize(newSize)} (-${savings}%)${resizeNote} | WebP: ${formatSize(webpSize)}`);
    } else {
      fs.unlinkSync(tmpPath);
      totalNewSize += originalSize;
      processedCount++;
      console.log(`  KEEP  ${relativePath}: ${formatSize(originalSize)} (already optimal) | WebP: ${formatSize(webpSize)}`);
    }
  } catch (err) {
    console.error(`  ERR   ${relativePath}: ${err.message}`);
    totalNewSize += originalSize;
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

async function main() {
  console.log(`Scanning ${IMAGES_DIR} for images...\n`);
  const images = findImages(IMAGES_DIR);
  console.log(`Found ${images.length} images.\n`);

  for (const img of images) {
    await optimizeImage(img);
  }

  console.log('\n========== SUMMARY ==========');
  console.log(`Processed:  ${processedCount} images`);
  console.log(`Skipped:    ${skippedCount} images (< 50KB)`);
  console.log(`WebP created: ${webpCount}`);
  if (totalOriginalSize > 0) {
    const totalSavings = ((1 - totalNewSize / totalOriginalSize) * 100).toFixed(1);
    console.log(`Before:     ${formatSize(totalOriginalSize)}`);
    console.log(`After:      ${formatSize(totalNewSize)}`);
    console.log(`Saved:      ${formatSize(totalOriginalSize - totalNewSize)} (-${totalSavings}%)`);
  }
  console.log('=============================');
}

main().catch(console.error);
