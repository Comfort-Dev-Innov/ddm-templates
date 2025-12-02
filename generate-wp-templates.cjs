const fs = require('fs');
const path = require('path');

const wpDir = 'src/wp';
const projects = fs.readdirSync(wpDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const templates = [];
projects.forEach(project => {
  const projectPath = path.join(wpDir, project);
  const files = fs.readdirSync(projectPath)
    .filter(file => file.endsWith('.html'));

  files.forEach(file => {
    const baseName = file.replace('.html', '');
    const displayName = `${project} / ${baseName}`;
    templates.push(`  { name: '${displayName}', fileName: '${file}', category: 'base-temp', path: '/src/wp/${project}/${file}', project: '${project}' },`);
  });
});

console.log(templates.join('\n'));
