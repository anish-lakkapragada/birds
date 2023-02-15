# file to test whether or not the API is working 

# %% 
import requests 
URL = "http://127.0.0.1:8000"

with open("whitecrowned_sparrow.png", 'rb') as f: 
    r = requests.post(f"{URL}/predict", files={"file": f})

assert r.status_code == 200, r
print(r.json())
# %%
"""
Verify each species.
"""

import pandas as pd
import requests
bird_species = pd.read_csv("aiy_birds_V1_labelmap.csv")
for i, item in bird_species.iterrows(): 
    name = item["name"]
    if name != "background": 
        url = f"https://nuthatch.lastelm.software/birds"
        print(url)
        r = requests.get(url, params={"sciName": name, "operator": "AND"}, headers={"API-Key": "f0a7a774-f08f-4e4e-9e26-0fc55163f693"})
        print(r.json())
# %%
