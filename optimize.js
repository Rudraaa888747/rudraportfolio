const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const images = [
    { src: 'public/switch-mockup.jpg', dest: 'public/switch-mockup.webp' },
    { src: 'public/travel-mockup.jpg', dest: 'public/travel-mockup.webp' },
    { src: 'public/azure-mockup.png', dest: 'public/azure-mockup.webp' }
  ];

  for (const img of images) {
    if (fs.existsSync(img.src)) {
      await sharp(img.src)
        .sharpen({ sigma: 1.5, m1: 1, m2: 2 }) // Enhances edge clarity
        .modulate({
          brightness: 1.05, // Subtle brightness boost
          saturation: 1.1,  // Subtle saturation boost for popping colors
        })
        .webp({ quality: 90, effort: 6 }) // Convert to webp with high quality for fast loading
        .toFile(img.dest);
      console.log(`Optimized ${img.src} -> ${img.dest}`);
    } else {
      console.log(`Not found: ${img.src}`);
    }
  }
}

optimizeImages().catch(console.error);
