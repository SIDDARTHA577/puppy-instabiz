import https from 'node:https';
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('src/data/happy-families.json', 'utf8'));
console.log('Total items in happy-families.json:', data.length);

async function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        resolve(res.statusCode);
      });
      req.on('error', () => resolve(500));
      req.setTimeout(5000, () => {
        req.destroy();
        resolve(408);
      });
    } catch {
      resolve(500);
    }
  });
}

async function main() {
  console.log('Testing first 15 images...');
  for (let i = 0; i < Math.min(15, data.length); i++) {
    const item = data[i];
    const status = await checkUrl(item.image_url);
    console.log(`[#${i + 1}] ${status} ${item.client_name}: ${item.image_url.slice(0, 80)}...`);
  }
}

main().catch(console.error);
