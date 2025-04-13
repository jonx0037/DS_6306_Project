const fs = require('fs');
const path = require('path');

const sourceDir = '../output/plots';
const targetDir = './public/output/plots';

// Create target directory
fs.mkdirSync(targetDir, { recursive: true });

// Copy all plot files
try {
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    if (file.endsWith('.png')) {
      fs.copyFileSync(
        path.join(sourceDir, file),
        path.join(targetDir, file)
      );
      console.log(`Copied ${file} successfully`);
    }
  });

  console.log('All plots copied successfully!');
} catch (error) {
  console.error('Error copying files:', error);
  process.exit(1);
}