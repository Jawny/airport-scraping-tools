const fs = require('fs');

// Replace 'path/to/your/file.json' with the actual path to your JSON file
const filePath = './airports_data.json';

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Check if jsonData is an array
    if (Array.isArray(jsonData)) {
      // Check for duplicate origin-destination pairs
      const seenPairs = new Set();
      let hasDuplicates = false;

      for (const pair of jsonData) {
        const pairString = `${pair.origin}-${pair.destination}`;

        if (seenPairs.has(pairString)) {
          console.log('Duplicate pair found:', pairString);
          hasDuplicates = true;
        } else {
          seenPairs.add(pairString);
        }
      }

      if (!hasDuplicates) {
        console.log('No duplicate origin-destination pairs found.');
      }
    } else {
      console.error('The JSON data does not represent an array.');
    }
  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
  }
});
