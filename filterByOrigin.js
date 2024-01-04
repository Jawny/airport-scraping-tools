const fs = require('fs');

function filterAndSaveNonYVRPairs(filename, airportOfInterest) {
  // Read the JSON file
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    try {
      // Parse the JSON data
      const airportData = JSON.parse(data);

      // Filter out pairs that don't start with the origin airport "YVR"
      const filteredData = airportData.filter(pair => pair.origin === airportOfInterest);

      // Convert the filtered data back to JSON
      const filteredJson = JSON.stringify(filteredData, null, 2);

      // Save the filtered data back to the same file
      fs.writeFile(filename, filteredJson, 'utf8', err => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('Filtered data saved to', filename);
        }
      });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
    }
  });
}

// Example usage
filterAndSaveNonYVRPairs('airports_data_yvr.json', 'YVR');
