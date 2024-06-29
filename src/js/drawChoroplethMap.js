import { loadCountryHistogram, loadGlobalLineChart } from './histogram.js';
import { queryCountryInfo } from './queryCountryInfo.js';

// Helper function for formatting numbers
var format = function(d) {
    return d3.format(',')(Math.ceil(10**d));
}

// Function to draw the Choropleth Map
export async function drawChoroplethMap(countryInfo = {}, metric, setISO3Callback) {
    document.getElementById('map').innerHTML = '';


    try {
        // Asynchronously load the TB data
        const data = await d3.json('/static/data/tb_data_world_for_d3.json');
        
        // Process the country information
        countryInfo = await queryCountryInfo(countryInfo, data);
        
        // Define the map settings
        var map = d3.choropleth()
            .geofile('/static/data/countries.json')
            .colors(d3.schemeYlGnBu[7])
            .column(metric) // log scale value for drawing map
            .format(d3.format('.2f'))
            .format(format)
            .legend({width: 150, height: 200, padding: 10, margin: 10})
            .unitId('iso3')
            .zoomFactor(4);

        // Load and draw the map with the TB data
        const csvData = await d3.csv('/static/data/tb_data_world_2022.csv');
        var selection = d3.select('#map').datum(csvData);
        map.draw(selection);

        // Post-draw actions
        map.postUpdate(() => {
            loadGlobalLineChart(metric);
            loadCountryHistogram(countryInfo, metric);
            bindEventsToMapPaths(setISO3Callback);
        });
    } catch (error) {
        console.error("Error in drawing the map or loading data:", error);
    }
}

// Function to add interactivity to map paths
function bindEventsToMapPaths(_callback) {
    d3.selectAll('path.unit')
        .each(function() {
            d3.select(this).attr('data-original-color', d3.select(this).style('fill'));
        })
        .on('mouseover', function() {
            d3.select(this).style('fill', 'pink');
        })
        .on('mouseout', function() {
            const originalColor = d3.select(this).attr('data-original-color');
            d3.select(this).style('fill', originalColor);
        })
        .on('click', function(event, d) {
            const iso3CodeOnClick = d.properties.iso3;
            const metricType = document.querySelector('input[name="metricType"]:checked').value;
            const countryInfo = { iso3: iso3CodeOnClick, countryName: d.properties.name };
            _callback(countryInfo);
            loadCountryHistogram(countryInfo, metricType);
        });
}
