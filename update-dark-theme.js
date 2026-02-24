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

    // Backgrounds
    content = content.replace(/bg-white/g, 'bg-[#1e1e20]');
    content = content.replace(/bg-gray-50/g, 'bg-[#18191a]');
    content = content.replace(/bg-gray-100/g, 'bg-[#27272a]');
    
    // Gradients
    content = content.replace(/from-gray-50/g, 'from-[#18191a]');
    content = content.replace(/via-gray-100/g, 'via-[#27272a]');
    content = content.replace(/to-gray-50/g, 'to-[#18191a]');
    
    // Skeletons
    content = content.replace(/bg-gray-900\/10/g, 'bg-white/10');
    content = content.replace(/bg-gray-900\/20/g, 'bg-white/20');

    // Text Colors
    content = content.replace(/text-gray-900/g, 'text-gray-50');
    content = content.replace(/text-gray-800/g, 'text-gray-100');
    content = content.replace(/text-gray-700/g, 'text-gray-200');
    content = content.replace(/text-gray-600/g, 'text-gray-400'); // This handles the text-purple-600 turned to text-gray-600

    // Borders
    content = content.replace(/border-gray-200/g, 'border-gray-800');
    content = content.replace(/border-gray-100/g, 'border-gray-800');
    
    // Rings
    content = content.replace(/ring-gray-200/g, 'ring-gray-800');

    // RGBA replacements for glassmorphism panels (converting white panels to dark panels)
    content = content.replace(/rgba\(255,\s*255,\s*255,/g, 'rgba(24, 25, 26,');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
