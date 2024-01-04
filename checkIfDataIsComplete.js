const fs = require('fs');

function readJsonFromFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return null;
  }
}

const flights = readJsonFromFile('convertcsv.json');
const airportCodes = readJsonFromFile('airportsToCompareTo.json')

if (flights) {
  // Find the airports in the list that are missing in the second JSON
  const missingAirports = airportCodes.filter(airport =>
    !flights.some(flight => flight.arrival_airport_code === airport)
  );

  if (missingAirports.length === 0) {
    console.log('All airports in the list exist as arrival airports in the second JSON.');
  } else {
    console.log('Airports missing in the second JSON:', missingAirports);
  }
}
