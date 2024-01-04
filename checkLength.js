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
      // Get the length of the array
      const arrayLength = jsonData.length;

      // Log or use the array length as needed
      console.log('Length of the array:', arrayLength);
    } else {
      console.error('The JSON data does not represent an array.');
    }
  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
  }
});
