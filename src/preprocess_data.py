import numpy as np
import pandas as pd

# Load the data
data = pd.read_csv("data/raw/TB_burden_countries_2024-03-26.csv")

# Calculate HIV coinfection incidence and mortality number per 1,000,000 population for all data
data['incidence_permillion'] = data['e_inc_tbhiv_100k'] * 10
data['mortality_permillion'] = data['e_mort_tbhiv_100k'] * 10

# Round the calculated rates to 5 decimal points
data['incidence_permillion'] = data['incidence_permillion'].round(5)
data['mortality_permillion'] = data['mortality_permillion'].round(5)

# Convert to JSON as an array of objects --- this is For charts
data.to_json('static/data/tb_data_world_for_d3.json',
             orient='records', lines=False)
print("JSON data preprocessing for all countries complete and saved.")

# Apply log transformation with a small constant to avoid log(0)
data['incidence_permillion'] = np.log(data['e_inc_tbhiv_100k'] * 10 + 1)
data['mortality_permillion'] = np.log(data['e_mort_tbhiv_100k'] * 10 + 1)

# Round the log-transformed data to 5 decimal points
data['incidence_permillion'] = data['incidence_permillion'].round(5)
data['mortality_permillion'] = data['mortality_permillion'].round(5)

# Filter data for the year 2022
data_2022 = data[data['year'] == 2022].copy()

# Round the calculated rates for 2022 data to 5 decimal points (already rounded above)
output_data_2022 = data_2022[['country', 'iso3',
                              'year', 'incidence_permillion', 'mortality_permillion']]
print(output_data_2022[['country', 'iso3', 'year',
      'incidence_permillion', 'mortality_permillion']].head())

# Save the processed 2022 data to CSV --- this is For drawing the map
output_data_2022.to_csv('static/data/tb_data_world_2022.csv', index=False)
print("Data preprocessing for 2022 complete and saved -- CSV.")
