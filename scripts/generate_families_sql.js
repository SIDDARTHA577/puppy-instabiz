import fs from 'fs';
import path from 'path';

const familiesPath = path.resolve('src/data/happy-families.json');
const families = JSON.parse(fs.readFileSync(familiesPath, 'utf8'));

let sql = '';
let order = 1;
for (const f of families) {
  const clientName = (f.client_name || 'Happy Family').replace(/'/g, "''");
  const location = (f.location || 'Dubai, UAE').replace(/'/g, "''");
  const story = (f.story || '').replace(/'/g, "''");
  const imageUrl = (f.image_url || '').replace(/'/g, "''");
  const puppyName = (f.puppy_name || '').replace(/'/g, "''");
  const breed = (f.breed || '').replace(/'/g, "''");
  const tilt = (f.tilt || '0deg').replace(/'/g, "''");
  const tape = (f.tape || '#f6d79a').replace(/'/g, "''");
  const date = (f.date || '2026').replace(/'/g, "''");
  const featured = f.is_featured ? 'true' : 'false';

  sql += `INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('${clientName}', '${location}', '${story}', '${imageUrl}', '${puppyName}', '${breed}', '${tilt}', '${tape}', '${date}', ${featured}, ${order});\n`;
  order++;
}

fs.writeFileSync(path.resolve('supabase/seed_families.sql'), sql, 'utf8');
console.log(`Successfully generated supabase/seed_families.sql with ${families.length} families.`);
