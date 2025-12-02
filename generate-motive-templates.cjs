const fs = require('fs');
const path = require('path');

// Function to clean up display names
function cleanDisplayName(name) {
  return name
    .replace(/\.(html|txt)$/, '')  // Remove file extensions
    .replace(/-/g, ' ')            // Replace hyphens with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
}

const motiveDir = 'public/motive';
const brands = fs.readdirSync(motiveDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== '.DS_Store')
  .map(dirent => dirent.name);

const templates = [];

brands.forEach(brand => {
  const brandPath = path.join(motiveDir, brand);
  const items = fs.readdirSync(brandPath, { withFileTypes: true });

  items.forEach(item => {
    if (item.isFile() && (item.name.endsWith('.html') || item.name.endsWith('.txt'))) {
      // File directly in brand folder
      const baseName = cleanDisplayName(item.name);
      const displayName = `${brand.toUpperCase()} / ${baseName}`;
      templates.push(`  { name: '${displayName}', fileName: '${item.name}', category: 'base-temp', path: '/src/content/motive/pages/${brand}/${item.name}', brand: '${brand}', project: null },`);
    } else if (item.isDirectory()) {
      // Project folder
      const projectPath = path.join(brandPath, item.name);
      const files = fs.readdirSync(projectPath)
        .filter(file => file.endsWith('.html') || file.endsWith('.txt'));

      files.forEach(file => {
        const baseName = cleanDisplayName(file);
        const cleanProjectName = cleanDisplayName(item.name);
        const displayName = `${brand.toUpperCase()} / ${cleanProjectName} / ${baseName}`;
        templates.push(`  { name: '${displayName}', fileName: '${file}', category: 'base-temp', path: '/src/content/motive/pages/${brand}/${item.name}/${file}', brand: '${brand}', project: '${item.name}' },`);
      });
    }
  });
});

const output = templates.join('\n');
console.log(output);

// Write to file
fs.writeFileSync('motive-generated.txt', output);
console.log(`\n\nGenerated ${templates.length} motive templates and saved to motive-generated.txt`);
