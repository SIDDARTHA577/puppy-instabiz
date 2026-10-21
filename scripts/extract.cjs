const fs = require('fs');

function parsePuppyCards() {
  const html = fs.readFileSync('C:/Users/goran/.gemini/antigravity-ide/brain/0567a69d-d6b4-4fe9-ac73-afed254c79f9/.system_generated/steps/14/content.md', 'utf8');

  // Split by <a class="tp-sketch"
  const chunks = html.split('<a class="tp-sketch"');
  const puppies = [];

  for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i].split('</a>')[0];
    
    // href
    const hrefMatch = chunk.match(/href="\/puppies\/([^"]+)"/);
    if (!hrefMatch) continue;
    const slug = hrefMatch[1];

    // style (tilt, wash)
    const styleMatch = chunk.match(/style="([^"]*)"/);
    const style = styleMatch ? styleMatch[1] : '';
    const washMatch = style.match(/--wash:([^;]+)/);
    const wash = washMatch ? washMatch[1].trim() : '#f2be6b';
    const tiltMatch = style.match(/--tilt:([^;]+)/);
    const tilt = tiltMatch ? tiltMatch[1].trim() : '0deg';

    // aria-label
    const ariaMatch = chunk.match(/aria-label="([^"]*)"/);
    const ariaLabel = ariaMatch ? ariaMatch[1] : '';

    // name
    const nameMatch = chunk.match(/<span class="tp-sketch__name font-plush">([^<]+)<\/span>/);
    const name = nameMatch ? nameMatch[1].trim() : slug;

    // meta
    const metaMatch = chunk.match(/<span class="tp-sketch__meta">([^<]+(?:<!-- -->[^<]*)*)<\/span>/);
    const meta = metaMatch ? metaMatch[1].replace(/<!-- -->/g, '').trim() : '';

    // image src or srcSet
    const srcMatch = chunk.match(/src="([^"]+)"/);
    let imgUrl = srcMatch ? srcMatch[1].replace(/&amp;/g, '&') : '';

    const parts = meta.split('·').map(s => s.trim());
    let breed = 'Puppy';
    let gender = 'Boy';
    let age = '2-3 months';
    if (parts.length >= 3) {
      breed = parts[0];
      gender = parts[1].toLowerCase().includes('girl') ? 'Girl' : 'Boy';
      age = parts[2];
    } else if (parts.length === 2) {
      gender = parts[0].toLowerCase().includes('girl') ? 'Girl' : 'Boy';
      age = parts[1];
      if (name.includes('Maltipoo')) breed = 'Maltipoo';
      else if (name.includes('Poodle')) breed = 'Poodle';
      else if (name.includes('Pomeranian')) breed = 'Pomeranian';
      else if (name.includes('Shih Tzu') || name.includes('Shitzu')) breed = 'Shih Tzu';
      else if (name.includes('Cavapoo')) breed = 'Cavapoo';
      else breed = 'Maltipoo';
    }

    puppies.push({
      id: slug,
      slug,
      name,
      breed,
      gender,
      age,
      location_type: ariaLabel.toLowerCase().includes('imported') ? 'imported' : 'local',
      status: ariaLabel.toLowerCase().includes('gone home') ? 'gone_home' : 'available',
      price: 'Price on inquiry',
      wash,
      tilt,
      cover_image: imgUrl.startsWith('http') ? imgUrl : `https://puppy.instabizweb.com${imgUrl}`,
      description: `Meet ${name}: an adorable, healthy, and cheerful ${breed} puppy. Vaccinated, dewormed, and with full vet check documentation.`
    });
  }

  console.log(`Parsed ${puppies.length} puppies.`);
  fs.writeFileSync('src/data/puppies.json', JSON.stringify(puppies, null, 2));
}

parsePuppyCards();
