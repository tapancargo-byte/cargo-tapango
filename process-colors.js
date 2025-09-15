const fs = require('fs');

function processColors() {
  const rawContent = fs.readFileSync('hardcoded_colors_raw.txt', 'utf8');
  const lines = rawContent.split('\n').filter(line => line.trim());
  
  const colors = [];
  
  lines.forEach(line => {
    const match = line.match(/^([^:]+):(\d+):(.+)$/);
    if (match) {
      const [, filePath, lineNumber, content] = match;
      const colorMatches = content.match(/#[A-Fa-f0-9]{3,6}/g) || [];
      
      colorMatches.forEach(color => {
        colors.push({
          file: filePath.trim(),
          line: parseInt(lineNumber),
          color: color,
          context: content.trim()
        });
      });
    }
  });
  
  // Group by color to find frequency
  const colorFrequency = {};
  colors.forEach(item => {
    if (!colorFrequency[item.color]) {
      colorFrequency[item.color] = [];
    }
    colorFrequency[item.color].push(item);
  });
  
  const result = {
    totalFindings: colors.length,
    uniqueColors: Object.keys(colorFrequency).length,
    colors: colors,
    colorFrequency: Object.entries(colorFrequency)
      .map(([color, occurrences]) => ({
        color,
        count: occurrences.length,
        files: [...new Set(occurrences.map(o => o.file))],
        occurrences
      }))
      .sort((a, b) => b.count - a.count)
  };
  
  fs.writeFileSync('hardcoded_colors.json', JSON.stringify(result, null, 2));
  console.log(`Found ${result.totalFindings} color usages across ${result.uniqueColors} unique colors`);
}

processColors();