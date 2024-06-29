# Simple TB-HIV CoViz <img src="/assets/lungs.png" align="right" width=100 height=100 alt="" />


<a href="https://fastapi.tiangolo.com/" target="_blank">
    <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI Badge">
</a>
<a href="https://d3js.org/" target="_blank">
    <img src="https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logoColor=white" alt="D3.js Badge">
</a>
<a href="https://www.heroku.com/" target="_blank">
    <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" alt="Heroku Badge">
</a>
<a href="https://html.spec.whatwg.org/multipage/" target="_blank">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Badge">
</a>
<a href="https://www.w3.org/Style/CSS/" target="_blank">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3 Badge">
</a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge">
</a>
<a href="https://www.python.org/" target="_blank">
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python Badge">
</a>
<a href="https://pandas.pydata.org/" target="_blank">
    <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" alt="Pandas Badge">
</a>
<a href="https://www.who.int/" target="_blank">
    <img src="https://img.shields.io/badge/WHO-0093D5?style=for-the-badge&logo=unitednations&logoColor=white" alt="WHO Badge">
</a>

Inspired by the group 1 team project [TBtracker](https://dsci-532-2024-1-tbtracker.onrender.com/), this time we narrow its focus exclusively on the significant risk factor of Tuberculosis-HIV co-infection. It concentrates on the variations of TB-HIV co-infection trends across different countries, offering a user-friendly interface for healthcare professionals to analyze co-infection data and support informed decision-making for enhanced health interventions.

## Features

- **Country Selection**: Select from a global map to delve into detailed TB-HIV co-infection trends.
- **Metric Switch**: Toggle between incidence and mortality metrics to examine different facets of TB-HIV co-infection data.
- **ISO3 Code Query**: Enter an ISO3 code to fetch data for specific countries. Includes a dropdown that suggests the closest matching results based on user input.
- **Country Name Qurey**: Search by country name to access tailored TB-HIV co-infection statistics. This search includes an auto-suggest feature that offers possible matches as you type, enhancing usability.
- **Interactive Charts and Maps**: Engage with dynamic visualizations that adjust to user interactions, offering immediate and relevant insights based on selected parameters.

## Motivation

Prompt and accurate data visualization is critical for healthcare administrators and policymakers managing TB-HIV co-infections. This app provides essential insights into temporal and spatial trends, supporting strategic planning and operational adjustments in public health responses.

## App Description

A demonstration of the app's capabilities is shown in this brief walkthrough:

[![App Walkthrough](https://media.github.ubc.ca/user/2897/files/28208a4a-67bf-4971-a97e-aefd50944777)](https://youtu.be/AkQwr2EIrcU)

## Visit Online

Explore the TB-HIV Co-Infection Trends App here:

[Simple TB-HIV CoViz Online](http://www.simpletb.life/)

## Deploy locally

To run the Simple TB Trends App locally, follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/zywkloo/SimpleTBViz.git
    ```

2. **Navigate to the Project Directory**

    ```bash
    cd DSCI_532_individual-assignment_zywkloo
    ```

3. **Create and Activate a Conda Environment**

    ```bash
    conda env create -f environment.yml
    conda activate SimpleTB
    ```

4. **Run the Application**

    ```bash
    uvicorn src.app:app --reload
    ```

    Access the app by navigating to `http://127.0.0.1:8000/` in your web browser.

## Video Walkthrough

Please refer to the `img/demo.mp4` file in this repository for a video walkthrough of the app. This video covers the purpose and target audience of the app and demonstrates its full functionality. Ensure the video and audio are clear and concise to facilitate understanding.


