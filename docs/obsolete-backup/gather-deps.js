const fs = require('fs');
const path = require('path');

function findPackageJsonFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && item !== 'node_modules' && item !== '.git') {
      findPackageJsonFiles(fullPath, files);
    } else if (item === 'package.json') {
      files.push(fullPath);
    }
  }
  
  return files;
}

function gatherDependencies() {
  const packageFiles = findPackageJsonFiles('.');
  const result = {
    packages: [],
    allDependencies: {},
    conflicts: []
  };
  
  packageFiles.forEach(file => {
    try {
      const content = JSON.parse(fs.readFileSync(file, 'utf8'));
      const packageInfo = {
        path: file,
        name: content.name,
        version: content.version,
        dependencies: content.dependencies || {},
        devDependencies: content.devDependencies || {},
        peerDependencies: content.peerDependencies || {}
      };
      
      result.packages.push(packageInfo);
      
      // Track all dependencies
      ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
        if (content[depType]) {
          Object.entries(content[depType]).forEach(([name, version]) => {
            if (!result.allDependencies[name]) {
              result.allDependencies[name] = [];
            }
            result.allDependencies[name].push({
              version,
              type: depType,
              package: file
            });
          });
        }
      });
    } catch (error) {
      console.error(`Error reading ${file}:`, error.message);
    }
  });
  
  // Find conflicts (same dependency with different versions)
  Object.entries(result.allDependencies).forEach(([name, versions]) => {
    const uniqueVersions = [...new Set(versions.map(v => v.version))];
    if (uniqueVersions.length > 1) {
      result.conflicts.push({
        name,
        versions: uniqueVersions,
        packages: versions
      });
    }
  });
  
  return result;
}

try {
  const dependencyMatrix = gatherDependencies();
  fs.writeFileSync('dependencies_matrix.json', JSON.stringify(dependencyMatrix, null, 2));
  
  // Also create separate conflicts file
  const conflicts = dependencyMatrix.conflicts;
  fs.writeFileSync('dependency_conflicts.json', JSON.stringify(conflicts, null, 2));
  
  console.log(`Found ${dependencyMatrix.packages.length} package.json files`);
  console.log(`Found ${conflicts.length} dependency conflicts`);
  console.log('Files created: dependencies_matrix.json, dependency_conflicts.json');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}