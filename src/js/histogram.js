export function loadCountryHistogram(countryInfo = {}, metricType = 'incidence_permillion') {
    // Load the data
    const { iso3, countryName } = countryInfo
    d3.json('static/data/tb_data_world_for_d3.json').then(function(data) {
        // Filter data for the selected country
        const countrySpecificData = data.filter(d => d.iso3 === iso3);

        // Sort data by year
        const sortedData = countrySpecificData.sort((a, b) => d3.ascending(a.year, b.year));

        // Define the dimensions and margins for the histogram
        const margin = { top: 30, right: 30, bottom: 30, left: 40 },
            width = 300 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        // Select the SVG element you plan to use, or create it if it does not exist
        let svg = d3.select("#country-chart").select("svg");
        if (svg.empty()) {
            svg = d3.select("#country-chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);
        } else {
            // Clear any previous histogram contents
            svg.selectAll("*").remove();
        }

        // Setup the SVG group for drawing the histogram
        const chartSvg = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Add X axis
        const x = d3.scaleBand()
            .range([0, width])
            .domain(sortedData.map(d => d.year))
            .padding(0.1);
        chartSvg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(sortedData, d => d[metricType])])
            .range([height, 0]);
        chartSvg.append("g")
            .call(d3.axisLeft(y));

        // Bars
        chartSvg.selectAll(".bar")
            .data(sortedData)
            .enter()
            .append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.year))
                .attr("y", d => y(d[metricType]))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d[metricType]))
                .attr("fill", "#69b3a2");

        const titleText1 = `TB-HIV Co-infection ${metricType === 'incidence_permillion' ? "Incidence" : "Mortality"} Trend`;
        const titleText2 = `for ${countryName}`;
        
        // Append the first line of text
        chartSvg.append("text")
            .attr("x", width / 2)
            .attr("y", 0 - (margin.top / 2)) 
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .text(titleText1);
        
        // Append the second line of text
        chartSvg.append("text")
            .attr("x", width / 2)
            .attr("y", 0 - (margin.top / 2) + 15) 
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .text(titleText2);


    }).catch(function(error) {
        console.error("Error loading the JSON data:", error);
    });
}

export function loadGlobalLineChart(metricType = 'incidence_permillion') {
    // Load the data
    d3.json('static/data/tb_data_world_for_d3.json').then(function(data) {
        const aggregatedData = d3.rollup(data, 
            v => d3.sum(v, d => d[metricType]), // Sum the metricType for each year across all countries
            d => d.year // Group by year
        );

        // Convert the Map to an array suitable for D3 visualizations
        const countryData = Array.from(aggregatedData, ([year, value]) => ({ year, value }));

        // Define the dimensions and margins for the line chart
        const margin = { top: 60, right: 30, bottom: 50, left: 60 },
            width = 800 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        // Select or create the SVG element
        let svg = d3.select("#chart").select("svg");
        if (svg.empty()) {
            svg = d3.select("#chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);
        } else {
            svg.selectAll("*").remove();
        }

        const chartSvg = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Define the scales
        const x = d3.scaleBand()
            .range([0, width])
            .domain(countryData.map(d => d.year))
            .padding(0.1);
        const y = d3.scaleLinear()
            .domain([0, d3.max(countryData, d => d.value)])
            .range([height, 0]);

        // Add X and Y axis
        chartSvg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));
        chartSvg.append("g")
            .call(d3.axisLeft(y))
            .selectAll("text") // Select all text elements for the y-axis tick labels
            .style("font-size", "8px"); // Set their font size

        // Line generator
        const line = d3.line()
            .x(d => x(d.year) + x.bandwidth() / 2) // Position each line in the center of the band
            .y(d => y(d.value));


        chartSvg.selectAll("rect")
            .data(countryData)
            .enter()
            .append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.year) + x.bandwidth() / 6) // Shift right by a quarter of the bandwidth
                .attr("y", d => y(d.value))
                .attr("width", x.bandwidth() * 2 / 3) // Half the bandwidth
                .attr("height", d => height - y(d.value))
                .attr("fill", "#69b3a2");

        // Append the path for the line
        chartSvg.append("path")
            .datum(countryData)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Title
        svg.append("text")
            .attr("x", width + margin.left) // Position at the right edge of the SVG
            .attr("y", margin.top) // Position below the top edge of the SVG
            .attr("text-anchor", "end") // Align the text to the end (right)
            .style("font-size", "14px")
            .text((metricType === 'incidence_permillion' ? 'Global Incidence of ': 'Global Mortality from ') + 'TB-HIV Co-infection per Million People Over Time');        
    }).catch(function(error) {
        console.error("Error loading the JSON data:", error);
    });
}