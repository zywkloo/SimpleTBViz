export async function queryCountryInfo(countryInfo) {
    // Await the async call to d3.json and store the data
    const data = await d3.json('/static/data/tb_data_world_for_d3.json');

    // Process the data to find the country name or ISO3 code
    if (countryInfo.iso3 && !countryInfo.countryName) {
        let foundCountry = data.find(entry => entry.iso3 === countryInfo.iso3 && entry.year === 2022);
        countryInfo.countryName = foundCountry ? foundCountry.country : null;
    }
    
    if (countryInfo.countryName && !countryInfo.iso3) {
        let foundCountry = data.find(entry => entry.country === countryInfo.countryName && entry.year === 2022);
        countryInfo.iso3 = foundCountry ? foundCountry.iso3 : null;
    }

    // Return the updated countryInfo object
    return countryInfo;
}