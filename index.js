const puppeteer = require("puppeteer");
const fs = require("fs");

async function scrapeAirports(url) {
  const browser = await puppeteer.launch(
    {
      headless: false,
      args: ["--no-sandbox", "--disable-gpu"],
    },
  );
  const page = await browser.newPage();

  await page.goto(url);

  const airportPairs = [];

  let hasNextPage = true;

  while (hasNextPage) {
    await page.waitForSelector(".dataTables_wrapper.no-footer");
    const oddRows = await page.$$(".odd");
    const evenRows = await page.$$(".even");

    for (const row of oddRows) {
      const pair = await page.evaluate((row) => {
        const originAirport = row.querySelector("td:nth-child(1) a").textContent
          .trim();
        const destinationAirport = row.querySelector("td:nth-child(2) a")
          .textContent.trim();

        return {
          origin: originAirport,
          destination: destinationAirport,
        };
      }, row);

      airportPairs.push(pair);

      console.log(pair.origin, pair.destination);
    }

    for (const row of evenRows) {
      const pair = await page.evaluate((row) => {
        const originAirport = row.querySelector("td:nth-child(1) a").textContent
          .trim();
        const destinationAirport = row.querySelector("td:nth-child(2) a")
          .textContent.trim();

        return {
          origin: originAirport,
          destination: destinationAirport,
        };
      }, row);

      airportPairs.push(pair);

      console.log(pair.origin, pair.destination);
    }
    const nextButton = await page.$("a.paginate_button.next");

    if (
      nextButton &&
      !(await nextButton.evaluate((node) =>
        node.classList.contains("disabled")
      ))
    ) {
      await nextButton.click();
      await page.waitForTimeout(1000); // Add a delay to allow the next page to load (adjust as needed)
    } else {
      hasNextPage = false;
    }
  }

  await browser.close();

  // Save data to JSON file
  const jsonData = JSON.stringify(airportPairs, null, 2);
  console.log(airportPairs)
  fs.writeFileSync("airports_data.json", jsonData);

  return airportPairs;
}

const url = "https://seats.aero/aeroplan/routes"; // Replace with the actual URL
scrapeAirports(url)
  .then((airports) => {
    console.log("Data extracted and saved to airports_data.json");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
