const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Because I inverted the Tailwind palette in globals.css, the gray numbers 
    // behave oppositely (900 = light, 50 = dark). 
    // The previous script mapped text-gray-900 to text-gray-50, which applied 
    // a dark color on top of a dark background. So we revert them back to higher 
    // numbers which represent light shades.
    
    // Reverse the erroneous text replacements:
    content = content.replace(/text-gray-50([^0-9])/g, 'text-gray-900$1'); // 900 in my scale is #fafafa (light)
    content = content.replace(/text-gray-100/g, 'text-gray-800'); // 800 is #f4f4f5 (light)
    content = content.replace(/text-gray-200/g, 'text-gray-700'); // 700 is #e4e4e7 (light)
    content = content.replace(/text-gray-400/g, 'text-gray-600'); // 600 is #d4d4d8 (lightish)
    
    // Also fix borders that went too dark
    content = content.replace(/border-gray-800/g, 'border-gray-200'); // 200 is #3f3f46 (dark border for dark mode)

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
