const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [32, 72, 96, 128, 144, 152, 180, 192, 384, 512];
const inputImage = path.join(__dirname, '../public/assets/logo-pwa.png');
const outputDir = path.join(__dirname, '../public/icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('Generating PWA icons from ndhvlogo.jpeg...');
  
  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    
    await sharp(inputImage)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(outputPath);
    
    console.log(`✓ Generated ${size}x${size} icon`);
  }
  
  // Generate favicon.ico (32x32)
  const faviconPath = path.join(__dirname, '../app/favicon.ico');
  await sharp(inputImage)
    .resize(32, 32, {
      fit: 'cover',
      position: 'center'
    })
    .png()
    .toFile(faviconPath);
  
  console.log('✓ Generated favicon.ico');
  console.log('\n✅ All icons generated successfully!');
}

generateIcons().catch(console.error);
