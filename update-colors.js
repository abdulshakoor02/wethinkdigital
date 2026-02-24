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

    // Hex replacements
    content = content.replace(/#a78bfa/g, '#d1d5db');
    content = content.replace(/#f0abfc/g, '#9ca3af');
    content = content.replace(/#6b46c1/g, '#d1d5db');
    content = content.replace(/#3b82f6/g, '#9ca3af');
    content = content.replace(/text-purple-/g, 'text-gray-');
    content = content.replace(/bg-purple-/g, 'bg-gray-');
    content = content.replace(/border-purple-/g, 'border-gray-');
    content = content.replace(/ring-purple-/g, 'ring-gray-');
    content = content.replace(/shadow-purple-/g, 'shadow-gray-');
    content = content.replace(/from-purple-/g, 'from-gray-');
    content = content.replace(/via-violet-/g, 'via-gray-');
    content = content.replace(/to-fuchsia-/g, 'to-gray-');

    // rgba replacements (RGB values for metallic/silver theme)
    // d1d5db -> 209, 213, 219
    // 9ca3af -> 156, 163, 175
    content = content.replace(/168,\s*85,\s*247/g, '209, 213, 219');
    content = content.replace(/236,\s*72,\s*153/g, '156, 163, 175');
    content = content.replace(/139,\s*92,\s*246/g, '209, 213, 219');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
