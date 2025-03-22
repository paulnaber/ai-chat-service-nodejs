const fs = require('fs');
const path = require('path');

// Function to add .js extension to relative imports
const addJsExtensionToImports = (filePath) => {
  let fileContent = fs.readFileSync(filePath, 'utf8');

  // This regex matches relative imports, starting with './' or '../'
  const updatedContent = fileContent.replace(
    /(['"])\/(\.\.\/|\.\/)([^'"]+)(\1)/g,
    (match, quote, prefix, path) => {
      // If the import path doesn't end with `.js` or `.ts`, add `.js`
      if (!path.endsWith('.ts') && !path.endsWith('.js')) {
        return `${quote}/${prefix}${path}.js${quote}`;
      }
      // If the import ends with `.ts`, replace `.ts` with `.js`
      if (path.endsWith('.ts')) {
        return `${quote}/${prefix}${path.slice(0, -3)}.js${quote}`;
      }
      return match;
    }
  );

  if (fileContent !== updatedContent) {
    // Only write to the file if something was changed
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated imports in: ${filePath}`);
  }
};

// Directory where your generated files are located (adjust as needed)
const generateFilesPath = path.join(__dirname, 'src/tsoa-build'); // Adjust according to your output path

// Loop through the files and apply the transformation
fs.readdirSync(generateFilesPath).forEach((file) => {
  const fullPath = path.join(generateFilesPath, file);

  if (fs.statSync(fullPath).isFile()) {
    addJsExtensionToImports(fullPath);
  }
});
