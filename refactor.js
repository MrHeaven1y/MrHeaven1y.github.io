const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'lib');
const dataDir = path.join(srcDir, 'data');
const dataFile = path.join(srcDir, 'data.ts');
const typesFile = path.join(srcDir, 'types.ts');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const dataContent = fs.readFileSync(dataFile, 'utf8');

// 1. Extract interfaces to types.ts
const interfacesRegex = /export interface [\s\S]*?(?=\nexport const|\n\/\/ ──)/g;
let typesMatch = dataContent.match(interfacesRegex);
if (typesMatch) {
  fs.writeFileSync(typesFile, typesMatch.join('\n\n'));
}

// 2. Extract specific segments to .js files
function extractSegment(regex, filename) {
  const match = dataContent.match(regex);
  if (match) {
    let jsContent = match[0].replace(/export const \w+:\s*[\w\[\]]+ =/, (m) => m.split(':')[0] + ' =');
    fs.writeFileSync(path.join(dataDir, filename), jsContent);
  }
}

// Extract Projects
extractSegment(/export const projects[\s\S]*?(?=\n\/\/ ──)/, 'projects.js');

// Extract Skills
extractSegment(/export const skills[\s\S]*?(?=\n\/\/ ──)/, 'skills.js');

// Extract Lab
extractSegment(/export const labEntries[\s\S]*?(?=\n\/\/ ──)/, 'lab.js');

// Extract Experience
extractSegment(/export const experience[\s\S]*?(?=\n\/\/ ──)/, 'experience.js');

// Extract Config (Nav, Tech Marquee, Socials)
let configContent = '';
const navMatch = dataContent.match(/export const navItems[\s\S]*?(?=\n\/\/ ──)/);
if (navMatch) configContent += navMatch[0].replace(/:\s*[\w\[\]]+/, '') + '\n\n';

const marqueeMatch = dataContent.match(/export const techMarquee[\s\S]*?(?=\n\/\/ ──)/);
if (marqueeMatch) configContent += marqueeMatch[0] + '\n\n';

const socialMatch = dataContent.match(/export const socialLinks[\s\S]*?(?=\n$|$)/);
if (socialMatch) configContent += socialMatch[0] + '\n';

fs.writeFileSync(path.join(dataDir, 'config.js'), configContent);

// 3. Replace imports across project
const componentsDir = path.join(__dirname, 'src', 'components');
const filesToUpdate = [
  'layout/Footer.tsx',
  'layout/Navigation.tsx',
  'sections/AILab.tsx',
  'sections/About.tsx',
  'sections/Contact.tsx',
  'sections/Experience.tsx',
  'sections/Projects.tsx',
  'ui/ProjectCard.tsx'
];

const importMap = {
  'techMarquee': '@/lib/data/config',
  'socialLinks': '@/lib/data/config',
  'navItems': '@/lib/data/config',
  'labEntries': '@/lib/data/lab',
  'experience': '@/lib/data/experience',
  'projects': '@/lib/data/projects',
  'Project': '@/lib/types'
};

filesToUpdate.forEach(relPath => {
  const fullPath = path.join(componentsDir, relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace `import { X, Y } from '@/lib/data'` with multiple imports if necessary
    content = content.replace(/import\s+(type\s+)?{([^}]+)}\s+from\s+['"]@\/lib\/data['"];?/g, (match, isType, items) => {
      const vars = items.split(',').map(s => s.trim());
      let newImports = '';
      vars.forEach(v => {
        const source = importMap[v] || '@/lib/data/config';
        if (isType) {
          newImports += `import type { ${v} } from '${source}';\n`;
        } else {
          newImports += `import { ${v} } from '${source}';\n`;
        }
      });
      return newImports.trim();
    });
    
    fs.writeFileSync(fullPath, content);
  }
});

// Delete original data.ts
fs.unlinkSync(dataFile);

console.log("Refactoring complete");
