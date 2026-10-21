const fs = require('fs');

function parseFAQs() {
  const html = fs.readFileSync('C:/Users/goran/.gemini/antigravity-ide/brain/0567a69d-d6b4-4fe9-ac73-afed254c79f9/.system_generated/steps/16/content.md', 'utf8');
  
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (m) {
    try {
      const data = JSON.parse(m[1]);
      if (data.mainEntity) {
        const faqs = data.mainEntity.map((item, index) => {
          const pinColors = ['var(--color-toffee)', 'var(--color-sky-deep)', '#4a8c54', 'var(--color-toffee-deep)', '#8e3f15', '#b3261e'];
          const tilts = ['-1.6deg', '1.2deg', '-0.8deg', '2.1deg', '-1.4deg', '0.9deg', '-2.2deg', '1.5deg', '-0.5deg'];
          return {
            id: `faq-${index + 1}`,
            question: item.name,
            answer: item.acceptedAnswer.text,
            pin: pinColors[index % pinColors.length],
            tilt: tilts[index % tilts.length]
          };
        });
        console.log(`Parsed ${faqs.length} FAQs.`);
        fs.writeFileSync('src/data/faqs.json', JSON.stringify(faqs, null, 2));
      }
    } catch (e) {
      console.error('Error parsing FAQ JSON-LD:', e);
    }
  }
}

parseFAQs();
