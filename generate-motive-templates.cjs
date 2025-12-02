const fs = require('fs');
const path = require('path');

const motiveDir = 'src/motive';
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
      const baseName = item.name.replace(/\.(html|txt)$/, '');
      const displayName = `${brand} / ${baseName}`;
      templates.push(`  { name: '${displayName}', fileName: '${item.name}', category: 'base-temp', path: '/src/motive/${brand}/${item.name}', brand: '${brand}', project: null },`);
    } else if (item.isDirectory()) {
      // Project folder
      const projectPath = path.join(brandPath, item.name);
      const files = fs.readdirSync(projectPath)
        .filter(file => file.endsWith('.html') || file.endsWith('.txt'));

      files.forEach(file => {
        const baseName = file.replace(/\.(html|txt)$/, '');
        const displayName = `${brand} / ${item.name} / ${baseName}`;
        templates.push(`  { name: '${displayName}', fileName: '${file}', category: 'base-temp', path: '/src/motive/${brand}/${item.name}/${file}', brand: '${brand}', project: '${item.name}' },`);
      });
    }
  });
});

const output = templates.join('\n');
console.log(output);

// Write to file
fs.writeFileSync('motive-generated.txt', output);
console.log(`\n\nGenerated ${templates.length} motive templates and saved to motive-generated.txt`);
