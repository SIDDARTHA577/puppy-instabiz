import fs from 'fs';
import path from 'path';

const puppiesPath = path.resolve('src/data/puppies.json');
const familiesPath = path.resolve('src/data/happy-families.json');

const puppies = JSON.parse(fs.readFileSync(puppiesPath, 'utf8'));
const families = JSON.parse(fs.readFileSync(familiesPath, 'utf8'));

let sql = `-- Seed initial puppies and happy families\n\n`;

// Insert puppies
sql += `-- PUPPIES (${puppies.length})\n`;
for (const p of puppies) {
  const slug = (p.slug || p.id).replace(/'/g, "''");
  const name = (p.name || 'Puppy').replace(/'/g, "''");
  const breed = (p.breed || 'Puppy').replace(/'/g, "''");
  const gender = (p.gender || 'Boy').replace(/'/g, "''");
  const age = (p.age || '3 months').replace(/'/g, "''");
  const loc = (p.location_type || 'local').replace(/'/g, "''");
  const status = (p.status || 'available').replace(/'/g, "''");
  const price = (p.price || 'Price on inquiry').replace(/'/g, "''");
  const wash = (p.wash || '#f2be6b').replace(/'/g, "''");
  const tilt = (p.tilt || '0deg').replace(/'/g, "''");
  const cover = (p.cover_image || '').replace(/'/g, "''");
  const desc = (p.description || '').replace(/'/g, "''");

  sql += `INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('${slug}', '${name}', '${breed}', '${gender}', '${age}', '${loc}', '${status}', '${price}', '${wash}', '${tilt}', '${cover}', '${desc}')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;\n`;
}

sql += `\n-- HAPPY FAMILIES (${families.length})\n`;
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

fs.writeFileSync(path.resolve('supabase/seed_data.sql'), sql, 'utf8');
console.log(`Successfully generated supabase/seed_data.sql with ${puppies.length} puppies and ${families.length} families.`);
