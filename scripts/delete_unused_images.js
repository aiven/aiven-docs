//
// Delete unused images
//

const fs = require('fs');
const path = require('path');

function extractFilename(filePath) {
  return path.basename(filePath);
}

function findPNGFiles(folderPath, imagesDict = {}) {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      findPNGFiles(filePath, imagesDict); // Recursively search subdirectories
    } else if (path.extname(file).toLowerCase() === '.png') {
      // Store the image in the dictionary
      imagesDict[file] = filePath;
    }
  });

  return imagesDict;
}

function findPNGRefsinContent(contentPath, pngReferences = {}) {
  const files = fs.readdirSync(contentPath);

  files.forEach((file) => {
    const filePath = path.join(contentPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      findPNGRefsinContent(filePath, pngReferences);
    } else if (path.extname(file).toLowerCase() === '.md') {
      const references = findPNGReferencesInMarkdownFile(filePath);
      if (references.length > 0) {
        pngReferences[filePath] = references;
      }
    }
  });

  return pngReferences;
}

function findPNGReferencesInMarkdownFile(filePath) {
  const references = [];
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');

  lines.forEach((line) => {
    const pngRegex = /(.*?\.(png))/g;

    let match;
    while ((match = pngRegex.exec(line)) !== null) {
      references.push(match[1]);
    }
  });

  return references;
}

function findUnusedImages(imagesDict, pngReferences) {
  const pngReferencesSet = new Set();
  Object.values(pngReferences).forEach((references) => {
    references.forEach((ref) => {
      pngReferencesSet.add(extractFilename(ref));
    });
  });

  const imagesDictSet = new Set(Object.keys(imagesDict));

  const difference = [...imagesDictSet].filter(
    (ref) => !pngReferencesSet.has(extractFilename(ref)),
  );

  return difference;
}

function deleteUnusedImages(imagesDict, unusedImages) {
  unusedImages.forEach((unusedImage) => {
    const imagePath = imagesDict[unusedImage];
    if (imagePath) {
      fs.unlinkSync(imagePath);
      console.log(`Deleted ${unusedImage}`);
    } else {
      console.log(`Could not find ${unusedImage} in images directory.`);
    }
  });
}

const scriptDir = __dirname;
const imagesFolder = path.join(scriptDir, '../static/images/content');
const imagesDictionary = findPNGFiles(imagesFolder);

const contentPath = path.join(scriptDir, '../docs');
const pngReferences = findPNGRefsinContent(contentPath);

const unusedImages = findUnusedImages(imagesDictionary, pngReferences);
deleteUnusedImages(imagesDictionary, unusedImages);
