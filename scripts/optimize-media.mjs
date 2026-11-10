import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const files = [];
async function walk(dir) {
  for (const item of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory() && !['optimized', 'videos'].includes(item.name)) await walk(file);
    else if (/\.(jpe?g|png|avif|webp)$/i.test(file)) files.push(file);
  }
}
await walk('public');
await walk('src/assets');
await fs.mkdir('public/optimized', { recursive: true });
let imports = '', entries = '';
for (const [i, file] of files.entries()) {
  const input = await fs.readFile(file);
  const metadata = await sharp(input).metadata();
  const width = Math.min(metadata.width, 1200);
  const height = Math.round(metadata.height * width / metadata.width);
  const id = crypto.createHash('sha256').update(file).update(input).digest('hex').slice(0, 12);
  const prefix = `/optimized/${id}`;
  const variants = [];
  for (const size of [...new Set([320, 640, 960, width].filter(w => w <= width))].sort((a,b)=>a-b)) {
    let output;
    for (const quality of [78, 65, 50, 35]) {
      output = await sharp(input).rotate().resize({ width: size, withoutEnlargement: true }).webp({ quality }).toBuffer();
      if (output.length < 200000) break;
    }
    await fs.writeFile(`public${prefix}-${size}.webp`, output);
    variants.push({ src: `${prefix}-${size}.webp`, width: size });
  }
  let jpg;
  for (const quality of [80, 65, 50, 35]) {
    jpg = await sharp(input).rotate().resize({ width, withoutEnlargement: true }).flatten({ background: '#ffffff' }).jpeg({ quality, mozjpeg: true }).toBuffer();
    if (jpg.length < 200000) break;
  }
  await fs.writeFile(`public${prefix}.jpg`, jpg);
  // Keep source paths working, including transparent logos.
  const ext = path.extname(file).toLowerCase();
  const resized = sharp(input).rotate().resize({ width, withoutEnlargement: true });
  let original = /\.jpe?g$/.test(ext) ? jpg : await resized.toFormat(ext.slice(1), { quality: 70, palette: ext === '.png' }).toBuffer();
  if (original.length > 200000 && ext === '.png') original = await sharp(input).resize({ width: Math.min(width, 800) }).png({ palette: true, quality: 60 }).toBuffer();
  await fs.writeFile(file, original);
  const placeholder = 'data:image/webp;base64,' + (await sharp(input).resize(10).blur().webp({ quality: 30 }).toBuffer()).toString('base64');
  let key;
  if (file.startsWith('src/')) {
    imports += `import image${i} from ${JSON.stringify('../' + file.slice(4))};\n`;
    key = `image${i}`;
  } else key = JSON.stringify('/' + file.slice(7));
  entries += `  [${key}]: ${JSON.stringify({ width, height, placeholder, fallback: prefix + '.jpg', variants })},\n`;
}
await fs.writeFile('src/lib/imageManifest.js', `${imports}\nexport default {\n${entries}};\n`);
console.log(`Optimized ${files.length} source images with WebP sizes, JPEG fallbacks and 10px placeholders.`);
