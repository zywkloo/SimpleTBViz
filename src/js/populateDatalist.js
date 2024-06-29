export function populateDatalist(data) {
    const iso3Datalist = document.getElementById('iso3List');
    const countryNameDatalist = document.getElementById('countryNameList');
    const uniqueIso3 = new Set();
    const uniqueCountryNames = new Set();

    // Clear previous options
    iso3Datalist.innerHTML = '';
    countryNameDatalist.innerHTML = '';

    data.forEach(function(countryData) {
        uniqueIso3.add(countryData.iso3);
        uniqueCountryNames.add(countryData.country);
    });

    uniqueIso3.forEach(function(iso3) {
        let iso3Option = document.createElement('option');
        iso3Option.value = iso3;
        iso3Datalist.appendChild(iso3Option);
    });

    uniqueCountryNames.forEach(function(country) {
        let countryNameOption = document.createElement('option');
        countryNameOption.value = country;
        countryNameDatalist.appendChild(countryNameOption);
    });
}